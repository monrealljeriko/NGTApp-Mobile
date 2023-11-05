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
   const [payableLabelCount, setPayableLabelCount] = useState(0);
   const [shareCapitalShare, setShareCapitalShare] = useState(0);

   const [loading, setLoading] = useState(false);
   const [pendingLoan, setPendingLoan] = useState([]);
   const [activeLoan, setActiveLoan] = useState([]);
   const [memberName, setMemberName] = useState("");
   const { userUid } = route.params; // Access the userUid parameter from the route

   // runs the component of first mount

   useEffect(() => {
      fetchLoanData();
   }, []);

   useEffect(() => {
      calculateTotals();
   }, [selectedTerms, numberOfPayments, selectedLoans, purposeOfLoan]);

   // useffect for generating date and uid
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
         // Generate random numbers (0-9)
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

   // Fetch the totalLoans data from Firestore database;
   const fetchLoanData = async () => {
      if (userUid) {
         const borrowerUid = userUid;
         const borrowerRef = doc(FIREBASE_DB, "borrowers", borrowerUid);
         const memberRegisterCollection = collection(
            FIREBASE_DB,
            "memberRegister"
         );

         try {
            const borrowerSnapshot = await getDoc(borrowerRef);
            let data = "";
            const pendingLoanData = [];
            const activeLoanData = [];

            if (borrowerSnapshot.exists()) {
               const memberSnapshot = await getDocs(memberRegisterCollection);
               const loanRef = collection(borrowerRef, "loanRequests");
               const querySnapshot = await getDocs(loanRef);

               memberSnapshot.forEach(async (doc) => {
                  const member = doc.data();

                  if (borrowerUid === member.accountID) {
                     data = member.firstName + member.lastName;

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
                  }
               });

               console.log(data);
               console.log(pendingLoanData);
               console.log(activeLoanData);
               // save the data to usestate
               setMemberName(data);
               setPendingLoan(pendingLoanData);
               setActiveLoan(activeLoanData);
            }
         } catch (error) {
            console.error("Error fetching data from Firestore:", error);
         }
         setLoading(false);
      }
   };
   // update the fields and calculations

   // calculate functions
   const calculateTotals = () => {
      const term = parseInt(selectedTerms);
      const loanAmount = parseInt(selectedLoans);
      const status = "incomplete";
      const due = false;
      const scheduleID = schedulePaymentID;
      const name = memberName;
      const loanID = loanRequestID;
      const overdue = false;
      const overdueDays = 0;
      const nextPaymentDate = [];
      // get the current date
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      setServiceHandlingCharge(parseFloat((loanAmount * 0.03).toFixed()));
      let financeCharge = 0;
      let shareCapitalBuild = 0;
      const nationalFee = 100;
      if (loanAmount >= 3200) {
         shareCapitalBuild = parseFloat((loanAmount * 0.01).toFixed());
      }
      if (loanAmount < 3200) {
         shareCapitalBuild = parseFloat((loanAmount * 0.02).toFixed());
      }

      if (term === 30) {
         switch (numberOfPayments) {
            case "Daily": // with interest of 1.25%
               financeCharge = parseFloat((loanAmount * 0.0125).toFixed());
               setInterestRateLabel("1.25%");
               setTotalPayment(parseFloat((loanAmount / 30).toFixed()));
               setPayableLabel("days");
               setPayableLabelCount(30);
               // setSchedule Payments
               for (let day = 1; day <= 30; day++) {
                  const nextDay = addDays(currentDate, day);
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count: day < 10 ? `0${day}` : `${day}`,
                     date: format(nextDay, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 30).toFixed()),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Weekly": // with interest of 2%
               financeCharge = parseFloat((loanAmount * 0.02).toFixed());
               setInterestRateLabel("2%");
               setTotalPayment(parseFloat((loanAmount / 4).toFixed()));
               setPayableLabel("wks");
               setPayableLabelCount(4);

               // setSchedule Payments
               for (let week = 1; week <= 4; week++) {
                  const nextWeek = addWeeks(currentDate, week);
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count: week < 10 ? `0${week}` : `${week}`,
                     date: format(nextWeek, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 4).toFixed()),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Monthly": // with interest of 2.5%%
               financeCharge = parseFloat((loanAmount * 0.025).toFixed());

               setInterestRateLabel("2.5%");
               setTotalPayment(parseFloat((loanAmount / 1).toFixed()));
               setPayableLabel("mos");
               setPayableLabelCount(1);

               // setSchedule Payments
               const nextMonth = addMonths(currentDate, 1);

               nextPaymentDate.push({
                  loanID,
                  scheduleID,
                  name,
                  count: "01",
                  date: format(nextMonth, "MM/dd/yyyy"),
                  amount: parseFloat((loanAmount / 1).toFixed()),
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
            case "Daily": // with interest of 3.25%
               financeCharge = parseFloat((loanAmount * 0.0325).toFixed());
               setInterestRateLabel("3.25%");
               setTotalPayment(parseFloat((loanAmount / 60).toFixed()));
               setPayableLabel("days");
               setPayableLabelCount(60);

               for (let day = 1; day <= 60; day++) {
                  const nextDay = addDays(currentDate, day);
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count: day < 10 ? `0${day}` : `${day}`,
                     date: format(nextDay, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 60).toFixed()),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Weekly": // with interest of 4%
               financeCharge = parseFloat((loanAmount * 0.04).toFixed());
               setInterestRateLabel("4%");
               setTotalPayment(parseFloat((loanAmount / 8).toFixed()));
               setPayableLabel("wks");
               setPayableLabelCount(8);

               for (let week = 1; week <= 8; week++) {
                  const nextWeek = addWeeks(currentDate, week);
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count: week < 10 ? `0${week}` : `${week}`,
                     date: format(nextWeek, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 8).toFixed()),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Monthly": // with interest of 5%
               financeCharge = parseFloat((loanAmount * 0.05).toFixed());
               setInterestRateLabel("5%");
               setTotalPayment(parseFloat((loanAmount / 2).toFixed()));
               setPayableLabel("mos");
               setPayableLabelCount(2);

               for (let mos = 1; mos <= 2; mos++) {
                  const nextMonth = addMonths(currentDate, mos);
                  const nextDate = new Date(
                     nextMonth.getFullYear(),
                     nextMonth.getMonth(),
                     currentDay
                  );
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count: mos < 10 ? `0${mos}` : `${mos}`,
                     date: format(nextDate, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 2).toFixed()),
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
            case "Daily": // with interest of 5.5%
               financeCharge = parseFloat((loanAmount * 0.055).toFixed());
               setInterestRateLabel("5.5%");
               setTotalPayment(parseFloat((loanAmount / 100).toFixed()));
               setPayableLabel("days");
               setPayableLabelCount(100);

               for (let day = 1; day <= 100; day++) {
                  const nextDay = addDays(currentDate, day);
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count:
                        day < 10
                           ? `00${day}`
                           : day < 100
                           ? `0${day}`
                           : `${day}`,
                     date: format(nextDay, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 100).toFixed()),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Weekly": // with interest of 7%
               financeCharge = parseFloat((loanAmount * 0.07).toFixed());
               setInterestRateLabel("7%");
               setTotalPayment(parseFloat((loanAmount / 14).toFixed()));
               setPayableLabel("wks");
               setPayableLabelCount(14);

               for (let week = 1; week <= 14; week++) {
                  const nextWeek = addWeeks(currentDate, week);
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count: week < 10 ? `0${week}` : `${week}`,
                     date: format(nextWeek, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 14).toFixed()),
                     status,
                     due,
                     overdue,
                     overdueDays,
                  });
               }
               break;
            case "Monthly": // with interest of 8%
               financeCharge = parseFloat((loanAmount * 0.08).toFixed());
               setInterestRateLabel("8%");
               setTotalPayment(parseFloat((loanAmount / 3).toFixed()));
               setPayableLabel("mos");
               setPayableLabelCount(3);

               for (let mos = 1; mos <= 3; mos++) {
                  const nextMonth = addMonths(currentDate, mos);
                  const nextDate = new Date(
                     nextMonth.getFullYear(),
                     nextMonth.getMonth(),
                     currentDay
                  );
                  nextPaymentDate.push({
                     loanID,
                     scheduleID,
                     name,
                     count: mos < 10 ? `0${mos}` : `${mos}`,
                     date: format(nextDate, "MM/dd/yyyy"),
                     amount: parseFloat((loanAmount / 3).toFixed()),
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
      setShareCapitalShare(shareCapitalBuild);
      setPaymentSchedule(nextPaymentDate);
      setTotalNonFinanceCharges(nationalFee + shareCapitalBuild);
      setTotalDeductionCharge(
         parseFloat(
            (
               financeCharge +
               totalNonFinanceCharges +
               serviceHandlingCharge
            ).toFixed()
         )
      );
      setNetProceedsFromLoan(
         parseFloat((loanAmount - totalDeductionCharge).toFixed())
      );
      setTotalFinanceCharge(financeCharge);
      console.log(totalDeductionCharge);
      console.log(totalFinanceCharge);
      console.log(serviceHandlingCharge);
      console.log(totalNonFinanceCharges);
   };

   // fuction to check loan is pendin or active
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

   // function for sending data to firstore database
   const handleConfirmSubmit = async () => {
      // Get the user's UID
      const userUID = userUid;
      const userDocRef = doc(FIREBASE_DB, "borrowers", userUID);
      const borrowerSnapshot = await getDoc(userDocRef);
      const borrowerData = borrowerSnapshot.data();
      const borrowerLoanCount = borrowerData.loanCount;
      // const borrowerShareCapital = borrowerData.shareCapital;
      const newLoanCount = borrowerLoanCount + 1;
      await updateDoc(userDocRef, { loanCount: newLoanCount });

      // set of loan datas fields
      const loanReqDataToAdd = {
         accountID: userUID,
         loanID: loanRequestID,
         loanAmount: parseInt(selectedLoans),
         purposeOfLoan: purposeOfLoan,
         terms: selectedTerms,
         numberOfPayments: numberOfPayments,
         payableLabel: payableLabel,
         payableCount: payableLabelCount,
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
         dateCounter: 0,
         name: memberName,
         totalDeductionCharge: totalDeductionCharge,
         shareCapitalAmount: shareCapitalShare,
      };

      // set of loan data fields for schedule
      const schedulePaymentDataToAdd = {
         // name: memberName,
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
         console.log("Loan requested successfully with id " + loanRequestID);
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
                                    Service Handling Charge (3%)
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
                                    {payableLabel == ""
                                       ? "/"
                                       : payableLabelCount + "/" + payableLabel}
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
