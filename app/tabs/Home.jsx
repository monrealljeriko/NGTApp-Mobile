import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import styles from "./styles";
import COLORS from "../component/Colors";
import { Ionicons } from "@expo/vector-icons";

function Home({ navigation }) {
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
               <Text style={styles.loanBalance}>14000</Text>
            </View>
            <View>
               <Text style={styles.payableLoan}>Payable in 90/days</Text>
            </View>
         </View>
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
                        155
                     </Text>
                     <Text style={styles.cartText}>Advise to pay</Text>
                  </View>

                  <View style={styles.cardLine}></View>

                  <View style={styles.cardTextWrapper}>
                     <Text style={styles.cartText}>ID-0000000</Text>
                     <Text style={styles.cartText}>View loan</Text>
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
                        155
                     </Text>
                     <Text style={styles.cartText}>Overdue 2 days</Text>
                  </View>
                  <View style={styles.cardLine}></View>

                  <View style={styles.cardTextWrapper}>
                     <Text style={styles.cartText}>ID-0000000</Text>
                     <Text style={styles.cartText}>View loan</Text>
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
                        155
                     </Text>
                     <Text style={styles.cartText}> Status Paid</Text>
                  </View>
                  <View style={styles.cardLine}></View>

                  <View style={styles.cardTextWrapper}>
                     <Text style={styles.cartText}>ID-0000000</Text>
                     <Text style={styles.cartText}>View loan</Text>
                  </View>
               </View>
            </View>
         </ScrollView>
      </View>
   );
}
export default Home;
