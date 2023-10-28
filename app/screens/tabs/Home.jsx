import {
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import {
   collection,
   getDoc,
   doc,
   getDocs,
   setDoc,
   updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Apply from "../Apply";
import COLORS from "../../component/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { RefreshControl } from "react-native";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { format, addMonths, addWeeks, addDays } from "date-fns";

function Home({ navigation, route }) {
   const [selectedTab, setSelectedTab] = useState(0);
   const [isFabOpen, setIsFabOpen] = useState(false);
   const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);
   const [currentLoan, setCurrentLoan] = useState([]);
   const [currentSchedule, setCurrentSchedule] = useState([]);
   const [loanBalance, setLoanBalance] = useState(0);
   const [duePayment, setDuePayment] = useState([]);
   const [overduePayment, setOverduePayment] = useState([]);
   const [lastPayment, setLastPayment] = useState([]);
   const { userUid } = route.params; // Access the userUid parameter from the route

   // split the current date and payment date
   const dateParts = (handleDate) => {
      const paymentDateParts = handleDate.split("/");
      const month = parseInt(paymentDateParts[0]) - 1;
      const day = parseInt(paymentDateParts[1]);
      const year = parseInt(paymentDateParts[2]);
      const splitedDate = new Date(year, month, day);
      return splitedDate;
   };

   const updatePaymentSchedule = (scheduleData, dueDate) => {
      const updatedSchedule = scheduleData.map((payment) => {
         const updatedPayment = { ...payment };
         const newDueDate = dateParts(dueDate);

         // Map over the paymentSchedule array and update each item
         updatedPayment.paymentSchedule = updatedPayment.paymentSchedule.map(
            (paymentItem) => {
               const newPaymentDate = dateParts(paymentItem.date);
               const dateDifference = newDueDate - newPaymentDate;
               const daysDifference = Math.floor(
                  dateDifference / (1000 * 60 * 60 * 24)
               );

               if (
                  daysDifference === 0 &&
                  paymentItem.status === "incomplete"
               ) {
                  console.log(
                     "Count ",
                     paymentItem.count,
                     " : Your loan is due now."
                  );
                  return {
                     ...paymentItem,
                     due: true,
                     overdue: false,
                     overdueDays: 0,
                  };
               } else if (
                  daysDifference > 0 &&
                  paymentItem.status === "incomplete"
               ) {
                  console.log(
                     "Count ",
                     paymentItem.count,
                     " : Your loan is overdue, need to pay."
                  );
                  return {
                     ...paymentItem,
                     due: false,
                     overdue: true,
                     overdueDays: daysDifference,
                  };
               }
               // return item no update
               return paymentItem;
            }
         );
         return updatedPayment;
      });
      return updatedSchedule;
   };

   // uptate status of loan
   const updateStatus = async (fieldRef) => {
      await updateDoc(fieldRef, { status: "Completed" });
   };

   // update date on refresh
   const onRefresh = async () => {
      setRefreshing(true);

      // Fetch the totalLoans data from Firestore
      const borrowerUid = userUid;
      const borrowerRef = doc(FIREBASE_DB, "borrowers", borrowerUid);

      try {
         const borrowerSnapshot = await getDoc(borrowerRef);
         let remainingBalance = 0;

         if (borrowerSnapshot.exists()) {
            const loanRef = collection(borrowerRef, "loanRequests");
            let remainingBalance = 0;

            const scheduleRef = collection(borrowerRef, "paymentSchedule");
            const queryLoanSnapshot = await getDocs(loanRef);
            const querySchedSnapshot = await getDocs(scheduleRef);

            const loanData = [];
            const scheduleData = [];
            const dueData = [];
            const overdueData = [];
            const lastPaymentData = [];

            // snapshot, Loop through the loan data
            queryLoanSnapshot.forEach((loanDoc) => {
               const loan = loanDoc.data();
               const loanIdRef = loan.loanID;

               if (loan.status === "Active") {
                  loanData.push(loan);
                  // Loop through the payment schedule data
                  querySchedSnapshot.forEach((schedDoc) => {
                     const sched = schedDoc.data();
                     const paymentScheduleArray = sched.paymentSchedule;
                     remainingBalance = loan.loanAmount;

                     // Check if the payment schedule corresponds to the current loan
                     if (loanIdRef === sched.loanID) {
                        scheduleData.push(sched); // Add the payment schedule data
                        const schedIdRef = sched.loanID;
                        // Loop through the payment items in the schedule
                        paymentScheduleArray.forEach((paymentItem, index) => {
                           if (paymentItem.status === "incomplete") {
                              if (paymentItem.due) {
                                 dueData.push(paymentItem);
                              }
                              if (paymentItem.overdue) {
                                 overdueData.push(paymentItem);
                              }
                           }
                           if (paymentItem.status === "complete") {
                              lastPaymentData.push(paymentItem);
                              remainingBalance -= paymentItem.amount;
                           }
                           if (
                              index === paymentScheduleArray.length - 1 &&
                              paymentItem.status === "complete"
                           ) {
                              const fieldRef = doc(loanRef, schedIdRef);
                              updateStatus(fieldRef);
                           }
                        });
                     }
                  });
               }
            });

            // get the current date
            const currentDate = new Date();
            const nextMonth = addDays(currentDate, 1);
            const dueDate = format(nextMonth, "MM/dd/yyyy");

            const updatedSchedule = updatePaymentSchedule(
               scheduleData,
               dueDate
            );

            // Iterate through updatedSchedule
            updatedSchedule.forEach(async (payment) => {
               // Iterate through the paymentSchedule array for each payment
               payment.paymentSchedule.forEach(async (paymentItem) => {
                  if (paymentItem.status === "incomplete" && paymentItem.due) {
                     // Update Firestore document
                     const fieldRef = doc(scheduleRef, payment.scheduleID);
                     await updateDoc(fieldRef, payment);
                     console.log(
                        "Due updated successfully for scheduleID: ",
                        payment.scheduleID
                     );
                  }
               });
            });

            // save the data to usestate
            setCurrentLoan(loanData);
            setDuePayment(dueData);
            setOverduePayment(overdueData);
            setLastPayment(lastPaymentData);
            setCurrentSchedule(updatedSchedule);
            setLoanBalance(remainingBalance.toFixed());
         }
      } catch (error) {
         console.error("Error fetching data from Firestore:", error);
      }
      setRefreshing(false);
   };

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
                  let remainingBalance = 0;

                  const scheduleRef = collection(
                     borrowerRef,
                     "paymentSchedule"
                  );
                  const queryLoanSnapshot = await getDocs(loanRef);
                  const querySchedSnapshot = await getDocs(scheduleRef);

                  const loanData = [];
                  const scheduleData = [];
                  const dueData = [];
                  const overdueData = [];
                  const lastPaymentData = [];

                  // snapshot, Loop through the loan data
                  queryLoanSnapshot.forEach((loanDoc) => {
                     const loan = loanDoc.data();
                     const loanIdRef = loan.loanID;

                     if (loan.status === "Active") {
                        loanData.push(loan);
                        // Loop through the payment schedule data
                        querySchedSnapshot.forEach((schedDoc) => {
                           const sched = schedDoc.data();
                           const paymentScheduleArray = sched.paymentSchedule;
                           remainingBalance = loan.loanAmount;

                           // Check if the payment schedule corresponds to the current loan
                           if (loanIdRef === sched.loanID) {
                              scheduleData.push(sched); // Add the payment schedule data
                              const schedIdRef = sched.loanID;
                              // Loop through the payment items in the schedule
                              paymentScheduleArray.forEach(
                                 (paymentItem, index) => {
                                    if (paymentItem.status === "incomplete") {
                                       if (paymentItem.due) {
                                          dueData.push(paymentItem);
                                       }
                                       if (paymentItem.overdue) {
                                          overdueData.push(paymentItem);
                                       }
                                    }
                                    if (paymentItem.status === "complete") {
                                       lastPaymentData.push(paymentItem);
                                       remainingBalance -= paymentItem.amount;
                                    }
                                    if (
                                       index ===
                                          paymentScheduleArray.length - 1 &&
                                       paymentItem.status === "complete"
                                    ) {
                                       const fieldRef = doc(
                                          loanRef,
                                          schedIdRef
                                       );
                                       updateStatus(fieldRef);
                                    }
                                 }
                              );
                           }
                        });
                     }
                  });

                  // get the current date
                  const currentDate = new Date();
                  const nextMonth = addDays(currentDate, 1);
                  const dueDate = format(nextMonth, "MM/dd/yyyy");

                  const updatedSchedule = updatePaymentSchedule(
                     scheduleData,
                     dueDate
                  );

                  // Iterate through updatedSchedule
                  updatedSchedule.forEach(async (payment) => {
                     // Iterate through the paymentSchedule array for each payment
                     payment.paymentSchedule.forEach(async (paymentItem) => {
                        if (
                           paymentItem.status === "incomplete" &&
                           paymentItem.due
                        ) {
                           // Update Firestore document
                           const fieldRef = doc(
                              scheduleRef,
                              payment.scheduleID
                           );
                           await updateDoc(fieldRef, payment);
                           console.log(
                              "Due updated successfully for scheduleID: ",
                              payment.scheduleID
                           );
                        }
                     });
                  });

                  // save the data to usestate
                  setCurrentLoan(loanData);
                  setDuePayment(dueData);
                  setOverduePayment(overdueData);
                  setLastPayment(lastPaymentData);
                  setCurrentSchedule(updatedSchedule);
                  setLoanBalance(remainingBalance.toFixed());
               }
            } catch (error) {
               console.error("Error fetching data from Firestore:", error);
            }
            setLoading(false);
         }
      };
      fetchLoanData();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
               <View style={styles.headerProfile}>
                  <Image
                     source={require("../../../assets/icons/icon-profile.png")}
                     style={styles.headerImage}
                  />
                  <Text style={styles.headerName}>John Doe</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => navigation.navigate("Notification")}
            >
               <Ionicons
                  name="notifications"
                  size={24}
                  color={COLORS.primary}
               />
            </TouchableOpacity>
         </View>
         <View style={styles.loanDetailsContainer}>
            {currentLoan.length > 0 ? (
               <>
                  {loading ? (
                     <ActivityIndicator
                        size="large"
                        color={COLORS.white}
                        style={{ marginVertical: 20 }}
                     />
                  ) : (
                     <>
                        <View>
                           <Text style={styles.loanTitle}>Current Loan</Text>
                           <Text style={styles.loanBalance}>
                              ₱{currentLoan[0]?.loanAmount}
                           </Text>
                        </View>
                        <View
                           style={{
                              justifyContent: "center",
                              gap: 10,
                              bottom: 5,
                           }}
                        >
                           <Text style={styles.payableLoan}>
                              Payable in {currentLoan[0]?.payableIN}
                           </Text>
                           <Text style={styles.payableLoan}>
                              ₱{loanBalance} Remaining
                           </Text>
                        </View>
                     </>
                  )}
               </>
            ) : (
               <>
                  {loading ? (
                     <ActivityIndicator
                        size="large"
                        color={COLORS.white}
                        style={{ marginVertical: 20 }}
                     />
                  ) : (
                     <View style={styles.loanCardContainer}>
                        <View style={styles.cardHeaderLabel}>
                           <Text
                              style={[
                                 styles.loanTitle,
                                 { color: COLORS.white },
                              ]}
                           >
                              No active loan
                           </Text>
                        </View>
                     </View>
                  )}
               </>
            )}
         </View>

         {/* Segment */}
         <View style={styles.segmentControl}>
            <TouchableOpacity
               style={[
                  styles.customTouchable,
                  {
                     borderColor: selectedTab == 0 ? "#08a391" : COLORS.gray2,
                  },
               ]}
               onPress={() => {
                  setSelectedTab(0), onRefresh();
               }}
            >
               <Text
                  style={[
                     styles.touchableText,
                     {
                        color: selectedTab == 0 ? "#08a391" : COLORS.primary,
                     },
                  ]}
               >
                  Overview
               </Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[
                  styles.customTouchable,
                  {
                     borderColor: selectedTab == 1 ? "#08a391" : COLORS.gray2,
                  },
               ]}
               onPress={() => {
                  setSelectedTab(1), onRefresh();
               }}
            >
               <Text
                  style={[
                     styles.touchableText,
                     {
                        color: selectedTab == 1 ? "#08a391" : COLORS.primary,
                     },
                  ]}
               >
                  Details
               </Text>
            </TouchableOpacity>
         </View>

         {selectedTab == 0 ? (
            <>
               {loading ? (
                  <ActivityIndicator
                     size="large"
                     color={COLORS.primary}
                     style={{ marginVertical: 20 }}
                  />
               ) : currentLoan.length > 0 ? (
                  <>
                     {duePayment.length > 0 ||
                     overduePayment.length > 0 ||
                     lastPayment.length > 0 ? (
                        <ScrollView
                           refreshControl={
                              <RefreshControl
                                 refreshing={refreshing}
                                 onRefresh={onRefresh}
                              />
                           }
                        >
                           <View style={styles.loanCardContainer}>
                              {duePayment.slice(0, 1).map((duenow, index) => (
                                 <View key={index}>
                                    <View style={{ gap: 10 }}>
                                       <View style={styles.cardHeaderLabel}>
                                          <View
                                             style={{
                                                flexDirection: "row",
                                                gap: 10,
                                             }}
                                          >
                                             <View
                                                style={{
                                                   flexDirection: "row",
                                                   gap: 10,
                                                }}
                                             >
                                                <Text
                                                   style={styles.cardLabelText}
                                                >
                                                   Due now
                                                </Text>
                                                <Text>
                                                   (x{duePayment.length})
                                                </Text>
                                             </View>
                                          </View>
                                          <Text
                                             style={{
                                                fontFamily: "Poppins-Regular",
                                             }}
                                          >
                                             {duenow.date}
                                          </Text>
                                       </View>
                                       <View style={styles.loanCardItem}>
                                          <View style={styles.cardTextWrapper}>
                                             <Text
                                                style={[
                                                   styles.cartTitle,
                                                   {
                                                      color: COLORS.due,
                                                   },
                                                ]}
                                             >
                                                {duenow.amount}
                                             </Text>
                                             <Text style={styles.cardText}>
                                                Advise to pay
                                             </Text>
                                          </View>
                                          <View style={styles.cardLine}></View>
                                          <View style={styles.cardTextWrapper}>
                                             <Text style={styles.cardText}>
                                                ID-{currentLoan[0]?.loanID}
                                             </Text>
                                             <TouchableOpacity
                                                onPress={() =>
                                                   setSelectedTab(1)
                                                }
                                             >
                                                <Text
                                                   style={
                                                      styles.cardTextTouchable
                                                   }
                                                >
                                                   View
                                                </Text>
                                             </TouchableOpacity>
                                          </View>
                                       </View>
                                    </View>
                                 </View>
                              ))}
                              {overduePayment
                                 .slice(0, 1)
                                 .map((overdue, index) => (
                                    <View key={index}>
                                       <View style={{ gap: 10 }}>
                                          <View style={styles.cardHeaderLabel}>
                                             <View
                                                style={{
                                                   flexDirection: "row",
                                                   gap: 10,
                                                }}
                                             >
                                                <Text
                                                   style={styles.cardLabelText}
                                                >
                                                   Overdue
                                                </Text>
                                                <Text>
                                                   (x{overduePayment.length})
                                                </Text>
                                             </View>
                                             <Text
                                                style={{
                                                   fontFamily:
                                                      "Poppins-Regular",
                                                }}
                                             >
                                                {overdue.date}
                                             </Text>
                                          </View>
                                          <View style={styles.loanCardItem}>
                                             <View
                                                style={styles.cardTextWrapper}
                                             >
                                                <Text
                                                   style={[
                                                      styles.cartTitle,
                                                      {
                                                         color: COLORS.overdue,
                                                      },
                                                   ]}
                                                >
                                                   {overdue.amount}
                                                </Text>
                                                <Text style={styles.cardText}>
                                                   Overdue {overdue.overdueDays}{" "}
                                                   days
                                                </Text>
                                             </View>
                                             <View
                                                style={styles.cardLine}
                                             ></View>
                                             <View
                                                style={styles.cardTextWrapper}
                                             >
                                                <Text style={styles.cardText}>
                                                   ID-{currentLoan[0]?.loanID}
                                                </Text>
                                                <TouchableOpacity
                                                   onPress={() =>
                                                      setSelectedTab(1)
                                                   }
                                                >
                                                   <Text
                                                      style={
                                                         styles.cardTextTouchable
                                                      }
                                                   >
                                                      View
                                                   </Text>
                                                </TouchableOpacity>
                                             </View>
                                          </View>
                                       </View>
                                    </View>
                                 ))}
                              {lastPayment.slice(0, 1).map((lastpay, index) => (
                                 <View key={index}>
                                    <View style={{ gap: 10 }}>
                                       <View style={styles.cardHeaderLabel}>
                                          <View
                                             style={{
                                                flexDirection: "row",
                                                gap: 10,
                                             }}
                                          >
                                             <Text style={styles.cardLabelText}>
                                                Last Payment
                                             </Text>
                                             <Text>
                                                (x{lastPayment.length})
                                             </Text>
                                          </View>
                                          <Text
                                             style={{
                                                fontFamily: "Poppins-Regular",
                                             }}
                                          >
                                             {lastpay.date}
                                          </Text>
                                       </View>
                                       <View style={styles.loanCardItem}>
                                          <View style={styles.cardTextWrapper}>
                                             <Text
                                                style={[
                                                   styles.cartTitle,
                                                   {
                                                      color: COLORS.complete,
                                                   },
                                                ]}
                                             >
                                                {lastpay.amount}
                                             </Text>
                                             <Text style={styles.cardText}>
                                                Paid
                                             </Text>
                                          </View>
                                          <View style={styles.cardLine}></View>
                                          <View style={styles.cardTextWrapper}>
                                             <Text style={styles.cardText}>
                                                ID-{currentLoan[0]?.loanID}
                                             </Text>
                                             <TouchableOpacity
                                                onPress={() =>
                                                   setSelectedTab(1)
                                                }
                                             >
                                                <Text
                                                   style={
                                                      styles.cardTextTouchable
                                                   }
                                                >
                                                   View
                                                </Text>
                                             </TouchableOpacity>
                                          </View>
                                       </View>
                                    </View>
                                 </View>
                              ))}
                           </View>
                        </ScrollView>
                     ) : (
                        <View style={styles.loanCardContainer}>
                           <View style={styles.cardHeaderLabel}>
                              <ScrollView
                                 refreshControl={
                                    <RefreshControl
                                       refreshing={refreshing}
                                       onRefresh={onRefresh}
                                    />
                                 }
                              >
                                 <Text
                                    style={[styles.cardText, { fontSize: 14 }]}
                                 >
                                    Your due, overdue and last payment will show
                                    up here. Navigate to details for schedule of
                                    your payments.
                                 </Text>
                              </ScrollView>
                           </View>
                        </View>
                     )}
                  </>
               ) : (
                  <View style={styles.loanCardContainer}>
                     <View style={styles.cardHeaderLabel}>
                        <ScrollView
                           refreshControl={
                              <RefreshControl
                                 refreshing={refreshing}
                                 onRefresh={onRefresh}
                              />
                           }
                        >
                           <Text style={styles.cardText}>
                              Your loan will show up here.
                           </Text>
                        </ScrollView>
                     </View>
                  </View>
               )}
            </>
         ) : (
            <>
               {currentLoan.length > 0 ? (
                  <View style={styles.detailsContainer}>
                     {loading ? (
                        <ActivityIndicator
                           size="large"
                           color={COLORS.primary}
                           style={{ marginVertical: 20 }}
                        />
                     ) : (
                        <ScrollView
                           refreshControl={
                              <RefreshControl
                                 refreshing={refreshing}
                                 onRefresh={onRefresh}
                              />
                           }
                        >
                           <Text style={styles.detailsTitle}>
                              {currentLoan[0].numberOfPayments} Schedule
                           </Text>
                           <View style={styles.detailsHeaderLabel}>
                              <Text style={styles.detailsLabel}>
                                 {currentLoan[0].numberOfPayments && "Count"}
                              </Text>
                              <Text style={[styles.detailsLabel, { left: 5 }]}>
                                 Date
                              </Text>
                              <Text style={[styles.detailsLabel, { left: 10 }]}>
                                 Amount
                              </Text>
                              <Text style={styles.detailsLabel}>Status</Text>
                           </View>
                           {currentSchedule.map((data, index) => (
                              <View key={index}>
                                 {data.paymentSchedule.map(
                                    (paymentItem, itemIndex) => (
                                       <View key={itemIndex}>
                                          <View style={styles.detailsList}>
                                             <Text style={[styles.detailsItem]}>
                                                {paymentItem.count}
                                             </Text>
                                             <Text style={[styles.detailsItem]}>
                                                {paymentItem.date}
                                             </Text>
                                             <Text
                                                style={[
                                                   styles.detailsItem,
                                                   { right: 10 },
                                                ]}
                                             >
                                                {paymentItem.amount}
                                             </Text>
                                             <Ionicons
                                                size={18}
                                                name={
                                                   paymentItem.status ===
                                                   "complete"
                                                      ? "checkmark-circle"
                                                      : "checkmark-circle"
                                                }
                                                color={
                                                   paymentItem.status ===
                                                   "complete"
                                                      ? "#34B233"
                                                      : COLORS.gray2
                                                }
                                             />
                                          </View>
                                          <View
                                             style={styles.dividerLine}
                                          ></View>
                                       </View>
                                    )
                                 )}
                              </View>
                           ))}
                        </ScrollView>
                     )}
                  </View>
               ) : (
                  <View style={styles.loanCardContainer}>
                     <View style={styles.cardHeaderLabel}>
                        <ScrollView
                           refreshControl={
                              <RefreshControl
                                 refreshing={refreshing}
                                 onRefresh={onRefresh}
                              />
                           }
                        >
                           <Text style={styles.cardText}>
                              Your schedule of loan will show up here.
                           </Text>
                        </ScrollView>
                     </View>
                  </View>
               )}
            </>
         )}

         <FAB.Group
            open={isFabOpen}
            fabStyle={{ backgroundColor: COLORS.primary, borderRadius: 100 }}
            icon={
               isFabOpen
                  ? () => (
                       <Ionicons
                          name="chevron-down-outline"
                          size={24}
                          color={COLORS.white}
                       />
                    )
                  : () => (
                       <Ionicons
                          name="chevron-up-outline"
                          size={24}
                          color={COLORS.white}
                       />
                    )
            }
            actions={[
               {
                  icon: () => (
                     <Ionicons name="reader" size={24} color={COLORS.primary} />
                  ),
                  label: "Answer Survey",
                  labelStyle: { fontFamily: "Poppins-Regular" },
                  onPress: () => {
                     alert("Under construction");
                     // Handle Edit action
                     setIsFabOpen(false); // Close the FAB group
                  },
                  style: { borderRadius: 100 },
               },
               {
                  icon: () => (
                     <Ionicons
                        name="add-circle"
                        size={24}
                        color={COLORS.primary}
                     />
                  ),
                  label: "Apply Loan",
                  labelStyle: { fontFamily: "Poppins-Regular" },
                  style: { borderRadius: 100 },

                  onPress: () => {
                     // Handle Apply Loan action
                     navigation.navigate(Apply);
                     setIsFabOpen(false); // Close the FAB group
                  },
               },
            ]}
            onStateChange={({ open }) => setIsFabOpen(open)}
         />
      </View>
   );
}
export default Home;
