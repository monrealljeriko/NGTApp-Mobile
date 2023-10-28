import {
   View,
   Text,
   StyleSheet,
   TextInput,
   Image,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import {
   collection,
   doc,
   setDoc,
   getDoc,
   getDocs,
   updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Button from "../component/Button";
import Modal from "react-native-modal";
import COLORS from "../component/Colors";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native-paper";
import { FIREBASE_DB } from "../../firebaseConfig";
import { addMonths, addWeeks, addDays, format } from "date-fns";
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

function Apply({ navigation, route }) {
   const [isConfirmationVisible, setConfirmationVisible] = useState(false);
   const [showEMICalculation, setShowEMICalculation] = useState(false);
   // for calculations
   const [selectedTerms, setSelectedTerms] = useState("");
   const [numberOfPayments, setNumberOfPayments] = useState("");
   const [selectedLoans, setSelectedLoans] = useState("");
   const [purposeOfLoan, setPurposeOfLoan] = useState("");
   const [payableLabel, setPayableLabel] = useState("");
   const [interestRateLabel, setInterestRateLabel] = useState("0");
   const [dateRequested, setDateRequested] = useState("");
   const [timeRequested, setTimeRequested] = useState("");

   // for payment schedule
   const [paymentSchedule, setPaymentSchedule] = useState([]);
   const [serviceHandlingCharge, setServiceHandlingCharge] = useState(0);
   const [totalFinanceCharge, setTotalFinanceCharge] = useState(0);
   const [totalNonFinanceCharges, setTotalNonFinanceCharges] = useState(0);
   const [totalDeductionCharge, setTotalDeductionCharge] = useState(0);
   const [netProceedsFromLoan, setNetProceedsFromLoan] = useState(0);
   const [totalPayment, setTotalPayment] = useState(0);
   const [loanRequestID, setLoanRequestID] = useState(0);
   const [schedulePaymentID, setSchedulePaymentID] = useState(0);

   const [loading, setLoading] = useState(false);
   const [pendingLoan, setPendingLoan] = useState([]);
   const [activeLoan, setActiveLoan] = useState([]);
   const { userUid } = route.params; // Access the userUid parameter from the route

   // fetch data from firestore database
   useEffect(() => {
      const fetchLoanData = async () => {
         if (userUid) {
            // Fetch the totalLoans data from Firestore
            const borrowerUid = userUid;
            const borrowerRef = doc(FIREBASE_DB, "borrowers", borrowerUid);

            try {
               const borrowerSnapshot = await getDoc(borrowerRef);
               if (borrowerSnapshot.exists()) {
                  const loanRef = collection(borrowerRef, "loanRequests");
                  const querySnapshot = await getDocs(loanRef);

                  const pendingLoanData = [];
                  const activeLoanData = [];

                  // snapshot the loan data
                  querySnapshot.forEach((loanDoc) => {
                     const loan = loanDoc.data();
                     if (loan.status === "Pending") {
                        pendingLoanData.push(loan);
                     }
                     if (loan.status === "Active") {
                        activeLoanData.push(loan);
                     }
                  });

                  // save the data to usestate
                  setPendingLoan(pendingLoanData);
                  setActiveLoan(activeLoanData);
               }
            } catch (error) {
               console.error("Error fetching data from Firestore:", error);
            }
            setLoading(false);
         } else {
            setLoading(false);
         }
      };
      fetchLoanData();
   }, []);

   // update the fields and calculations
   useEffect(() => {
      calculateTotals();
   }, [selectedTerms, numberOfPayments, selectedLoans, purposeOfLoan]);

   // date and uid
   useEffect(() => {
      // Function to get the current date
      const now = new Date();
      const getCurrentDate = () => {
         const year = now.getFullYear();
         const month = now.getMonth() + 1; // Months are zero-based (0 = January, 11 = December)
         const day = now.getDate();
         return `${month}/${day}/${year}`;
      };

      // Function to get the current time
      const getCurrentTime = () => {
         const hours = now.getHours();
         const minutes = now.getMinutes();
         return `${hours}:${minutes}`;
      };

      // Function to generate uid for loan request
      const generateRequestId = (idx) => {
         // Generate 6 random numbers (0-9)
         const numChars = "0123456789";
         let numId = "";
         for (let i = 0; i < idx; i++) {
            numId += numChars[Math.floor(Math.random() * 10)];
         }

         // Generate 2 random words (uppercase alphanumeric characters)
         const wordChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
         let wordId = "";
         for (let i = 0; i < 2; i++) {
            wordId += wordChars[Math.floor(Math.random() * 36)];
         }

         const uniqueId = wordId + numId;

         return uniqueId;
      };

      // Set the current date in the state
      setLoanRequestID(generateRequestId(6));
      setSchedulePaymentID(generateRequestId(4));
      setDateRequested(getCurrentDate());
      setTimeRequested(getCurrentTime());
   }, []);

   const calculateTotals = () => {
      const term = parseInt(selectedTerms);
      const loanAmount = parseInt(selectedLoans);
      const status = "incomplete";
      const due = false;
      const overdue = false;
      const overdueDays = 0;
      const nextPaymentDate = [];

      // get the current date
      const currentDate = new Date();
      const currentDay = currentDate.getDate();

      if (term === 30) {
         switch (numberOfPayments) {
            case "Daily":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.0125).toFixed(1))
               );
               setInterestRateLabel("1.25%");
               setTotalPayment(parseFloat((loanAmount / 30).toFixed(1)));
               setPayableLabel("30/days");

               // setSchedule Payments
               for (let day = 1; day <= 30; day++) {
                  const nextDay = addDays(currentDate, day);
                  nextPaymentDate.push({
                     count: day < 10 ? `0${day}` : `${day}`,
                     date: format(nextDay, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 30).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Weekly":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.02).toFixed(1))
               );
               setInterestRateLabel("2%");
               setTotalPayment(parseFloat((loanAmount / 4.29).toFixed(1)));
               setPayableLabel("4/wks");

               // setSchedule Payments
               for (let week = 1; week <= 4; week++) {
                  const nextWeek = addWeeks(currentDate, week);
                  nextPaymentDate.push({
                     count: week < 10 ? `0${week}` : `${week}`,
                     date: format(nextWeek, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 4.29).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Monthly":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.025).toFixed(1))
               );
               setInterestRateLabel("2.5%");
               setTotalPayment(parseFloat((loanAmount / 1).toFixed(1)));
               setPayableLabel("1/mos");

               // setSchedule Payments
               const nextMonth = addMonths(currentDate, 1);

               nextPaymentDate.push({
                  count: "01",
                  date: format(nextMonth, "MM/dd/yyyy"),
                  amount: parseFloat((loanAmount / 1).toFixed(1)),
                  status,
                  due,
                  overdue,
                  overdueDays,
               });
               break;
            default:
               break;
         }
      }
      if (term === 60) {
         switch (numberOfPayments) {
            case "Daily":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.0325).toFixed(1))
               );
               setInterestRateLabel("3.25%");
               setTotalPayment(parseFloat((loanAmount / 60).toFixed(1)));
               setPayableLabel("60/days");

               for (let day = 1; day <= 60; day++) {
                  const nextDay = addDays(currentDate, day);
                  nextPaymentDate.push({
                     count: day < 10 ? `0${day}` : `${day}`,
                     date: format(nextDay, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 60).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Weekly":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.04).toFixed(1))
               );
               setInterestRateLabel("4%");
               setTotalPayment(parseFloat((loanAmount / 8.57).toFixed(1)));
               setPayableLabel("8/wks");

               for (let week = 1; week <= 8; week++) {
                  const nextWeek = addWeeks(currentDate, week);
                  nextPaymentDate.push({
                     count: week < 10 ? `0${week}` : `${week}`,
                     date: format(nextWeek, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 8).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Monthly":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.05).toFixed(1))
               );
               setInterestRateLabel("5%");
               setTotalPayment(parseFloat((loanAmount / 2).toFixed(1)));
               setPayableLabel("2/mos");

               for (let mos = 1; mos <= 2; mos++) {
                  const nextMonth = addMonths(currentDate, mos);
                  const nextDate = new Date(
                     nextMonth.getFullYear(),
                     nextMonth.getMonth(),
                     currentDay
                  );
                  nextPaymentDate.push({
                     count: mos < 10 ? `0${mos}` : `${mos}`,
                     date: format(nextDate, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 2).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            default:
               break;
         }
      }
      if (term === 100) {
         switch (numberOfPayments) {
            case "Daily":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.055).toFixed(1))
               );
               setInterestRateLabel("5.5%");
               setTotalPayment(parseFloat((loanAmount / 100).toFixed(1)));
               setPayableLabel("30/days");
               setPayableLabel("100/days");

               for (let day = 1; day <= 100; day++) {
                  const nextDay = addDays(currentDate, day);
                  nextPaymentDate.push({
                     count:
                        day < 10
                           ? `00${day}`
                           : day < 100
                           ? `0${day}`
                           : `${day}`,
                     date: format(nextDay, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 100).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Weekly":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.07).toFixed(1))
               );
               setInterestRateLabel("7%");
               setTotalPayment(parseFloat((loanAmount / 14).toFixed(1)));
               setPayableLabel("14/wks");

               for (let week = 1; week <= 14; week++) {
                  const nextWeek = addWeeks(currentDate, week);
                  nextPaymentDate.push({
                     count: week < 10 ? `0${week}` : `${week}`,
                     date: format(nextWeek, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 14).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Monthly":
               setTotalFinanceCharge(
                  parseFloat((loanAmount * 0.08).toFixed(1))
               );
               setInterestRateLabel("8%");
               setTotalPayment(parseFloat((loanAmount / 3).toFixed(1)));
               setPayableLabel("3/mos");

               for (let mos = 1; mos <= 3; mos++) {
                  const nextMonth = addMonths(currentDate, mos);
                  const nextDate = new Date(
                     nextMonth.getFullYear(),
                     nextMonth.getMonth(),
                     currentDay
                  );
                  nextPaymentDate.push({
                     count: mos < 10 ? `0${mos}` : `${mos}`,
                     date: format(nextDate, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 3).toFixed(1)),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            default:
               break;
         }
      }
      setPaymentSchedule(nextPaymentDate);
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
      if (pendingLoan.length > 0) {
         alert(
            "You have a pending loan. Please wait for approval before applying for a new loan."
         );
      } else if (activeLoan.length > 0) {
         alert(
            "You have an active loan. Please wait until your current loan is completed before applying for a new one."
         );
      } else {
         setConfirmationVisible(true);
      }
   };
   const handleConfirmSubmit = async () => {
      // Get the user's UID
      const userUID = userUid;
      const userDocRef = doc(FIREBASE_DB, "borrowers", userUID);
      const borrowerSnapshot = await getDoc(userDocRef);
      const borrowerData = borrowerSnapshot.data();
      const borrowerLoanCount = borrowerData.loanCount;
      const newLoanCount = borrowerLoanCount + 1;
      await updateDoc(userDocRef, { loanCount: newLoanCount });

      // set of fields
      const loanReqDataToAdd = {
         loanID: loanRequestID,
         loanAmount: parseInt(selectedLoans),
         purposeOfLoan: purposeOfLoan,
         terms: selectedTerms,
         numberOfPayments: numberOfPayments,
         payableIN: payableLabel,
         interestRate: interestRateLabel,
         serviceHandlingCharge: serviceHandlingCharge,
         financeCharge: totalFinanceCharge,
         netProceedsFromLoan: netProceedsFromLoan,
         payment: totalPayment,
         dateRequested: dateRequested,
         timeRequested: timeRequested,
         dateDue: paymentSchedule[paymentSchedule.length - 1].date,
         dateGranted: paymentSchedule[0].date,
         status: "Pending",
         loanCount: newLoanCount,
      };

      const schedulePaymentDataToAdd = {
         scheduleID: schedulePaymentID,
         paymentSchedule: paymentSchedule,
         loanID: loanRequestID,
      };

      try {
         setLoading(true);

         // Reference to the loan requests subcollection
         const loanRequestsCollectionRef = collection(
            userDocRef,
            "loanRequests"
         );
         const paymentScheduleCollectionRef = collection(
            userDocRef,
            "paymentSchedule"
         );

         // Add the loan request document to the loanRequests subcollection
         await setDoc(
            doc(loanRequestsCollectionRef, loanRequestID),
            loanReqDataToAdd
         );
         await setDoc(
            doc(paymentScheduleCollectionRef, schedulePaymentID),
            schedulePaymentDataToAdd
         );
         console.log("LoanCount:", newLoanCount);
         console.log("LoanID: " + loanRequestID);
         console.log("scheduleID: " + schedulePaymentID);
         console.log("Loan request added to Firestore successfully!");
         navigation.navigate("RequestCompleted"); // Navigate to the success screen
      } catch (error) {
         console.error("Error adding loan request to Firestore: ", error);
      } finally {
         setConfirmationVisible(false);
         setLoading(false);
      }
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
                           mode={selectedTerms ? "modal" : "dropdown"}
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
                     <Text style={styles.sectionSubText}>
                        Number of payments
                     </Text>

                     <View style={styles.sectionInputDropdown}>
                        <Picker
                           placeholder="Number of Payments"
                           selectedValue={numberOfPayments}
                           onValueChange={(itemValue) => {
                              setNumberOfPayments(itemValue);
                           }}
                           mode={numberOfPayments ? "modal" : "dropdown"}
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
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                     }}
                  >
                     <Text style={styles.sectionSubText}>EMI Calculations</Text>
                     <TouchableOpacity
                        onPress={() =>
                           setShowEMICalculation(!showEMICalculation)
                        }
                     >
                        <Text style={styles.cardTextTouchable}>
                           {showEMICalculation == true ? "Hide" : "Show"}
                        </Text>
                     </TouchableOpacity>
                  </View>
                  {showEMICalculation && (
                     <View>
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
                                    {selectedLoans != "" &&
                                       selectedTerms != "" &&
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
                                    {selectedLoans != "" &&
                                       selectedTerms != "" &&
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
                                    {selectedLoans != "" &&
                                       selectedTerms != "" &&
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
                                    {selectedLoans != "" &&
                                       selectedTerms != "" &&
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
                                    {selectedLoans != "" &&
                                       selectedTerms != "" &&
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
                                 <Text
                                    style={[
                                       styles.cardTextBold,
                                       { fontSize: 22 },
                                    ]}
                                 >
                                    ₱
                                    {selectedLoans != "" &&
                                       selectedTerms != "" &&
                                       numberOfPayments != "" &&
                                       totalPayment}
                                 </Text>
                              </View>
                           </View>
                           <View style={styles.cardItem}>
                              <View style={styles.contentWrapper}>
                                 <Text style={styles.cardText}>Payable in</Text>
                                 <Text
                                    style={[
                                       styles.cardTextBold,
                                       { fontSize: 22 },
                                    ]}
                                 >
                                    {payableLabel == "" ? "/" : payableLabel}
                                 </Text>
                              </View>
                           </View>
                        </View>
                     </View>
                  )}
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
                        <View style={{ marginVertical: 20 }}>
                           <Button
                              title="Submit Request"
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
