import {
   View,
   Text,
   Image,
   Pressable,
   TextInput,
   TouchableOpacity,
} from "react-native";
import {
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import Button from "../component/Button";
import COLORS from "../component/Colors";
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { FIREBASE_AUTH } from "../../firebaseConfig";

function ForgetPassword({ isVisible, onCancel, email }) {
   const [emailuser, setEmailUser] = useState("");
   const auth = FIREBASE_AUTH;

   useEffect(() => {
      const checkEmail = () => {
         if (email && !email.includes("@")) {
            setEmailUser(email + "@gmail.com");
         } else {
            setEmailUser(email);
         }
      };
      checkEmail();
   }, [isVisible]);

   const forgetPassword = async () => {
      // Check if the email exists by attempting to send a password reset email
      try {
         await sendPasswordResetEmail(auth, emailuser);
         alert("Password reset email has been sent"); // If the email exists
      } catch (error) {
         alert("User with this email does not exist."); // If the email does not exist
      }
   };

   return (
      <Modal isVisible={isVisible} backdropOpacity={0.5}>
         <View style={[styles.modalContainer, { height: "200" }]}>
            <View style={{ margin: 20 }}>
               <Text style={[styles.customText, { textAlign: "center" }]}>
                  Reset Password
               </Text>
               <View style={{ marginVerit: 20, marginHorizontal: 20 }}>
                  <Text style={[styles.customSubtext, { textAlign: "left" }]}>
                     Send a password reset email.
                  </Text>
               </View>
               <View style={{ marginTop: 20 }}>
                  <Text
                     style={[
                        styles.customSubtext,
                        { textAlign: "left", color: "gray", left: 20 },
                     ]}
                  >
                     User account
                  </Text>
                  <View
                     style={[
                        styles.sectionInput,
                        {
                           marginTop: 0,
                           borderWidth: 0,
                           borderBottomWidth: 1,
                        },
                     ]}
                  >
                     <TextInput
                        placeholder="Enter your email address"
                        placeholderTextColor={COLORS.gray}
                        style={[styles.sectionInputText]}
                        value={emailuser}
                        returnKeyType="next"
                        onChangeText={(text) => setEmailUser(text)}
                     />
                  </View>
               </View>

               <View
                  style={{
                     marginHorizontal: 15,
                     marginTop: 20,
                     marginBottom: 10,
                     gap: 10,
                     flexDirection: "row",
                  }}
               >
                  <Button
                     title="Cancel"
                     style={{ flex: 1 }}
                     onPress={onCancel}
                  />
                  <Button
                     title="Send"
                     filled
                     style={{ flex: 1 }}
                     onPress={() => {
                        forgetPassword();
                        onCancel();
                     }}
                  />
               </View>
            </View>
         </View>
      </Modal>
   );
}

function Login({ navigation }) {
   const [isPasswordShown, setIsPasswordShown] = useState(true);
   const [isChecked, setIsChecked] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [isforgetPasswordVisible, setForgetPasswordVisible] = useState(false);
   const auth = FIREBASE_AUTH;

   // clear the data in asynchstorage
   /* const clearData = async () => {
      // Clear saved login details in AsyncStorage
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");
      setEmail("");
      setPassword("");
      setIsChecked(false);
      console.log("Email and password data cleared");
   }; */

   const handleClose = () => {
      setForgetPasswordVisible(false);
   };

   // sign authentication
   const signIn = async () => {
      setLoading(true);

      let signedInEmailorUsername = email;
      if (!email.includes("@")) {
         signedInEmailorUsername = email + "@gmail.com";
      }

      try {
         await signInWithEmailAndPassword(
            auth,
            signedInEmailorUsername,
            password
         );

         // Check if the "Remember Me" checkbox is checked
         if (isChecked) {
            // Save the email and password to AsyncStorage
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("password", password);
         } else {
            // If not checked, remove any saved login details
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("password");
         }
      } catch (error) {
         alert("Sign in failed: invalid email or password, try again.");
      }
      setLoading(false);
   };

   // recover dat from asyncstorage
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

         // console.log("email", email);
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
               <View style={{ flexDirection: "row" }}>
                  <Checkbox
                     style={styles.checkBoxRemember}
                     value={isChecked}
                     onValueChange={setIsChecked}
                     color={isChecked ? COLORS.primary : undefined}
                  />

                  <Pressable onPress={() => setIsChecked(!isChecked)}>
                     <Text style={{ fontFamily: "Poppins-Regular", left: 10 }}>
                        Remember Me
                     </Text>
                  </Pressable>
               </View>
               <TouchableOpacity
                  onPress={() => {
                     setForgetPasswordVisible(true);
                  }}
               >
                  <Text style={styles.pressableText}>Forget password</Text>
               </TouchableOpacity>
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
               <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
               >
                  <Text style={styles.pressableText}>Click here</Text>
               </TouchableOpacity>
            </View>
            {/*   <Button title="Clear Async Data" onPress={clearData} /> */}
         </View>
         <ForgetPassword
            email={email}
            isVisible={isforgetPasswordVisible}
            onCancel={handleClose}
         />
      </View>
   );
}

export default Login;
