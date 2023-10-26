import {
   View,
   Text,
   ScrollView,
   TouchableOpacity,
   ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import COLORS from "../../component/Colors";
import { Ionicons } from "@expo/vector-icons";
import { RefreshControl } from "react-native";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";

function Loans({ navigation, route }) {
   const [selectedTab, setSelectedTab] = useState(0);
   const [loading, setLoading] = useState(true);
   const [totalLoans, setTotalLoans] = useState(null);
   const [pendingLoan, setPendingLoan] = useState([]);
   const [activeLoan, setActiveLoan] = useState([]);
   const [completedLoan, setCompletedLoan] = useState([]);
   const [overallLoan, setOverallLoan] = useState([]);
   const [refreshing, setRefreshing] = useState(false);
   const { userUid } = route.params; // Access the userUid parameter from the route

   const onRefresh = async () => {
      // Refresh the loan data here
      setRefreshing(true);

      const borrowerUid = userUid;
      const borrowerRef = doc(FIREBASE_DB, "borrowers", borrowerUid);

      try {
         const borrowerSnapshot = await getDoc(borrowerRef);
         if (borrowerSnapshot.exists()) {
            const borrowerData = borrowerSnapshot.data();
            let borrowerTotalLoans = borrowerData.totalLoans;

            const loanRef = collection(borrowerRef, "loanRequests");
            const querySnapshot = await getDocs(loanRef);

            const pendingLoanData = [];
            const activeLoanData = [];
            const completedLoanData = [];
            const overallData = [];
            // snapshot the loan data
            querySnapshot.forEach((loanDoc) => {
               const loan = loanDoc.data();
               if (loan.status === "Pending") {
                  pendingLoanData.push(loan);
               }
               if (loan.status === "Active") {
                  activeLoanData.push(loan);
                  borrowerTotalLoans += loan.loanAmount;
               }
               if (loan.status === "Completed") {
                  completedLoanData.push(loan);
                  borrowerTotalLoans += loan.loanAmount;
               }
               overallData.push(loan);
            });

            // save the data to usestate
            setTotalLoans(borrowerTotalLoans);
            setPendingLoan(pendingLoanData);
            setActiveLoan(activeLoanData);
            setCompletedLoan(completedLoanData);
            setOverallLoan(overallData);
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

               if (borrowerSnapshot.exists()) {
                  const borrowerData = borrowerSnapshot.data();
                  let borrowerTotalLoans = borrowerData.totalLoans;

                  const loanRef = collection(borrowerRef, "loanRequests");
                  const querySnapshot = await getDocs(loanRef);

                  const pendingLoanData = [];
                  const activeLoanData = [];
                  const completedLoanData = [];

                  // snapshot the loan data
                  querySnapshot.forEach((loanDoc) => {
                     const loan = loanDoc.data();
                     if (loan.status === "Pending") {
                        pendingLoanData.push(loan);
                     }
                     if (loan.status === "Active") {
                        activeLoanData.push(loan);
                        borrowerTotalLoans += loan.loanAmount;
                     }
                     if (loan.status === "Completed") {
                        completedLoanData.push(loan);
                        borrowerTotalLoans += loan.loanAmount;
                     }
                  });

                  // save the data to usestate
                  setTotalLoans(borrowerTotalLoans);
                  setPendingLoan(pendingLoanData);
                  setActiveLoan(activeLoanData);
                  setCompletedLoan(completedLoanData);
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
            <Text style={styles.headerTitle}>Total Loans</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Apply")}>
               <Ionicons
                  name="add-circle-sharp"
                  size={24}
                  color={COLORS.primary}
               />
            </TouchableOpacity>
         </View>
         <View style={styles.loanDetailsContainer}>
            {totalLoans > 0 ? (
               <>
                  {loading ? (
                     <ActivityIndicator
                        size="large"
                        color={COLORS.white}
                        style={{ marginVertical: 20 }}
                     />
                  ) : (
                     <View>
                        <Text
                           style={[styles.loanTitle, { textAlign: "center" }]}
                        >
                           Outstanding Amount
                        </Text>
                        <Text
                           style={[styles.loanBalance, { textAlign: "center" }]}
                        >
                           ₱{totalLoans}
                        </Text>
                     </View>
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
                              Total loans unavailabe
                           </Text>
                        </View>
                     </View>
                  )}
               </>
            )}
         </View>
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
                  Applied
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
                  History
               </Text>
            </TouchableOpacity>
         </View>

         {selectedTab == 0 ? (
            <>
               {overallLoan.length > 0 ? (
                  <ScrollView
                     refreshControl={
                        <RefreshControl
                           refreshing={refreshing}
                           onRefresh={onRefresh}
                        />
                     }
                  >
                     {loading ? (
                        <ActivityIndicator
                           size="large"
                           color={COLORS.primary}
                           style={{ marginVertical: 20 }}
                        />
                     ) : (
                        pendingLoan.slice(0, 1).map((loan, index) => (
                           <View
                              key={index}
                              style={[
                                 styles.loanCardContainer,
                                 { paddingBottom: pendingLoan ? 0 : 20 },
                              ]}
                           >
                              <View style={styles.cardHeaderLabel}>
                                 <Text style={styles.cardLabelText}>
                                    {loan.status}
                                 </Text>
                              </View>

                              <View style={styles.appliedCardItem}>
                                 <View style={styles.appliedTextWrapper}>
                                    <Text
                                       style={[
                                          styles.cartTitle,
                                          { color: COLORS.tertiary },
                                       ]}
                                    >
                                       {loan.loanAmount}
                                    </Text>
                                    <View style={{ right: 8 }}>
                                       <Text style={styles.cardText}>
                                          Term: {loan.terms}
                                       </Text>
                                       <Text style={styles.cardText}>
                                          Interest: {loan.interestRate}
                                       </Text>
                                    </View>
                                 </View>

                                 <View style={styles.appliedTextWrapper}>
                                    <View>
                                       <Text style={styles.cardText}>
                                          Date Granted:
                                       </Text>
                                       <Text style={styles.cardText}>
                                          {loan.dateGranted}
                                       </Text>
                                    </View>
                                    <View style={{ right: 20 }}>
                                       <Text style={styles.cardText}>
                                          Date Due:
                                       </Text>
                                       <Text style={styles.cardText}>
                                          {loan.dateDue}
                                       </Text>
                                    </View>
                                 </View>

                                 <View style={styles.cardLine}></View>

                                 <View style={styles.appliedTextWrapper}>
                                    <Text style={styles.cardText}>
                                       ID-{loan.loanID}
                                    </Text>
                                    <TouchableOpacity
                                       onPress={() =>
                                          navigation.navigate("Home")
                                       }
                                    >
                                       <Text style={styles.cardTextTouchable}>
                                          View
                                       </Text>
                                    </TouchableOpacity>
                                 </View>
                              </View>
                           </View>
                        ))
                     )}
                     {loading ? (
                        <ActivityIndicator
                           size="large"
                           color={COLORS.primary}
                           style={{ marginVertical: 20 }}
                        />
                     ) : (
                        activeLoan.slice(0, 1).map((loan, index) => (
                           <View
                              key={index}
                              style={[
                                 styles.loanCardContainer,
                                 { paddingBottom: activeLoan ? 0 : 20 },
                              ]}
                           >
                              <View style={styles.cardHeaderLabel}>
                                 <Text style={styles.cardLabelText}>
                                    {loan.status}
                                 </Text>
                              </View>

                              <View style={styles.appliedCardItem}>
                                 <View style={styles.appliedTextWrapper}>
                                    <Text
                                       style={[
                                          styles.cartTitle,
                                          { color: "green" },
                                       ]}
                                    >
                                       {loan.loanAmount}
                                    </Text>
                                    <View style={{ right: 8 }}>
                                       <Text style={styles.cardText}>
                                          Term: {loan.terms}
                                       </Text>
                                       <Text style={styles.cardText}>
                                          Interest: {loan.interestRate}
                                       </Text>
                                    </View>
                                 </View>

                                 <View style={styles.appliedTextWrapper}>
                                    <View>
                                       <Text style={styles.cardText}>
                                          Date Granted:
                                       </Text>
                                       <Text style={styles.cardText}>
                                          {loan.dateGranted}
                                       </Text>
                                    </View>
                                    <View style={{ right: 20 }}>
                                       <Text style={styles.cardText}>
                                          Date Due:
                                       </Text>
                                       <Text style={styles.cardText}>
                                          {loan.dateDue}
                                       </Text>
                                    </View>
                                 </View>

                                 <View style={styles.cardLine}></View>

                                 <View style={styles.appliedTextWrapper}>
                                    <Text style={styles.cardText}>
                                       ID-{loan.loanID}
                                    </Text>
                                    <TouchableOpacity
                                       onPress={() =>
                                          navigation.navigate("Home")
                                       }
                                    >
                                       <Text style={styles.cardTextTouchable}>
                                          View
                                       </Text>
                                    </TouchableOpacity>
                                 </View>
                              </View>
                           </View>
                        ))
                     )}
                     {loading ? (
                        <ActivityIndicator
                           size="large"
                           color={COLORS.primary}
                           style={{ marginVertical: 20 }}
                        />
                     ) : (
                        completedLoan.slice(0, 1).map((loan, index) => (
                           <View key={index} style={[styles.loanCardContainer]}>
                              <View style={styles.cardHeaderLabel}>
                                 <Text style={styles.cardLabelText}>
                                    {loan.status}
                                 </Text>
                                 <Text
                                    style={[
                                       styles.cardLabelText,
                                       { fontFamily: "Poppins-Regular" },
                                    ]}
                                 >
                                    {loan.purposeOfLoan}
                                 </Text>
                              </View>

                              <View style={styles.appliedCardItem}>
                                 <View style={styles.appliedTextWrapper}>
                                    <Text
                                       style={[
                                          styles.cartTitle,
                                          {
                                             textDecorationLine: "line-through",
                                             color: "gray",
                                          },
                                       ]}
                                    >
                                       {loan.loanAmount}
                                    </Text>
                                    <View style={{ right: 8 }}>
                                       <Text style={styles.cardText}>
                                          Term: {loan.terms}
                                       </Text>
                                       <Text style={styles.cardText}>
                                          Interest: {loan.interestRate}
                                       </Text>
                                    </View>
                                 </View>

                                 <View style={styles.appliedTextWrapper}>
                                    <View>
                                       <Text style={styles.cardText}>
                                          Date Granted:
                                       </Text>
                                       <Text style={styles.cardText}>
                                          {loan.dateGranted}
                                       </Text>
                                    </View>
                                    <View style={{ right: 20 }}>
                                       <Text style={styles.cardText}>
                                          Date Due:
                                       </Text>
                                       <Text style={styles.cardText}>
                                          {loan.dateDue}
                                       </Text>
                                    </View>
                                 </View>

                                 <View style={styles.cardLine}></View>

                                 <View style={styles.appliedTextWrapper}>
                                    <Text style={styles.cardText}>
                                       ID-{loan.loanID}
                                    </Text>
                                    <Text
                                       style={[
                                          styles.cardTextTouchable,
                                          { color: COLORS.gray },
                                       ]}
                                    >
                                       Previous
                                    </Text>
                                    {/* <TouchableOpacity
                                 onPress={() => navigation.navigate("Home")}
                              >
                                 <Text style={styles.cardTextTouchable}>
                                    View
                                 </Text>
                              </TouchableOpacity> */}
                                 </View>
                              </View>
                           </View>
                        ))
                     )}
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
               {completedLoan.length > 0 ? (
                  <View style={styles.historyContainer}>
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
                           scrollable={false}
                        >
                           <Text style={styles.historyTitle}>
                              List of Loans
                           </Text>
                           <View style={styles.historyHeaderLabel}>
                              <Text style={styles.historyLabel}>ID</Text>
                              <Text style={[styles.historyLabel, { left: 25 }]}>
                                 Date
                              </Text>
                              <Text style={[styles.historyLabel, { left: 28 }]}>
                                 Amount
                              </Text>
                              <Text style={[styles.historyLabel, { left: 25 }]}>
                                 Term
                              </Text>
                              <Text style={[styles.historyLabel, { left: 15 }]}>
                                 Interest
                              </Text>
                              <Text style={[styles.historyLabel, { left: 5 }]}>
                                 Status
                              </Text>
                           </View>
                           <ScrollView>
                              {loading ? (
                                 <ActivityIndicator
                                    size="large"
                                    color={COLORS.primary}
                                    style={{ marginVertical: 20 }}
                                 />
                              ) : (
                                 completedLoan.map((loan, index) => (
                                    <View key={index}>
                                       <View style={styles.historyList}>
                                          <Text style={styles.historyItem}>
                                             {loan.loanID}
                                          </Text>
                                          <View>
                                             <Text
                                                style={[
                                                   styles.historyItem,
                                                   { right: 20 },
                                                ]}
                                             >
                                                {loan.dateGranted}
                                             </Text>
                                             <Text
                                                style={[
                                                   styles.historyItem,
                                                   { right: 20 },
                                                ]}
                                             >
                                                {loan.dateDue}
                                             </Text>
                                          </View>
                                          <Text
                                             style={[
                                                styles.historyItem,
                                                { right: 30 },
                                             ]}
                                          >
                                             {loan.loanAmount}
                                          </Text>
                                          <Text
                                             style={[
                                                styles.historyItem,
                                                { right: 28 },
                                             ]}
                                          >
                                             {loan.terms}
                                          </Text>
                                          <Text
                                             style={[
                                                styles.historyItem,
                                                { right: 25 },
                                             ]}
                                          >
                                             {loan.interestRate}
                                          </Text>
                                          <Text
                                             style={[
                                                styles.historyItem,
                                                { right: 22 },
                                             ]}
                                          >
                                             {loan.status == "Completed" &&
                                                "Paid"}
                                          </Text>
                                       </View>
                                       <View style={styles.dividerLine}></View>
                                    </View>
                                 ))
                              )}
                           </ScrollView>
                        </ScrollView>
                     )}
                  </View>
               ) : (
                  <>
                     {loading ? (
                        <ActivityIndicator
                           size="large"
                           color={COLORS.primary}
                           style={{ marginVertical: 20 }}
                        />
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
                                    Your history will show up here.
                                 </Text>
                              </ScrollView>
                           </View>
                        </View>
                     )}
                  </>
               )}
            </>
         )}
      </View>
   );
}

export default Loans;
