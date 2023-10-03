import { View, Text, TextInput, Platform } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";
import COLORS from "../../component/Colors";

function Section2() {
   const [selectedIncome, setSelectedIncome] = useState("");
   const [selectedStatus, setSelecttedStatus] = useState("");

   return (
      <View>
         <Text style={styles.sectionText}>
            Employment or Business Information
         </Text>
         <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionSubText}>Basic information :</Text>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Occupation"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Length of service or date started"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Employer or business address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Employer or business address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="+63"
                  editable={false}
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  style={{
                     width: "15%",
                     borderRightWidth: 1,
                     borderColor: COLORS.gray2,
                  }}
               />

               <TextInput
                  placeholder="Contact number"
                  placeholderTextColor={COLORS.gray}
                  style={[styles.sectionInputText, { paddingLeft: 20 }]}
               />
            </View>
         </View>
         <View style={{ marginBottom: 22 }}>
            <Text style={styles.sectionSubText}>
               Which of the following come closest to your monthly income in
               Philippine Pesos?
            </Text>

            <View style={styles.sectionInputDropdown}>
               <Picker
                  placeholder="Select income"
                  selectedValue={selectedIncome}
                  onValueChange={(itemValue) => setSelectedIncome(itemValue)}
                  mode={Platform.OS === "ios" ? "modal" : "dropdown"}
                  style={styles.pickerItemFont}
               >
                  <Picker.Item
                     label="Select income"
                     value=""
                     style={styles.pickerItem}
                  />

                  <Picker.Item label="Under 8,000" value="Under 8,00" />
                  <Picker.Item label="8,000 - 15,000" value="8,000 - 15,000" />
                  <Picker.Item
                     label="15,000 - 30,000"
                     value="15,000 - 30,000"
                  />
                  <Picker.Item
                     label="30,001 - 50,000"
                     value="30,001 - 50,000"
                  />
                  <Picker.Item
                     label="50,001 - 100,000"
                     value="50,001 - 100,000"
                  />
                  <Picker.Item label="Above 100,000" value="Above 100,000" />
               </Picker>
            </View>
         </View>
         <View style={{ marginBottom: 22 }}>
            <Text style={styles.sectionSubText}>Employment status</Text>

            <View style={styles.sectionInputDropdown}>
               <Picker
                  placeholder="Select income"
                  selectedValue={selectedStatus}
                  onValueChange={(itemValue) => setSelecttedStatus(itemValue)}
                  mode={Platform.OS === "ios" ? "modal" : "dropdown"}
                  style={styles.pickerItemFont}
               >
                  <Picker.Item
                     label="Select status"
                     value=""
                     style={styles.pickerItem}
                  />

                  <Picker.Item label="Regular" value="Regular" />
                  <Picker.Item label="Contractual" value="Contractual" />
                  <Picker.Item label="Others" value="Others" />
               </Picker>
            </View>
         </View>
      </View>
   );
}

export default Section2;
