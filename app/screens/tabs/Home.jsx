import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import COLORS from "../../component/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import Apply from "../Apply";

function Home({ navigation }) {
   const [selectedTab, setSelectedTab] = useState(0);
   const [isFabOpen, setIsFabOpen] = useState(false);

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
                  <View style={styles.dividerLine}></View>

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
