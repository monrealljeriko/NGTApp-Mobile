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

function Home({ navigation, route }) {
   const [selectedTab, setSelectedTab] = useState(0);
   const [isFabOpen, setIsFabOpen] = useState(false);
   const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);
   const [currentLoan, setCurrentLoan] = useState([]);
   const [currentSchedule, setCurrentSchedule] = useState([]);
   const [loanBalance, setLoanBalance] = useState(0);
   const { userUid } = route.params; // Access the userUid parameter from the route

   // uptate status of loan
   const updateStatus = async (fieldRef) => {
      await updateDoc(fieldRef, { status: "Completed" });
   };

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
            const scheduleRef = collection(borrowerRef, "paymentSchedule");
            const queryLoanSnapshot = await getDocs(loanRef);
            const querySchedSnapshot = await getDocs(scheduleRef);

            const loanData = [];
            const scheduleData = [];

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

                     // Check if the payment schedule corresponds to the current loan
                     if (loanIdRef === sched.loanID) {
                        scheduleData.push(sched); // Add the payment schedule data
                        const schedIdRef = sched.loanID;

                        // Loop through the payment items in the schedule
                        paymentScheduleArray.forEach((paymentItem, index) => {
                           if (paymentItem.status === "incomplete") {
                              remainingBalance += paymentItem.amount;
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

            // save the data to usestate
            setCurrentLoan(loanData);
            setCurrentSchedule(scheduleData);
            setLoanBalance(remainingBalance.toFixed());
         }
      } catch (error) {
         console.error("Error fetching data from Firestore:", error);
      }
      setRefreshing(false);
   };

   useEffect(() => {
      const fetchLoanData = async () => {
         if (userUid) {
            // Fetch the totalLoans data from Firestore
            const borrowerUid = userUid;
            const borrowerRef = doc(FIREBASE_DB, "borrowers", borrowerUid);

            try {
               const borrowerSnapshot = await getDoc(borrowerRef);
               let remainingBalance = 0;

               if (borrowerSnapshot.exists()) {
                  const loanRef = collection(borrowerRef, "loanRequests");
                  const scheduleRef = collection(
                     borrowerRef,
                     "paymentSchedule"
                  );
                  const queryLoanSnapshot = await getDocs(loanRef);
                  const querySchedSnapshot = await getDocs(scheduleRef);

                  const loanData = [];
                  const scheduleData = [];

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

                           // Check if the payment schedule corresponds to the current loan
                           if (loanIdRef === sched.loanID) {
                              scheduleData.push(sched); // Add the payment schedule data
                              const schedIdRef = sched.loanID;

                              // Loop through the payment items in the schedule
                              paymentScheduleArray.forEach(
                                 (paymentItem, index) => {
                                    if (paymentItem.status === "incomplete") {
                                       remainingBalance += paymentItem.amount;
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

                  // save the data to usestate
                  setCurrentLoan(loanData);
                  setCurrentSchedule(scheduleData);
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
                           {currentLoan && currentLoan.loan}
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
               onPress={() => setSelectedTab(0)}
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
               onPress={() => setSelectedTab(1)}
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
            <ScrollView>
               <View style={styles.loanCardContainer}>
                  <View style={styles.cardHeaderLabel}>
                     <Text style={styles.cardLabelText}>Due now</Text>
                     <Text style={{ fontFamily: "Poppins-Regular" }}>
                        01/01/23
                     </Text>
                  </View>

                  <View style={styles.loanCardItem}>
                     <View style={styles.cardTextWrapper}>
                        <Text style={[styles.cartTitle, { color: "red" }]}>
                           ₱155
                        </Text>
                        <Text style={styles.cardText}>Advise to pay</Text>
                     </View>

                     <View style={styles.cardLine}></View>

                     <View style={styles.cardTextWrapper}>
                        <Text style={styles.cardText}>ID-0000000</Text>
                        <TouchableOpacity onPress={() => setSelectedTab(1)}>
                           <Text style={styles.cardTextTouchable}>View</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
                  <View style={styles.cardHeaderLabel}>
                     <Text style={styles.cardLabelText}>Over due</Text>
                     <Text style={{ fontFamily: "Poppins-Regular" }}>
                        01/02/23
                     </Text>
                  </View>
                  <View style={styles.loanCardItem}>
                     <View style={styles.cardTextWrapper}>
                        <Text style={[styles.cartTitle, { color: "orange" }]}>
                           ₱155
                        </Text>
                        <Text style={styles.cardText}>Overdue 2 days</Text>
                     </View>
                     <View style={styles.cardLine}></View>

                     <View style={styles.cardTextWrapper}>
                        <Text style={styles.cardText}>ID-0000000</Text>

                        <TouchableOpacity onPress={() => setSelectedTab(1)}>
                           <Text style={styles.cardTextTouchable}>View</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
                  <View style={styles.cardHeaderLabel}>
                     <Text style={styles.cardLabelText}>Last payment</Text>
                     <Text style={{ fontFamily: "Poppins-Regular" }}>
                        01/03/23
                     </Text>
                  </View>
                  <View style={styles.loanCardItem}>
                     <View style={styles.cardTextWrapper}>
                        <Text style={[styles.cartTitle, { color: "green" }]}>
                           ₱155
                        </Text>
                        <Text style={styles.cardText}> Status Unpaid</Text>
                     </View>
                     <View style={styles.cardLine}></View>

                     <View style={styles.cardTextWrapper}>
                        <Text style={styles.cardText}>ID-0000000</Text>
                        <TouchableOpacity onPress={() => setSelectedTab(1)}>
                           <Text style={styles.cardTextTouchable}>View</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </ScrollView>
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
                              {currentLoan.length > 0 &&
                              currentLoan[0].numberOfPayments
                                 ? currentLoan[0].numberOfPayments
                                 : "Term"}{" "}
                              Schedule
                           </Text>
                           <View style={styles.detailsHeaderLabel}>
                              <Text style={styles.detailsLabel}>
                                 {currentLoan.length > 0 &&
                                 currentLoan[0].numberOfPayments
                                    ? "Count"
                                    : "Term"}
                              </Text>
                              <Text style={styles.detailsLabel}>Date</Text>
                              <Text style={styles.detailsLabel}>Amount</Text>
                              <Text style={styles.detailsLabel}>Status</Text>
                           </View>
                           {currentSchedule.map((data, index) => (
                              <View key={index}>
                                 {data.paymentSchedule.map(
                                    (paymentItem, itemIndex) => (
                                       <View key={itemIndex}>
                                          <View style={styles.detailsList}>
                                             <Text style={styles.detailsItem}>
                                                {paymentItem.day}
                                             </Text>
                                             <Text
                                                style={[
                                                   styles.detailsItem,
                                                   { right: 15 },
                                                ]}
                                             >
                                                {paymentItem.date}
                                             </Text>
                                             <Text
                                                style={[
                                                   styles.detailsItem,
                                                   { right: 25 },
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
