import {
   View,
   Text,
   TextInput,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   Image,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import Button from "../component/Button";
import Modal from "react-native-modal";
import COLORS from "../component/Colors";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native-paper";
import { FIREBASE_DB } from "../../firebaseConfig";

// success screen page
export function FeedbackCompleted({ navigation }) {
   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Image source={require("../../assets/images/submit-check.png")} />
         <View style={{ marginHorizontal: 40, marginTop: 20 }}>
            <Text style={styles.submitTitle}>Feedback Successfully</Text>
            <Text style={styles.submitText}>
               Thank you for submitting your feedback. Your input is valuable to
               us and will help us improve our services. Your feedback has been
               {"\n"}successfully recorded
            </Text>
            <Button
               title="Close"
               filled
               onPress={() => navigation.navigate("Home")}
               style={{
                  marginTop: 22,
                  marginBottom: 4,
                  border: "none",
                  marginHorizontal: 60,
               }}
            />
         </View>
      </View>
   );
}

// Modal configuration
function ConfirmationModal({ isVisible, onConfirm, onCancel }) {
   return (
      <Modal isVisible={isVisible} backdropOpacity={0.5}>
         <View style={styles.modalContainer}>
            <View style={{ margin: 20 }}>
               <Text style={styles.modalHeader}>
                  Are you sure you want to submit your feedback?
               </Text>
            </View>
            <View style={styles.modalButton}>
               <TouchableOpacity onPress={onCancel}>
                  <View style={styles.moodalCancel}>
                     <Text style={styles.modalCancelText}>Cancel</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity onPress={onConfirm}>
                  <View style={styles.modalConfirm}>
                     <Text style={styles.modalConfirmText}>Confirm</Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
}

function AnswerSurvey({ navigation, route }) {
   const [isConfirmationVisible, setConfirmationVisible] = useState(false);
   const [loading, setLoading] = useState(false);
   const [question1Answer, setQusetion1Answer] = useState("");
   const [question2Answer, setQusetion2Answer] = useState("");
   const [question3Answer, setQusetion3Answer] = useState("");
   const [question4Answer, setQusetion4Answer] = useState("");
   const [question5Answer, setQusetion5Answer] = useState("");
   const [suggestion, setSuggestion] = useState("");
   const [feedbackId, setFeedbackId] = useState("");

   const { userUid } = route.params; // Access the userUid parameter from the route

   // useffect for generating feedback id
   useEffect(() => {
      // Function to generate uid for loan request
      const generateFeedbackId = () => {
         // Generate 6 random numbers (0-9)
         const numChars = "0123456789";
         let numId = "";
         for (let i = 0; i < 6; i++) {
            numId += numChars[Math.floor(Math.random() * 10)];
         }

         // Generate random words (uppercase alphanumeric characters)
         const wordChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
         let wordId = "";
         for (let i = 0; i < 4; i++) {
            wordId += wordChars[Math.floor(Math.random() * 36)];
         }

         const uniqueId = wordId + numId;
         return uniqueId;
      };

      // Set the current date in the state
      setFeedbackId(generateFeedbackId());
   }, []);
   const handleSubmit = () => {
      if (
         !question1Answer ||
         !question2Answer ||
         !question3Answer ||
         !question4Answer ||
         !question5Answer
      ) {
         alert("Pleset select an answer");
      } else {
         setConfirmationVisible(true);
      }
   };
   const handleConfirmSubmit = async () => {
      const userUID = userUid;
      const userDocRef = doc(FIREBASE_DB, "borrowers", userUID);
      const feedbackDocumentRef = doc(userDocRef, "myFeedbacks", feedbackId);
      const feedbackDataToAdd = {
         feedbackId: feedbackId,
         question1Answer: question1Answer,
         question2Answer: question2Answer,
         question3Answer: question3Answer,
         question4Answer: question4Answer,
         question5Answer: question5Answer,
         suggestion: suggestion,
      };
      try {
         setLoading(true);
         await setDoc(feedbackDocumentRef, feedbackDataToAdd);

         console.log("Feeback submitted successfully");
         navigation.navigate("FeedbackCompleted"); // Navigate to the success screen
      } catch (error) {
         console.error("Error adding loan request to Firestore: ", error);
      }
      setConfirmationVisible(false);
      setLoading(false);
   };
   const handleCancelSubmit = () => {
      console.log("Cancelled!");
      setConfirmationVisible(false);
   };

   return (
      <View style={styles.container}>
         <View style={styles.applyContainer}>
            <ScrollView>
               <View style={{ paddingHorizontal: 40 }}>
                  <View style={{ marginBottom: 10 }}>
                     <Text style={styles.sectionText}>
                        Survey Questions: Lending Management System Feedback
                     </Text>
                     <Text
                        style={[styles.sectionSubText, { fontStyle: "italic" }]}
                     >
                        Please rate each statement and for each statement select
                        your level of agreement from the dropdown menu.
                     </Text>
                  </View>
                  <View style={{ marginBottom: 22 }}>
                     <Text style={styles.customSubtextSurvey}>Question 1</Text>
                     <Text style={styles.sectionSubText}>
                        It is easy to navigate and use the mobile application or
                        web-based platform for requesting a loan through the
                        Lending Management System.
                     </Text>

                     <View style={styles.sectionInputDropdown}>
                        <Picker
                           placeholder="Select Answer"
                           selectedValue={question1Answer}
                           mode={question1Answer ? "modal" : "dropdown"}
                           onValueChange={(itemValue) => {
                              setQusetion1Answer(itemValue);
                           }}
                        >
                           <Picker.Item
                              label="Select Answer"
                              value=""
                              style={styles.pickerItem}
                           />

                           <Picker.Item label="Angree" value="Agree" />
                           <Picker.Item
                              label="Strongly Agree"
                              value="Strongly Agree"
                           />
                           <Picker.Item label="Disagree" value="Disagree" />
                           <Picker.Item
                              label="Strongly Disagree"
                              value="Strongly Disagree"
                           />
                        </Picker>
                     </View>
                  </View>
                  <View style={{ marginBottom: 22 }}>
                     <Text style={styles.customSubtextSurvey}>Question 2</Text>
                     <Text style={styles.sectionSubText}>
                        It is easy to navigate and use the mobile application or
                        web-based platform for requesting a loan through the
                        Lending Management System.
                     </Text>

                     <View style={styles.sectionInputDropdown}>
                        <Picker
                           placeholder="Select Answer"
                           selectedValue={question2Answer}
                           mode={question2Answer ? "modal" : "dropdown"}
                           onValueChange={(itemValue) => {
                              setQusetion2Answer(itemValue);
                           }}
                        >
                           <Picker.Item
                              label="Select Answer"
                              value=""
                              style={styles.pickerItem}
                           />

                           <Picker.Item label="Angree" value="Agree" />
                           <Picker.Item
                              label="Strongly Agree"
                              value="Strongly Agree"
                           />
                           <Picker.Item label="Disagree" value="Disagree" />
                           <Picker.Item
                              label="Strongly Disagree"
                              value="Strongly Disagree"
                           />
                        </Picker>
                     </View>
                  </View>
                  <View style={{ marginBottom: 22 }}>
                     <Text style={styles.customSubtextSurvey}>Question 3</Text>
                     <Text style={styles.sectionSubText}>
                        It is easy to navigate and use the mobile application or
                        web-based platform for requesting a loan through the
                        Lending Management System.
                     </Text>

                     <View style={styles.sectionInputDropdown}>
                        <Picker
                           placeholder="Select Answer"
                           selectedValue={question3Answer}
                           mode={question3Answer ? "modal" : "dropdown"}
                           onValueChange={(itemValue) => {
                              setQusetion3Answer(itemValue);
                           }}
                        >
                           <Picker.Item
                              label="Select Answer"
                              value=""
                              style={styles.pickerItem}
                           />

                           <Picker.Item label="Angree" value="Agree" />
                           <Picker.Item
                              label="Strongly Agree"
                              value="Strongly Agree"
                           />
                           <Picker.Item label="Disagree" value="Disagree" />
                           <Picker.Item
                              label="Strongly Disagree"
                              value="Strongly Disagree"
                           />
                        </Picker>
                     </View>
                  </View>
                  <View style={{ marginBottom: 22 }}>
                     <Text style={styles.customSubtextSurvey}>Question 4</Text>
                     <Text style={styles.sectionSubText}>
                        It is easy to navigate and use the mobile application or
                        web-based platform for requesting a loan through the
                        Lending Management System.
                     </Text>

                     <View style={styles.sectionInputDropdown}>
                        <Picker
                           placeholder="Select Answer"
                           selectedValue={question4Answer}
                           mode={question4Answer ? "modal" : "dropdown"}
                           onValueChange={(itemValue) => {
                              setQusetion4Answer(itemValue);
                           }}
                        >
                           <Picker.Item
                              label="Select Answer"
                              value=""
                              style={styles.pickerItem}
                           />

                           <Picker.Item label="Angree" value="Agree" />
                           <Picker.Item
                              label="Strongly Agree"
                              value="Strongly Agree"
                           />
                           <Picker.Item label="Disagree" value="Disagree" />
                           <Picker.Item
                              label="Strongly Disagree"
                              value="Strongly Disagree"
                           />
                        </Picker>
                     </View>
                  </View>
                  <View style={{ marginBottom: 22 }}>
                     <Text style={styles.customSubtextSurvey}>Question 5</Text>
                     <Text style={styles.sectionSubText}>
                        It is easy to navigate and use the mobile application or
                        web-based platform for requesting a loan through the
                        Lending Management System.
                     </Text>

                     <View style={styles.sectionInputDropdown}>
                        <Picker
                           placeholder="Select Answer"
                           selectedValue={question5Answer}
                           mode={question5Answer ? "modal" : "dropdown"}
                           onValueChange={(itemValue) => {
                              setQusetion5Answer(itemValue);
                           }}
                        >
                           <Picker.Item
                              label="Select Answer"
                              value=""
                              style={styles.pickerItem}
                           />

                           <Picker.Item label="Angree" value="Agree" />
                           <Picker.Item
                              label="Strongly Agree"
                              value="Strongly Agree"
                           />
                           <Picker.Item label="Disagree" value="Disagree" />
                           <Picker.Item
                              label="Strongly Disagree"
                              value="Strongly Disagree"
                           />
                        </Picker>
                     </View>
                  </View>
                  <View style={{ marginBottom: 22 }}>
                     <Text style={styles.customSubtextSurvey}>
                        Comments/ Suggestions:
                     </Text>

                     <View
                        style={[
                           styles.sectionInput,
                           {
                              height: 100,
                              marginTop: 10,
                              borderRadius: 15,
                              alignItems: "flex-end",
                           },
                        ]}
                     >
                        <TextInput
                           placeholder="Leave a comment"
                           value={suggestion}
                           mode={suggestion ? "modal" : "dropdown"}
                           multiline={true}
                           numberOfLines={4}
                           onChangeText={(txt) => {
                              setSuggestion(txt);
                           }}
                        />
                     </View>
                  </View>
                  {loading ? (
                     <ActivityIndicator
                        size="large"
                        color="#57708C"
                        style={{
                           marginVertical: 20,
                        }}
                     />
                  ) : (
                     <>
                        <ConfirmationModal
                           isVisible={isConfirmationVisible}
                           onConfirm={handleConfirmSubmit}
                           onCancel={handleCancelSubmit}
                        />
                        <View style={{ marginBottom: 20, marginTop: 10 }}>
                           <Button
                              title="Submit Feedback"
                              filled
                              onPress={handleSubmit}
                           />
                        </View>
                     </>
                  )}
               </View>
            </ScrollView>
         </View>
      </View>
   );
}

export default AnswerSurvey;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
   },
   applyContainer: {
      flex: 1,
      margin: 15,
      borderRadius: 15,
      backgroundColor: COLORS.white,
      paddingVertical: 20,
   },
   sectionText: {
      fontSize: 18,
      fontFamily: "Poppins-Regular",
      color: COLORS.primary,
      marginHorizontal: 5,
   },
   customSubtextSurvey: {
      textAlign: "left",
      fontSize: 14,
      marginHorizontal: 5,
      fontFamily: "Poppins-Bold",
   },
   sectionSubText: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      color: COLORS.black,
      textAlign: "justify",
      marginBottom: 10,
      marginHorizontal: 5,
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
   cardTextTouchable: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      color: COLORS.tertiary,
      borderColor: COLORS.tertiary,
      marginRight: 10,
   },
   customNumner: {
      width: "12%",
      borderRightWidth: 1,
      borderColor: COLORS.gray,
   },
   sectionInputContainer: {
      flexDirection: "row",
      width: "50%",
      gap: 10,
   },
   sectionInputDropdown: {
      height: 48,
      borderColor: COLORS.gray2,
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: 5,
      fontFamily: "Poppins-Regular",
   },
   pickerItem: {
      color: COLORS.gray,
      fontFamily: "Poppins-Regular",
   },
   pickerItemFont: {
      fontFamily: "Poppins-Regular",
   },

   // sumbit
   submitTitle: {
      fontSize: 22,
      fontFamily: "Poppins-Regular",
      color: COLORS.primary,
      textAlign: "center",
   },
   submitText: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      textAlign: "center",
   },

   // Section submit
   modalContainer: {
      backgroundColor: "white",
      marginHorizontal: 20,
      height: 140,
      borderRadius: 15,
   },
   modalHeader: {
      textAlign: "center",
      fontFamily: "Poppins-Regular",
      fontSize: 18,
   },
   modalContainer: {
      backgroundColor: "white",
      marginHorizontal: 20,
      height: 140,
      borderRadius: 15,
   },
   modalHeader: {
      textAlign: "center",
      fontFamily: "Poppins-Regular",
      fontSize: 18,
   },
   modalButton: {
      flexDirection: "row",
      justifyContent: "space-around",
   },
   /*  moodalCancel: {
      borderTopWidth: 1.5,
      paddingVertical: 10,
      borderBottomLeftRadius: 15,
      width: 165,
      alignItems: "center",
      borderTopColor: COLORS.white,
   }, */
   /*   modalConfirm: {
      paddingVertical: 10,
      borderBottomEndRadius: 15,
      width: 165,
      alignItems: "center",
      backgroundColor: COLORS.primary,
   }, */
   modalCancelText: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      color: "red",
   },
   modalConfirmText: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      color: COLORS.primary,
   },
});
