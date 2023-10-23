import {
   View,
   Text,
   Image,
   Pressable,
   TextInput,
   TouchableOpacity,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../component/Button";
import COLORS from "../component/Colors";
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { ActivityIndicator } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
   const [isPasswordShown, setIsPasswordShown] = useState(true);
   const [isChecked, setIsChecked] = useState(false);
   const [originalEmail, setOriginalEmail] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const auth = FIREBASE_AUTH;

   /* const clearData = async () => {
      // Clear saved login details in AsyncStorage
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");
      setOriginalEmail("");
      setEmail("");
      setPassword("");
      setIsChecked(false);
      console.log("Email and password data cleared");
   }; */

   const signIn = async () => {
      setLoading(true);
      try {
         const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
         );

         // Check if the "Remember Me" checkbox is checked
         if (isChecked) {
            // Save the email and password to AsyncStorage
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("password", password);
            console.log("Email and password saved");
         } else {
            // If not checked, remove any saved login details
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("password");
            console.log("Email and password removed");
         }

         console.log(response);
      } catch (error) {
         console.log(error);
         alert("Sign in failed: " + error.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      // Check if there are saved login details in AsyncStorage
      AsyncStorage.getItem("email").then((storedEmail) => {
         if (storedEmail) {
            setEmail(storedEmail);
            /* setOriginalEmail(storedEmail);

            // Mask the email for display
            const [username, domain] = storedEmail.split("@");
            const maskedUsername =
               username.substring(0, 3) + "*".repeat(username.length - 3);
            const maskedEmail = maskedUsername + "@" + domain;
            setEmail(maskedEmail); */
            setIsChecked(true); // Assuming the checkbox should be checked
         }
         // console.log("original ", originalEmail);

         console.log("email", email);
      });
      AsyncStorage.getItem("password").then((storedPassword) => {
         if (storedPassword) {
            setPassword(storedPassword);
         }
      });
   }, []);

   return (
      <View style={styles.container}>
         <Image
            source={require("../../assets/images/bg-login.png")}
            style={{ width: "100%" }}
         />
         <View style={styles.contentContainer}>
            <View style={{ marginVertical: 30 }}>
               <Text style={styles.customText}>Hello,</Text>
               <Text style={styles.customSubtitle}>Welcome Back ! 👋</Text>
            </View>

            <>
               <View style={{ marginBottom: 15 }}>
                  <View style={styles.customInput}>
                     <Icon name="mail" style={styles.customIcon}></Icon>
                     <TextInput
                        placeholder="Email or username"
                        keyboardType="email-address"
                        value={email}
                        style={{
                           width: "100%",
                           fontFamily: "Poppins-Regular",
                        }}
                        onChangeText={(text) => setEmail(text)}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 15 }}>
                  <View style={styles.customInput}>
                     <Icon name="lock" style={styles.customIcon}></Icon>
                     <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry={isPasswordShown}
                        style={{
                           width: "100%",
                           fontFamily: "Poppins-Regular",
                        }}
                        onChangeText={(text) => setPassword(text)}
                     />

                     <TouchableOpacity
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={{
                           position: "absolute",
                           right: 12,
                        }}
                     >
                        {isPasswordShown == true ? (
                           <Ionicons
                              name="eye-off"
                              size={20}
                              color={COLORS.primary}
                           />
                        ) : (
                           <Ionicons
                              name="eye"
                              size={20}
                              color={COLORS.primary}
                           />
                        )}
                     </TouchableOpacity>
                  </View>
               </View>
            </>
            <View style={[styles.options, { marginVertical: 10 }]}>
               <Checkbox
                  style={styles.checkBoxRemember}
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? COLORS.primary : undefined}
               />

               <Text style={{ fontFamily: "Poppins-Regular", right: 30 }}>
                  Remember Me
               </Text>
               <Pressable onPress={() => alert("Underconstruction")}>
                  <Text style={styles.pressableText}>Forget password</Text>
               </Pressable>
            </View>
            {loading ? (
               <ActivityIndicator
                  size="large"
                  color="#57708C"
                  style={{ marginVertical: 20 }}
               />
            ) : (
               <Button
                  title="Login"
                  filled
                  onPress={signIn}
                  style={{ marginVertical: 20 }}
               />
            )}

            <View style={[styles.options, { justifyContent: "center" }]}>
               <Text style={styles.customSubtext}>Become a member ?</Text>
               <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.pressableText}>Click here</Text>
               </Pressable>
            </View>
            {/* <Button title="Clear Async Data" onPress={clearData} /> */}
         </View>
      </View>
   );
}

export default Login;
