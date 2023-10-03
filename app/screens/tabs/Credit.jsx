import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import COLORS from "../../component/Colors";
import { Ionicons } from "@expo/vector-icons";

function Credit({ navigation }) {
   const [selectedTab, setSelectedTab] = useState(0);

   return (
      <View style={styles.container}>
         <View style={styles.headerContainerCredit}>
            <Text style={styles.headerTitleCredit}>Perforance</Text>
            <Ionicons
               name="information-circle"
               size={24}
               color={COLORS.white}
            />
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
                  Credit
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
                  Shares
               </Text>
            </TouchableOpacity>
         </View>

         {selectedTab == 0 ? (
            <View style={styles.creditContainer}>
               <Text style={[styles.creditTitle, { textAlign: "center" }]}>
                  Available Score
               </Text>
               <View style={styles.creditCircle}>
                  <Text style={[styles.creditBalance, { textAlign: "center" }]}>
                     501
                  </Text>
               </View>
               <View style={styles.detailsHeaderLabel}>
                  <Text style={styles.detailsLabel}>Summary</Text>
                  <Text style={[styles.detailsLabel, { right: 20 }]}>Date</Text>
               </View>
               <ScrollView>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="add-outline"
                           size={18}
                           color="lightgreen"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>501</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="add-outline"
                           size={18}
                           color="lightgreen"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>500</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="arrow-up"
                           size={18}
                           color="lightgreen"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>499</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="remove"
                           size={18}
                           color="red"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>498</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="arrow-down"
                           size={18}
                           color="red"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>499</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
               </ScrollView>
            </View>
         ) : (
            <View style={styles.creditContainer}>
               <Text style={[styles.creditTitle, { textAlign: "center" }]}>
                  Total Share
               </Text>
               <View style={styles.creditCircle}>
                  <Text style={[styles.creditBalance, { textAlign: "center" }]}>
                     50K
                  </Text>
               </View>
               <View style={styles.detailsHeaderLabel}>
                  <Text style={styles.detailsLabel}>Summary</Text>
                  <Text style={[styles.detailsLabel, { right: 12 }]}>Date</Text>
               </View>
               <ScrollView>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="add-outline"
                           size={18}
                           color="lightgreen"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>8000</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="add-outline"
                           size={18}
                           color="lightgreen"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>2000</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
                  <View style={styles.detailsList}>
                     <View style={{ flexDirection: "row" }}>
                        <Ionicons
                           name="arrow-up"
                           size={18}
                           color="lightgreen"
                           style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>5000</Text>
                     </View>
                     <Text style={[styles.detailsItem]}>01/10/23</Text>
                  </View>
               </ScrollView>
            </View>
         )}
      </View>
   );
}

export default Credit;
