import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
   TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../component/Colors";
import Modal from "react-native-modal";
import Button from "../component/Button";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
   getAuth,
   updatePassword,
   signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { tr } from "date-fns/locale";
import { collection, getDocs } from "firebase/firestore";

// Modal Profile
function MyProfile({ isVisible, onCancel, data }) {
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
                  <Text style={styles.cardText}>
                     {data[0]?.firstName + " " + data[0]?.lastName}
                  </Text>
               </View>
               <Text style={styles.sectionSubtext}>Address</Text>
               <View style={styles.cardItem}>
                  <Text style={styles.cardText}>{data[0]?.presentAddress}</Text>
               </View>
               <Text style={styles.sectionSubtext}>Email address</Text>
               <View style={styles.cardItem}>
                  <Text style={styles.cardText}>{data[0]?.emailAddress}</Text>
               </View>
               <Text style={styles.sectionSubtext}>Number</Text>
               <View style={styles.cardItem}>
                  <Text style={styles.cardText}>{data[0]?.contactNumber}</Text>
               </View>
            </View>
         </View>
      </Modal>
   );
}

// Modal Account
function Account({ isVisible, onCancel }) {
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [isNewPassPassShown, setNewPassShown] = useState(true);
   const [isConfirmPassShown, setConfirmPassShown] = useState(true);
   const [loading, setLoading] = useState(false);

   const auth = getAuth();

   const updatePasswordAsync = async (currentPassword, newPassword) => {
      try {
         const user = auth.currentUser;
         // Sign in the user with their current password before updating the password
         await signInWithEmailAndPassword(auth, user.email, currentPassword);
         // Update the password
         await updatePassword(user, newPassword);
         return { success: true };
      } catch (error) {
         return { success: false, error };
      }
   };

   const handlePasswordUpdate = async () => {
      setLoading(true);

      let alertMessage = null; // Store the alert message

      if (!currentPassword || !newPassword || !confirmPassword) {
         alertMessage = "Please fill in all the required fields.";
      } else if (newPassword !== confirmPassword) {
         alertMessage = "New passwords do not match.";
      } else if (confirmPassword.length < 6 || newPassword.length < 6) {
         alertMessage = "Password must be at least 6 characters long.";
      } else if (
         confirmPassword === currentPassword ||
         newPassword === currentPassword
      ) {
         alertMessage = "Password already in use.";
      } else {
         const result = await updatePasswordAsync(currentPassword, newPassword);

         if (result.success) {
            // Password update was successful
            alertMessage = "Password updated successfully.";
         } else {
            // Password update failed
            alertMessage = "Current password does not match.";
         }
      }
      alert(alertMessage); // Display the alert message

      setLoading(false); // Set loading to false
   };

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
                        onChangeText={(text) => setCurrentPassword(text)}
                        secureTextEntry
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
                        onChangeText={(text) => setNewPassword(text)}
                        secureTextEntry={isNewPassPassShown}
                     />
                     <TouchableOpacity
                        onPress={() => setNewPassShown(!isNewPassPassShown)}
                        style={{
                           position: "absolute",
                           right: 20,
                        }}
                     >
                        {isNewPassPassShown == true ? (
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
               <View style={{ marginHorizontal: 15 }}>
                  <Text style={styles.sectionSubtext}>Confirm Password</Text>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Confirm your new password"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        returnKeyType="next"
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={isConfirmPassShown}
                     />
                     <TouchableOpacity
                        onPress={() => setConfirmPassShown(!isConfirmPassShown)}
                        style={{
                           position: "absolute",
                           right: 20,
                        }}
                     >
                        {isConfirmPassShown == true ? (
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
               <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                  {loading ? (
                     <ActivityIndicator size="large" color="#57708C" />
                  ) : (
                     <Button
                        title="Update"
                        filled
                        onPress={() => {
                           handlePasswordUpdate();
                        }}
                     />
                  )}
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

function Profile({ navigation, route }) {
   const [isMyProfileVisible, setMyProfileVisible] = useState(false);
   const [isAccountVisible, setAccountVisible] = useState(false);
   const [isAboutVisible, setAboutVisible] = useState(false);
   const [memberData, setMemberData] = useState([]);
   const { userUid } = route.params; // Access the userUid parameter from the route

   useEffect(() => {
      fetchFirestoreData();
   }, []);

   const fetchFirestoreData = async () => {
      const memberRegisterCollection = collection(
         FIREBASE_DB,
         "memberRegister"
      );
      try {
         const querySnapshot = await getDocs(memberRegisterCollection);
         const data = [];
         querySnapshot.forEach((doc) => {
            const member = doc.data();
            if (userUid === member.accountID) {
               data.push(member);
            }
         });
         setMemberData(data);
      } catch (error) {
         console.error("Error querying the memberRegister collection: ", error);
      }
   };

   // Function to handle the sign-out and navigate to the "Login" screen
   const handleSignOut = async () => {
      try {
         await FIREBASE_AUTH.signOut();
         // Navigate to the "Login" screen
         navigation.navigate("Login");
      } catch (error) {
         console.error("Sign-out error: ", error);
      }
   };

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
               <Text style={styles.headerName}>
                  {memberData[0]?.firstName + " " + memberData[0]?.lastName}
               </Text>
               <Text style={styles.headerText}>
                  Member Since {memberData[0]?.memberSince}
               </Text>
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
                  <View
                     style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <TouchableOpacity onPress={() => handleSignOut()}>
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
         </View>
         <MyProfile
            isVisible={isMyProfileVisible}
            onCancel={handleClose}
            data={memberData}
         />
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
