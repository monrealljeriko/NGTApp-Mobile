import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import styles from "../styles";
import Button from "../component/Button";

function Welcome({ navigation }) {
   return (
      <View style={styles.container}>
         <Image
            source={require("../../assets/images/bg.png")}
            style={{ width: "100%", height: "60%" }}
         />
         <Image
            source={require("../../assets/images/logo.png")}
            style={{
               width: "100%",
               position: "absolute",
               top: 150,
            }}
         />

         <View style={styles.whiteContainer}>
            <Text style={styles.customTitle}>NeGrowTio</Text>
            <Text style={styles.customText}>
               San Jose Batangas Public Market Vendor and Community Credit
               Cooperative
            </Text>
            <View style={styles.buttonContainer}>
               <Button
                  title="Login"
                  onPress={() => navigation.navigate("Login")}
                  filled
                  style={styles.loginButton}
               />
               <Button
                  title="Not a Member?"
                  onPress={() => navigation.navigate("Register")}
                  style={styles.registerButton}
               />
            </View>
            <View
               style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
               }}
            >
               <Text style={styles.customSubtext}>Know more about us?</Text>
               <Pressable onPress={() => alert("Underconstruction")}>
                  <Text style={styles.pressableText}>Click here</Text>
               </Pressable>
            </View>
         </View>
      </View>
   );
}

export default Welcome;
