import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   Pressable,
   Platform,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import COLORS from "../../component/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

function Section1() {
   const [date, setDate] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [dateText, setDateText] = useState("");

   const [selectedID, setSelectedID] = useState(null);
   const [otherIDText, setOtherIDText] = useState("");
   const [idNumber, setIDNumber] = useState("");

   const [selectedType, setSelectedType] = useState(false);
   const [otherType, setOtherType] = useState("");

   const [selectedVehicle, setSelectedVehicle] = useState("");
   const [typeVehicle, setTypeVehicle] = useState("");
   const [plateVehicle, setPlateVehicle] = useState("");

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      const formattedDate = currentDate.toLocaleDateString();

      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);
      setDateText(formattedDate);
   };

   const showDatepicker = () => {
      setShowDatePicker(true);
   };

   const handleSelectID = (id) => {
      if (selectedID === id) {
         setSelectedID(null); // is clicked again, deselect it
      } else {
         setSelectedID(id);
      }
   };
   const handleSelectedVehicle = (id) => {
      setSelectedVehicle(id);
   };

   return (
      <View>
         {/* Personal information */}
         <Text style={styles.sectionText}>Personal Information</Text>
         <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionSubText}>Basic information :</Text>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Last name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  returnKeyType="next"
                  // onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="First name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Middle name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Place of birth"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <Pressable onPress={showDatepicker}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder={showDatePicker ? "" : "Date of birth"}
                     placeholderTextColor={COLORS.gray}
                     keyboardType="numeric"
                     style={styles.sectionInputText}
                     value={dateText}
                     editable={false}
                  />
                  <Ionicons
                     name="calendar-sharp"
                     size={20}
                     color={COLORS.primary}
                     style={{ right: 20, opacity: 0.8 }}
                  />
               </View>
            </Pressable>

            {showDatePicker && (
               <DateTimePicker
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
               />
            )}
         </View>
         <View style={styles.sectionInputContainer}>
            <View style={{ marginBottom: 12 }}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder="Heigt(cm)"
                     placeholderTextColor={COLORS.gray}
                     style={styles.sectionInputText}
                  />
               </View>
            </View>
            <View style={{ marginBottom: 12 }}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder="Weight(kg)"
                     placeholderTextColor={COLORS.gray}
                     style={styles.sectionInputText}
                  />
               </View>
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Highest completed education/course"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>

         {/* Identification */}
         <Text style={styles.sectionSubText}>Identification :</Text>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Tax ID number"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="SSS ID number"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>
         <View>
            <TouchableOpacity onPress={() => handleSelectID("otherID")}>
               <View style={{ flexDirection: "row" }}>
                  <View style={styles.sectionOption}>
                     {selectedID === "otherID" ? (
                        <Ionicons
                           name="remove-outline"
                           size={16}
                           color={COLORS.primary}
                           style={{ opacity: 0.8 }}
                        />
                     ) : (
                        <Ionicons
                           name="add-outline"
                           size={16}
                           color={COLORS.primary}
                           style={{ opacity: 0.8 }}
                        />
                     )}
                  </View>
                  <Text style={[styles.sectionSubText, { color: COLORS.gray }]}>
                     Other ID
                  </Text>
               </View>
            </TouchableOpacity>
         </View>

         {selectedID === "otherID" && (
            <View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Specify ID"
                        placeholderTextColor={COLORS.gray}
                        value={otherIDText}
                        style={styles.sectionInputText}
                        onChangeText={(text) => setOtherIDText(text)}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="ID number"
                        placeholderTextColor={COLORS.gray}
                        value={idNumber}
                        onChangeText={(text) => setIDNumber(text)}
                        style={styles.sectionInputText}
                     />
                  </View>
               </View>
            </View>
         )}

         {/* Dependencies */}
         <Text style={styles.sectionSubText}>Dependencies :</Text>
         <View style={styles.sectionInputContainer}>
            <View style={{ marginBottom: 12 }}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder="Count"
                     placeholderTextColor={COLORS.gray}
                     style={styles.sectionInputText}
                  />
               </View>
            </View>
            <View style={{ marginBottom: 12 }}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder="Ages"
                     placeholderTextColor={COLORS.gray}
                     style={styles.sectionInputText}
                  />
               </View>
            </View>
         </View>

         {/* Adresss */}
         <Text style={styles.sectionSubText}>Address :</Text>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Present address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInputDropdown}>
               <Picker
                  placeholder={selectedType == "" ? "" : "Date of birth"}
                  selectedValue={selectedType}
                  onValueChange={(itemValue) => setSelectedType(itemValue)}
                  mode={Platform.OS === "ios" ? "modal" : "dropdown"}
               >
                  <Picker.Item
                     label="Select type"
                     value=""
                     style={styles.pickerItem}
                  />
                  <Picker.Item
                     label="Owned"
                     value="Owned"
                     style={styles.pickerItemFont}
                  />
                  <Picker.Item label="Rented" value="Rented" />
                  <Picker.Item label="Mortgaged" value="Mortgaged" />
                  <Picker.Item label="Others" value="Others" />
               </Picker>
            </View>

            {selectedType === "Others" && (
               <View style={{ marginTop: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Other owner type"
                        placeholderTextColor={COLORS.gray}
                        value={otherType}
                        onChangeText={(text) => setOtherType(text)}
                        style={styles.sectionInputText}
                     />
                  </View>
               </View>
            )}
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Provincial address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Length of time at present address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Email address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
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
                  keyboardType="numeric"
                  style={[styles.sectionInputText, { paddingLeft: 20 }]}
               />
            </View>
         </View>

         <View>
            <View style={{ flexDirection: "row" }}>
               <Text
                  style={[
                     styles.sectionSubText,
                     { color: COLORS.gray, marginRight: 10 },
                  ]}
               >
                  Do you own a vehicle?
               </Text>
               <TouchableOpacity onPress={() => handleSelectedVehicle("Yes")}>
                  <View style={styles.sectionOption}>
                     {selectedVehicle === "Yes" && (
                        <View style={styles.sectionOptionFill} />
                     )}
                  </View>
               </TouchableOpacity>
               <Text
                  style={[
                     styles.sectionSubText,
                     { color: COLORS.gray, marginRight: 10 },
                  ]}
               >
                  Yes
               </Text>
               <TouchableOpacity onPress={() => handleSelectedVehicle("No")}>
                  <View style={styles.sectionOption}>
                     {selectedVehicle === "No" && (
                        <View style={styles.sectionOptionFill} />
                     )}
                  </View>
               </TouchableOpacity>
               <Text
                  style={[
                     styles.sectionSubText,
                     { color: COLORS.gray, marginRight: 10 },
                  ]}
               >
                  No
               </Text>
            </View>
         </View>

         {selectedVehicle === "Yes" && (
            <View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Type"
                        placeholderTextColor={COLORS.gray}
                        value={typeVehicle}
                        style={styles.sectionInputText}
                        onChangeText={(text) => setTypeVehicle(text)}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Plate number"
                        placeholderTextColor={COLORS.gray}
                        value={plateVehicle}
                        onChangeText={(text) => setPlateVehicle(text)}
                        style={styles.sectionInputText}
                     />
                  </View>
               </View>
            </View>
         )}
      </View>
   );
}

export default Section1;
