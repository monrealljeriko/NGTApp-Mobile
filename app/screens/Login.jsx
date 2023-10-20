import {
   View,
   Text,
   Image,
   Pressable,
   TextInput,
   TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../component/Button";
import COLORS from "../component/Colors";
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { ActivityIndicator } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ navigation }) {
   const [isPasswordShown, setIsPasswordShown] = useState(true);
   const [isChecked, setIsChecked] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const auth = FIREBASE_AUTH;

   const signIn = async () => {
      setLoading(true);
      try {
         const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
         );

         console.log(response);
      } catch (error) {
         console.log(error);
         alert("Sign in failed: " + error.message);
      } finally {
         setLoading(false);
      }
   };
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

            {loading ? (
               <ActivityIndicator size="large" color="#57708C" />
            ) : (
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
            )}
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
            <Button
               title="Login"
               filled
               onPress={signIn}
               style={{ marginVertical: 20 }}
            />
            <View style={[styles.options, { justifyContent: "center" }]}>
               <Text style={styles.customSubtext}>Become a member ?</Text>
               <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.pressableText}>Click here</Text>
               </Pressable>
            </View>
         </View>
      </View>
   );
}

export default Login;
