import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import COLORS from "../../component/Colors";
import { Ionicons } from "@expo/vector-icons";

function Loans({ navigation }) {
   const [selectedTab, setSelectedTab] = useState(0);
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
            <View>
               <Text style={[styles.loanTitle, { textAlign: "center" }]}>
                  Outstanding Amount
               </Text>
               <Text style={[styles.loanBalance, { textAlign: "center" }]}>
                  ₱20000
               </Text>
            </View>
         </View>
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
                  History
               </Text>
            </TouchableOpacity>
         </View>

         {selectedTab == 0 ? (
            <ScrollView>
               <View style={styles.loanCardContainer}>
                  <View style={styles.cardHeaderLabel}>
                     <Text style={styles.cardLabelText}>Active</Text>
                  </View>

                  <View style={styles.appliedCardItem}>
                     <View style={styles.appliedTextWrapper}>
                        <Text style={[styles.cartTitle, { color: "green" }]}>
                           ₱15000
                        </Text>
                        <View>
                           <Text style={styles.cardText}>Term: 100 days</Text>
                           <Text style={styles.cardText}>Interest: 8% </Text>
                        </View>
                     </View>

                     <View style={styles.appliedTextWrapper}>
                        <View>
                           <Text style={styles.cardText}>Date Granted:</Text>
                           <Text style={styles.cardText}>01/02/23</Text>
                        </View>
                        <View style={{ right: 38 }}>
                           <Text style={styles.cardText}>Date Due:</Text>
                           <Text style={styles.cardText}>03/01/23</Text>
                        </View>
                     </View>

                     <View style={styles.cardLine}></View>

                     <View style={styles.appliedTextWrapper}>
                        <Text style={styles.cardText}>ID-0000000</Text>
                        <TouchableOpacity onPress={() => setSelectedTab(1)}>
                           <Text style={styles.cardTextTouchable}>View</Text>
                        </TouchableOpacity>
                     </View>
                  </View>

                  {/*  <View style={styles.cardHeaderLabel}>
                     <Text style={styles.cardLabelText}>Finished</Text>
                  </View>

                  <View style={styles.appliedCardItem}>
                     <View style={styles.appliedTextWrapper}>
                        <Text style={[styles.cartTitle, { color: "green" }]}>
                           ₱15000
                        </Text>
                        <View>
                           <Text style={styles.cardText}>Term: 100 days</Text>
                           <Text style={styles.cardText}>Interest: 8% </Text>
                        </View>
                     </View>

                     <View style={styles.appliedTextWrapper}>
                        <View>
                           <Text style={styles.cardText}>Date Granted:</Text>
                           <Text style={styles.cardText}>01/02/23</Text>
                        </View>
                        <View style={{ right: 38 }}>
                           <Text style={styles.cardText}>Date Due</Text>
                           <Text style={styles.cardText}>03/01/23</Text>
                        </View>
                     </View>

                     <View style={styles.cardLine}></View>

                     <View style={styles.appliedTextWrapper}>
                        <Text style={styles.cardText}>ID-0000000</Text>
                        <TouchableOpacity onPress={() => setSelectedTab(1)}>
                           <Text style={styles.cardTextTouchable}>View</Text>
                        </TouchableOpacity>
                     </View>
                  </View> */}
               </View>
            </ScrollView>
         ) : (
            <View style={styles.historyContainer}>
               <ScrollView>
                  <Text style={styles.historyTitle}>Loans</Text>
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
                  <View style={styles.historyList}>
                     <Text style={styles.historyItem}>HG043452</Text>
                     <View>
                        <Text style={[styles.historyItem, { right: 20 }]}>
                           01/10/23
                        </Text>
                        <Text style={[styles.historyItem, { right: 20 }]}>
                           01/10/23
                        </Text>
                     </View>
                     <Text style={[styles.historyItem, { right: 30 }]}>
                        10000
                     </Text>
                     <Text style={[styles.historyItem, { right: 28 }]}>
                        100
                     </Text>
                     <Text style={[styles.historyItem, { right: 25 }]}>8%</Text>
                     <Text style={[styles.historyItem, { right: 22 }]}>
                        Paid
                     </Text>
                  </View>
                  <View style={styles.dividerLine}></View>
                  <View style={styles.historyList}>
                     <Text style={styles.historyItem}>HG043452</Text>
                     <View>
                        <Text style={[styles.historyItem, { right: 20 }]}>
                           01/10/23
                        </Text>
                        <Text style={[styles.historyItem, { right: 20 }]}>
                           01/10/23
                        </Text>
                     </View>
                     <Text style={[styles.historyItem, { right: 30 }]}>
                        10000
                     </Text>
                     <Text style={[styles.historyItem, { right: 28 }]}>
                        100
                     </Text>
                     <Text style={[styles.historyItem, { right: 25 }]}>8%</Text>
                     <Text style={[styles.historyItem, { right: 22 }]}>
                        Paid
                     </Text>
                  </View>
                  <View style={styles.dividerLine}></View>
               </ScrollView>
            </View>
         )}
      </View>
   );
}

export default Loans;
