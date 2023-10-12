import {
   View,
   Text,
   StyleSheet,
   TextInput,
   Image,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../component/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Button from "../component/Button";
import Modal from "react-native-modal";

// success screen page
export function RequestCompleted({ navigation }) {
   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Image source={require("../../assets/images/submit-check.png")} />
         <View style={{ marginHorizontal: 40, marginTop: 20 }}>
            <Text style={styles.submitTitle}>Requested Successfully</Text>
            <Text style={styles.submitText}>
               Your request has been submitted successfully. You will be
               notified soon.
            </Text>
            <Button
               title="Close"
               filled
               onPress={() => navigation.navigate("Loans")}
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
                  Are you sure you want to submit your request?
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

function Apply({ navigation }) {
   const [isConfirmationVisible, setConfirmationVisible] = useState(false);
   const [loanStatus, setLoanStatus] = useState(true);

   // for calculations
   const [selectedTerms, setSelectedTerms] = useState("");
   const [numberOfPayments, setNumberOfPayments] = useState("");
   const [selectedLoans, setSelectedLoans] = useState("");
   const [purposeOfLoan, setPurposeOfLoan] = useState("");
   const [payableLabel, setPayableLabel] = useState("");
   const [interestRateLabel, setInterestRateLabel] = useState("0");

   const [interestRate, setInterestRate] = useState(0);
   const [serviceHandlingCharge, setServiceHandlingCharge] = useState(0);
   const [totalFinanceCharge, setTotalFinanceCharge] = useState(0);
   const [totalNonFinanceCharges, setTotalNonFinanceCharges] = useState(0);
   const [totalDeductionCharge, setTotalDeductionCharge] = useState(0);
   const [netProceedsFromLoan, setNetProceedsFromLoan] = useState(0);
   const [totalPayment, setTotalPayment] = useState(0);
   const [payableIN, setPayableIN] = useState(0);

   useEffect(() => {
      calculateTotals();
   }, [selectedTerms, numberOfPayments, selectedLoans, purposeOfLoan]);

   const calculateTotals = () => {
      const term = parseInt(selectedTerms);
      const loanAmount = parseInt(selectedLoans);

      if (term === 30) {
         switch (numberOfPayments) {
            case "Daily":
               setInterestRate(0.0125);
               setInterestRateLabel("1.25%");
               setTotalPayment(parseFloat((loanAmount / 30).toFixed(1)));
               setPayableIN(30);
               setPayableLabel("days");
               break;
            case "Weekly":
               setInterestRate(0.02);
               setInterestRateLabel("2%");
               setTotalPayment(parseFloat((loanAmount / 4.29).toFixed(1)));
               setPayableIN(4);
               setPayableLabel("wks");
               break;
            case "Monthly":
               setInterestRate(0.025);
               setInterestRateLabel("2.5%");
               setTotalPayment(parseFloat((loanAmount / 1).toFixed(1)));
               setPayableIN(1);
               setPayableLabel("mos");
               break;
            default:
               break;
         }
      }
      if (term === 60) {
         switch (numberOfPayments) {
            case "Daily":
               setInterestRate(0.0325);
               setInterestRateLabel("3.25%");
               setTotalPayment(parseFloat((loanAmount / 60).toFixed(1)));
               setPayableIN(60);
               setPayableLabel("days");
               break;
            case "Weekly":
               setInterestRate(0.04);
               setInterestRateLabel("4%");
               setTotalPayment(parseFloat((loanAmount / 8.57).toFixed(1)));
               setPayableIN(8);
               setPayableLabel("wks");
               break;
            case "Monthly":
               setInterestRate(0.05);
               setInterestRateLabel("5%");
               setTotalPayment(parseFloat((loanAmount / 2).toFixed(1)));
               setPayableIN(2);
               setPayableLabel("mos");
               break;
            default:
               break;
         }
      }
      if (term === 100) {
         switch (numberOfPayments) {
            case "Daily":
               setInterestRate(0.055);
               setInterestRateLabel("5.5%");
               setTotalPayment(parseFloat((loanAmount / 100).toFixed(1)));
               setPayableIN(100);
               setPayableLabel("days");
               break;
            case "Weekly":
               setInterestRate(0.07);
               setInterestRateLabel("7%");
               setTotalPayment(parseFloat((loanAmount / 14).toFixed(1)));
               setPayableIN(14);
               setPayableLabel("wks");
               break;
            case "Monthly":
               setInterestRate(0.08);
               setInterestRateLabel("8%");
               setTotalPayment(parseFloat((loanAmount / 3).toFixed(1)));
               setPayableIN(3);
               setPayableLabel("mos");
               break;
            default:
               break;
         }
      }

      setTotalFinanceCharge(parseFloat((loanAmount * interestRate).toFixed(1)));
      setTotalNonFinanceCharges(100);
      setServiceHandlingCharge(parseFloat((loanAmount * 0.02).toFixed(1)));
      setTotalDeductionCharge(
         parseFloat(
            (
               totalFinanceCharge +
               totalNonFinanceCharges +
               serviceHandlingCharge
            ).toFixed(1)
         )
      );
      setNetProceedsFromLoan(
         parseFloat((loanAmount - totalDeductionCharge).toFixed(1))
      );
   };

   const handleSubmit = () => {
      setConfirmationVisible(true);
   };
   const handleConfirmSubmit = () => {
      console.log("Successul!");
      navigation.navigate("RequestCompleted");
   };
   const handleCancelSubmit = () => {
      console.log("Cancelled!");
      setConfirmationVisible(false);
   };
   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={styles.applyContainer}>
               <View style={{ marginBottom: 12 }}>
                  <Text style={styles.sectionSubText}>Loan Amount</Text>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="₱"
                        editable={false}
                        placeholderTextColor={COLORS.gray}
                        keyboardType="numeric"
                        style={{ bottom: 3 }}
                     />

                     <TextInput
                        placeholder="0.0"
                        placeholderTextColor={COLORS.gray}
                        keyboardType="numeric"
                        style={styles.sectionInputText}
                        value={selectedLoans}
                        onChangeText={(text) => setSelectedLoans(text)}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 12 }}>
                  <Text style={styles.sectionSubText}>Purpose</Text>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Name of Purpose"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        value={purposeOfLoan}
                        onChangeText={(text) => setPurposeOfLoan(text)}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 22 }}>
                  <Text style={styles.sectionSubText}>Term</Text>

                  <View style={styles.sectionInputDropdown}>
                     <Picker
                        placeholder="Number of Days"
                        selectedValue={selectedTerms}
                        onValueChange={(itemValue) => {
                           setSelectedTerms(itemValue);
                        }}
                        mode={Platform.OS === "ios" ? "modal" : "dropdown"}
                        style={styles.pickerItemFont}
                     >
                        <Picker.Item
                           label="Number of Days"
                           value=""
                           style={styles.pickerItem}
                        />

                        <Picker.Item label="30 Days" value="30" />
                        <Picker.Item label="60 Days" value="60" />
                        <Picker.Item label="100 Days" value="100" />
                     </Picker>
                  </View>
               </View>
               <View style={{ marginBottom: 22 }}>
                  <Text style={styles.sectionSubText}>Number of payments</Text>

                  <View style={styles.sectionInputDropdown}>
                     <Picker
                        placeholder="Number of Payments"
                        selectedValue={numberOfPayments}
                        onValueChange={(itemValue) => {
                           setNumberOfPayments(itemValue);
                        }}
                        mode={Platform.OS === "ios" ? "modal" : "dropdown"}
                        style={styles.pickerItemFont}
                     >
                        <Picker.Item
                           label="Number of Payments"
                           value=""
                           style={styles.pickerItem}
                        />

                        <Picker.Item label="Daily" value="Daily" />
                        <Picker.Item label="Weekly" value="Weekly" />
                        <Picker.Item label="Monthly" value="Monthly" />
                     </Picker>
                  </View>
               </View>
               <Text style={styles.sectionSubText}>Calculations</Text>

               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}
               >
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>Interest</Text>
                        <Text style={styles.cardTextBold}>
                           {interestRateLabel}
                        </Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Service Handling Charge (2%)
                        </Text>
                        <Text style={styles.cardTextBold}>
                           ₱
                           {selectedTerms != "" &&
                              numberOfPayments != "" &&
                              serviceHandlingCharge}
                        </Text>
                     </View>
                  </View>
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}
               >
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Total Finance Charge
                        </Text>
                        <Text style={styles.cardTextBold}>
                           ₱
                           {selectedTerms != "" &&
                              numberOfPayments != "" &&
                              totalFinanceCharge}
                        </Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Total Non Finance Charge
                        </Text>
                        <Text style={styles.cardTextBold}>
                           ₱
                           {selectedTerms != "" &&
                              numberOfPayments != "" &&
                              totalNonFinanceCharges}
                        </Text>
                     </View>
                  </View>
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}
               >
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Total Deduction charge
                        </Text>
                        <Text style={styles.cardTextBold}>
                           ₱
                           {selectedTerms != "" &&
                              numberOfPayments != "" &&
                              totalDeductionCharge}
                        </Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Net Proceed from Loans
                        </Text>
                        <Text style={styles.cardTextBold}>
                           ₱
                           {selectedTerms != "" &&
                              numberOfPayments != "" &&
                              netProceedsFromLoan}
                        </Text>
                     </View>
                  </View>
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}
               >
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Your {numberOfPayments} Payment
                        </Text>
                        <Text style={[styles.cardTextBold, { fontSize: 22 }]}>
                           ₱
                           {selectedTerms != "" &&
                              numberOfPayments != "" &&
                              totalPayment}
                        </Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>Payable in</Text>
                        <Text style={[styles.cardTextBold, { fontSize: 22 }]}>
                           {payableIN}/{payableLabel}
                        </Text>
                     </View>
                  </View>
               </View>
               <View style={{ marginVertical: 20 }}>
                  <Button
                     title="Submit Request"
                     filled
                     onPress={handleSubmit}
                  />
               </View>
            </View>
            <ConfirmationModal
               isVisible={isConfirmationVisible}
               onConfirm={handleConfirmSubmit}
               onCancel={handleCancelSubmit}
            />
         </ScrollView>
      </View>
   );
}

export default Apply;

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
      paddingHorizontal: 40,
   },
   sectionText: {
      fontSize: 18,
      fontFamily: "Poppins-Regular",
      color: COLORS.primary,
   },
   sectionSubText: {
      fontSize: 16,
      fontFamily: "Poppins-Regular",
      color: COLORS.black,
      marginBottom: 10,
      marginLeft: 5,
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

   cardItem: {
      justifyContent: "center",
      borderRadius: 15,
      width: "48%",
      padding: 10,
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
      fontSize: 14,
   },
   cardTextBold: {
      fontSize: 24,
      fontFamily: "Poppins-SemiBold",
      color: COLORS.primary,
   },
   contentWrapper: {
      justifyContent: "space-between",
      marginHorizontal: 10,
      alignItems: "center",
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
