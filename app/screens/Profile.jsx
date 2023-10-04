import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
   TextInput,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../component/Colors";
import Modal from "react-native-modal";
import Button from "../component/Button";
import { Ionicons } from "@expo/vector-icons";

// Modal Profile
function MyProfile({ isVisible, onCancel }) {
   return (
      <Modal isVisible={isVisible} backdropOpacity={0.5}>
         <View style={styles.modalContainer}>
            <View style={styles.modalButton}>
               <TouchableOpacity onPress={onCancel}>
                  <View style={styles.moodalCancel}>
                     <Ionicons name="close-outline" size={30} color="red" />
                  </View>
               </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }}>
               <Text style={styles.modalHeader}>My Profile</Text>
               <Text style={styles.sectionSubtext}>Full name</Text>
               <View style={styles.cardItem}>
                  <Text style={styles.cardText}>John Doe</Text>
               </View>
               <Text style={styles.sectionSubtext}>Address</Text>
               <View style={styles.cardItem}>
                  <Text style={styles.cardText}>Your address here</Text>
               </View>
               <Text style={styles.sectionSubtext}>Email address</Text>
               <View style={styles.cardItem}>
                  <Text style={styles.cardText}>gmail@gmail.com</Text>
               </View>
               <Text style={styles.sectionSubtext}>Number</Text>
               <View style={styles.cardItem}>
                  <Text style={styles.cardText}>091233455678</Text>
               </View>
            </View>
         </View>
      </Modal>
   );
}

// Modal Account
function Account({ isVisible, onCancel }) {
   return (
      <Modal isVisible={isVisible} backdropOpacity={0.5}>
         <View style={[styles.modalContainer, { height: "200" }]}>
            <View style={styles.modalButton}>
               <TouchableOpacity onPress={onCancel}>
                  <View style={styles.moodalCancel}>
                     <Ionicons name="close-outline" size={30} color="red" />
                  </View>
               </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }}>
               <Text style={styles.modalHeader}>Change Password</Text>
               <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                  <Text style={styles.sectionSubtext}>Current Password</Text>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Enter your current password"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        returnKeyType="next"
                        // onChangeText={(text) => setLastName(text)}
                     />
                  </View>
               </View>
               <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                  <Text style={styles.sectionSubtext}>New Password</Text>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Enter your new password"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        returnKeyType="next"
                        // onChangeText={(text) => setLastName(text)}
                     />
                  </View>
               </View>
               <View style={{ marginHorizontal: 15 }}>
                  <Text style={styles.sectionSubtext}>Confirm Password</Text>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Enter your new password"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        returnKeyType="next"
                        // onChangeText={(text) => setLastName(text)}
                     />
                  </View>
               </View>
               <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                  <Button title="Update" filled />
               </View>
            </View>
         </View>
      </Modal>
   );
}

// Modal About
function AboutUs({ isVisible, onCancel }) {
   return (
      <Modal isVisible={isVisible} backdropOpacity={0.5}>
         <View style={styles.modalContainer}>
            <View style={styles.modalButton}>
               <TouchableOpacity onPress={onCancel}>
                  <View style={styles.moodalCancel}>
                     <Ionicons name="close-outline" size={30} color="red" />
                  </View>
               </TouchableOpacity>
            </View>
            <View style={{ margin: 20 }}>
               <Text style={styles.modalHeader}>About</Text>
               <Text style={styles.modalText}>
                  The San Jose Public Market Vendor and Community Credit
                  Cooperative is a financial institution established in April
                  2017, offering business loans known as productive and
                  emergency loans to help improve borrowers' businesses,
               </Text>
            </View>
         </View>
      </Modal>
   );
}

function Profile({ navigation }) {
   const [isMyProfileVisible, setMyProfileVisible] = useState(false);
   const [isAccountVisible, setAccountVisible] = useState(false);
   const [isAboutVisible, setAboutVisible] = useState(false);

   const handleClose = () => {
      setMyProfileVisible(false);
      setAccountVisible(false);
      setAboutVisible(false);
   };

   return (
      <View style={styles.container}>
         <View style={styles.headerContainerProfile}>
            <View style={styles.headerProfile}>
               <Image
                  source={require("../../assets/icons/icon-profile.png")}
                  style={styles.headerImage}
               />
               <Text style={styles.headerName}>JOHN DOE</Text>
               <Text style={styles.headerText}>Member Since</Text>
            </View>
            <View style={styles.whiteContainer}>
               <View style={styles.contentContainer}>
                  <Text style={styles.cardLabelText}>Settings </Text>
                  <View style={styles.cardItem}>
                     <TouchableOpacity
                        onPress={() => {
                           setMyProfileVisible(true);
                        }}
                     >
                        <View style={styles.contentWrapper}>
                           <View style={{ flexDirection: "row", gap: 15 }}>
                              <Ionicons
                                 name="person-outline"
                                 size={20}
                                 color={COLORS.primary}
                              />
                              <Text style={styles.cardText}>My Profile</Text>
                           </View>
                           <Ionicons
                              name="chevron-forward-outline"
                              size={20}
                              color={COLORS.primary}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={styles.cardItem}>
                     <TouchableOpacity
                        onPress={() => {
                           setAccountVisible(true);
                        }}
                     >
                        <View style={styles.contentWrapper}>
                           <View style={{ flexDirection: "row", gap: 15 }}>
                              <Ionicons
                                 name="key-outline"
                                 size={20}
                                 color={COLORS.primary}
                              />
                              <Text style={styles.cardText}>Account</Text>
                           </View>
                           <Ionicons
                              name="chevron-forward-outline"
                              size={20}
                              color={COLORS.primary}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={styles.cardItem}>
                     <TouchableOpacity
                        onPress={() => {
                           setAboutVisible(true);
                        }}
                     >
                        <View style={styles.contentWrapper}>
                           <View style={{ flexDirection: "row", gap: 15 }}>
                              <Ionicons
                                 name="information-circle-outline"
                                 size={20}
                                 color={COLORS.primary}
                              />
                              <Text style={styles.cardText}>About Us</Text>
                           </View>
                           <Ionicons
                              name="chevron-forward-outline"
                              size={20}
                              color={COLORS.primary}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
               <View
                  style={{
                     flex: 1,
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <TouchableOpacity
                     onPress={() => navigation.navigate("Start")}
                  >
                     <View style={{ flexDirection: "row", gap: 10 }}>
                        <Text style={styles.logout}>Logout </Text>
                        <Ionicons
                           name="log-out-outline"
                           size={20}
                           color="red"
                        />
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
         <MyProfile isVisible={isMyProfileVisible} onCancel={handleClose} />
         <Account isVisible={isAccountVisible} onCancel={handleClose} />
         <AboutUs isVisible={isAboutVisible} onCancel={handleClose} />
      </View>
   );
}

export default Profile;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },

   // Home styles
   headerContainerProfile: {
      backgroundColor: COLORS.primary,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
   },
   headerProfile: {
      justifyContent: "center",
      height: "45%",
      top: 50,
   },
   headerImage: {
      width: 150,
      height: 150,
      borderWidth: 8,
      marginBottom: 20,
      borderColor: COLORS.white,
      borderRadius: 100,
   },
   headerName: {
      textAlign: "center",
      fontFamily: "Poppins-SemiBold",
      fontSize: 24,
      color: COLORS.white,
   },
   headerText: {
      fontFamily: "Poppins-Regular",
      textAlign: "center",
      fontSize: 16,
      color: COLORS.white,
   },
   whiteContainer: {
      flex: 1,
      width: "100%",
      backgroundColor: "white",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
   },
   contentContainer: {
      flex: 1,
      marginHorizontal: 40,
      marginVertical: 40,
   },
   cardItem: {
      borderRadius: 15,
      height: 60,
      padding: 20,
      marginBottom: 10,
      backgroundColor: "white",
      elevation: 5,
   },

   cardLabelText: {
      fontSize: 18,
      fontFamily: "Poppins-SemiBold",
      marginBottom: 10,
   },
   cardText: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
   },
   contentWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      alignItems: "center",
   },

   logout: {
      fontSize: 16,
      color: "red",
      fontFamily: "Poppins-Regular",
   },

   // Section submit
   modalContainer: {
      backgroundColor: "white",
      marginHorizontal: 10,
      height: "120",
      borderRadius: 15,
      paddingVertical: 20,
   },
   modalHeader: {
      textAlign: "center",
      fontFamily: "Poppins-Regular",
      fontSize: 18,
      marginBottom: 10,
   },
   modalText: {
      textAlign: "justify",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      lineHeight: 30,
   },
   modalButton: {
      marginTop: 15,
      alignSelf: "flex-end",
      right: 20,
      position: "absolute",
   },

   // account change password
   sectionSubtext: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      marginLeft: 10,
   },
   sectionInput: {
      height: 48,
      borderColor: COLORS.gray2,
      borderWidth: 1,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 22,
      fontFamily: "Poppins-Regular",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   sectionInputText: {
      width: "100%",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
   },
});