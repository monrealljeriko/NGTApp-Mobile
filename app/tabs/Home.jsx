import {
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,
   Pressable,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import COLORS from "../component/Colors";
import { Ionicons } from "@expo/vector-icons";

function Home({ navigation }) {
   const [selectedTab, setSelectedTab] = useState(0);

   return (
      <View style={styles.container}>
         <View style={styles.headerContainer}>
            <View style={styles.headerProfile}>
               <Image
                  source={require("../../assets/icons/icon-profile.png")}
                  style={styles.headerImage}
               />
               <Text style={styles.headerName}>John Doe</Text>
            </View>
            <Ionicons name="notifications" size={24} color={COLORS.primary} />
         </View>
         <View style={styles.loanDetailsContainer}>
            <View>
               <Text style={styles.loanTitle}>Current Loan</Text>
               <Text style={styles.loanBalance}>₱14000</Text>
            </View>
            <View
               style={{
                  justifyContent: "center",
                  gap: 10,
                  bottom: 5,
               }}
            >
               <Text style={styles.payableLoan}>Payable in 90/days</Text>
               <Text style={styles.payableLoan}>₱11200 Remaining</Text>
            </View>
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
            <View style={styles.detailsContainer}>
               <Text style={styles.detailsTitle}>Daily Schedule</Text>
               <View style={styles.detailsHeaderLabel}>
                  <Text style={styles.detailsLabel}>Day</Text>
                  <Text style={styles.detailsLabel}>Date</Text>
                  <Text style={styles.detailsLabel}>Amount</Text>
                  <Text style={styles.detailsLabel}>Status</Text>
               </View>
               <ScrollView>
                  <View style={styles.detailsList}>
                     <Text style={styles.detailsItem}>01</Text>
                     <Text style={[styles.detailsItem, { right: 15 }]}>
                        01/10/23
                     </Text>
                     <Text style={[styles.detailsItem, { right: 20 }]}>
                        155
                     </Text>
                     <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="lightgreen"
                     />
                  </View>
                  <View style={styles.detailsList}>
                     <Text style={styles.detailsItem}>02</Text>
                     <Text style={[styles.detailsItem, { right: 15 }]}>
                        01/10/23
                     </Text>
                     <Text style={[styles.detailsItem, { right: 20 }]}>
                        155
                     </Text>
                     <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={COLORS.gray2}
                     />
                  </View>
                  <View style={styles.detailsList}>
                     <Text style={styles.detailsItem}>03</Text>
                     <Text style={[styles.detailsItem, { right: 15 }]}>
                        01/10/23
                     </Text>
                     <Text style={[styles.detailsItem, { right: 20 }]}>
                        155
                     </Text>
                     <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={COLORS.gray2}
                     />
                  </View>
                  <View style={styles.detailsList}>
                     <Text style={styles.detailsItem}>90</Text>
                     <Text style={[styles.detailsItem, { right: 15 }]}>
                        01/10/23
                     </Text>
                     <Text style={[styles.detailsItem, { right: 20 }]}>
                        155
                     </Text>
                     <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={COLORS.gray2}
                     />
                  </View>
               </ScrollView>
            </View>
         )}
      </View>
   );
}
export default Home;
