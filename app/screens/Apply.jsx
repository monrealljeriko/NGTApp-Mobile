import {
   View,
   Text,
   StyleSheet,
   TextInput,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../component/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Button from "../component/Button";

function Apply() {
   const [selectedTerms, setSelectedTerms] = useState("");
   const [selectedPayments, setSelectedPayments] = useState("");

   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={styles.applyContainer}>
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
                        placeholder="0"
                        placeholderTextColor={COLORS.gray}
                        keyboardType="numeric"
                        style={styles.sectionInputText}
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
                        returnKeyType="next"
                        // onChangeText={(text) => setLastName(text)}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 22 }}>
                  <Text style={styles.sectionSubText}>Term</Text>

                  <View style={styles.sectionInputDropdown}>
                     <Picker
                        placeholder="Number of Days"
                        selectedValue={selectedTerms}
                        onValueChange={(itemValue) =>
                           setSelectedTerms(itemValue)
                        }
                        mode={Platform.OS === "ios" ? "modal" : "dropdown"}
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
                  <Text style={styles.sectionSubText}>Number of payments</Text>

                  <View style={styles.sectionInputDropdown}>
                     <Picker
                        placeholder="Number of Payments"
                        selectedValue={selectedPayments}
                        onValueChange={(itemValue) =>
                           setSelectedPayments(itemValue)
                        }
                        mode={Platform.OS === "ios" ? "modal" : "dropdown"}
                        style={styles.pickerItemFont}
                     >
                        <Picker.Item
                           label="Number of Payments"
                           value=""
                           style={styles.pickerItem}
                        />

                        <Picker.Item label="Daily" value="daily" />
                        <Picker.Item label="Weekly" value="weekly" />

                        <Picker.Item label="Monthly" value="monthly" />
                     </Picker>
                  </View>
               </View>
               <Text style={styles.sectionSubText}>Calculations</Text>

               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}
               >
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>Interest</Text>
                        <Text style={styles.cardTextBold}>5.5%</Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Total Finance Charge (2%)
                        </Text>
                        <Text style={styles.cardTextBold}>₱112</Text>
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
                        <Text style={styles.cardTextBold}>₱112</Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Total Non Finance Charge
                        </Text>
                        <Text style={styles.cardTextBold}>₱112</Text>
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
                        <Text style={styles.cardTextBold}>₱1122</Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>
                           Net Proceed from Loans
                        </Text>
                        <Text style={styles.cardTextBold}>₱1122</Text>
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
                        <Text style={styles.cardText}>Your Daily Payment</Text>
                        <Text style={styles.cardTextBold}>₱150</Text>
                     </View>
                  </View>
                  <View style={styles.cardItem}>
                     <View style={styles.contentWrapper}>
                        <Text style={styles.cardText}>Payable in</Text>
                        <Text style={styles.cardTextBold}>100/days</Text>
                     </View>
                  </View>
               </View>
               <View style={{ marginVertical: 20 }}>
                  <Button title="Submit Request" filled />
               </View>
            </View>
         </ScrollView>
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
      paddingHorizontal: 40,
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
});
