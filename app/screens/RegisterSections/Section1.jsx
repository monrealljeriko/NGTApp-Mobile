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
import styles from "../styles";
import COLORS from "../../component/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

function Section1({ section1Obj, setSection1Obj }) {
   const [date, setDate] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [selectedID, setSelectedID] = useState(true);

   // function to handle multiple inputs with obj state
   function handleInput(text, inputName) {
      setSection1Obj((prevSection1Obj) => {
         return {
            ...prevSection1Obj,
            [inputName]: text,
         };
      });
      console.log(inputName + " : " + text);
   }

   // handle date picker
   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      const formattedDate = currentDate.toLocaleDateString();
      setShowDatePicker(!showDatePicker);

      if (event.type === "set") {
         setDate(currentDate);
         handleInput(formattedDate, "dateOfBirth");
      }
   };

   const showDatepicker = () => {
      setShowDatePicker(true);
   };

   const handleSelectID = () => {
      setSelectedID(!selectedID);

      {
         selectedID
            ? handleInput("otherID", "addOtherID")
            : handleInput("", "addOtherID");
      }
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
                  onChangeText={(text) => handleInput(text, "lastName")}
                  value={section1Obj.lastName}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="First name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "firstName")}
                  value={section1Obj.firstName}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Middle name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "middleName")}
                  value={section1Obj.middleName}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Place of birth"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "placeOfBirth")}
                  value={section1Obj.placeOfBirth}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <Pressable onPress={showDatepicker}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder={showDatePicker ? "" : "Date of birth"}
                     placeholderTextColor={COLORS.gray}
                     style={styles.sectionInputText}
                     value={section1Obj.dateOfBirth}
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
                     keyboardType="numeric"
                     style={styles.sectionInputText}
                     onChangeText={(text) => handleInput(text, "height")}
                     value={section1Obj.height}
                  />
               </View>
            </View>
            <View style={{ marginBottom: 12 }}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder="Weight(kg)"
                     keyboardType="numeric"
                     placeholderTextColor={COLORS.gray}
                     style={styles.sectionInputText}
                     onChangeText={(text) => handleInput(text, "weight")}
                     value={section1Obj.weight}
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
                  onChangeText={(text) =>
                     handleInput(text, "completedEducation")
                  }
                  value={section1Obj.completedEducation}
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
                  onChangeText={(text) => handleInput(text, "taxIDnumber")}
                  value={section1Obj.taxIDnumber}
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
                  onChangeText={(text) => handleInput(text, "sssIDnumber")}
                  value={section1Obj.sssIDnumber}
               />
            </View>
         </View>
         <View>
            <TouchableOpacity onPress={() => handleSelectID()}>
               <View style={{ flexDirection: "row" }}>
                  <View style={styles.sectionOption}>
                     {!selectedID ? (
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

         {section1Obj.addOtherID == "otherID" && (
            <View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Specify ID"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) =>
                           handleInput(text, "otherIDname")
                        }
                        value={section1Obj.otherIDname}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="ID number"
                        keyboardType="numeric"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) =>
                           handleInput(text, "otherIDnumber")
                        }
                        value={section1Obj.otherIDnumber}
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
                     keyboardType="numeric"
                     style={styles.sectionInputText}
                     onChangeText={(text) =>
                        handleInput(text, "dependenciesCount")
                     }
                     value={section1Obj.dependenciesCount}
                  />
               </View>
            </View>
            <View style={{ marginBottom: 12 }}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder="Ages"
                     placeholderTextColor={COLORS.gray}
                     keyboardType="numeric"
                     style={styles.sectionInputText}
                     onChangeText={(text) =>
                        handleInput(text, "dependenciesAges")
                     }
                     value={section1Obj.dependenciesAges}
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
                  onChangeText={(text) => handleInput(text, "presentAddress")}
                  value={section1Obj.presentAddress}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInputDropdown}>
               <Picker
                  selectedValue={section1Obj.addressType}
                  onValueChange={(itemValue) =>
                     handleInput(itemValue, "addressType")
                  }
                  mode={section1Obj.addressType ? "modal" : "dropdown"}
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

            {section1Obj.addressType === "Others" && (
               <View style={{ marginTop: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Owner address type"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) =>
                           handleInput(text, "addressOtherType")
                        }
                        value={section1Obj.addressOtherType}
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
                  onChangeText={(text) =>
                     handleInput(text, "provincialAddress")
                  }
                  value={section1Obj.provincialAddress}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Length of time at present address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "lengthOfTime")}
                  value={section1Obj.lengthOfTime}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Email address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "emailAddress")}
                  value={section1Obj.emailAddress}
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
                  onChangeText={(text) => handleInput(text, "contactNumber")}
                  value={section1Obj.contactNumber}
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
               <TouchableOpacity
                  onPress={() => handleInput("Yes", "vehicleSelect")}
               >
                  <View style={styles.sectionOption}>
                     {section1Obj.vehicleSelect === "Yes" && (
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
               <TouchableOpacity
                  onPress={() => handleInput("No", "vehicleSelect")}
               >
                  <View style={styles.sectionOption}>
                     {section1Obj.vehicleSelect === "No" && (
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

         {section1Obj.vehicleSelect === "Yes" && (
            <View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Type"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) =>
                           handleInput(text, "vehicleType")
                        }
                        value={section1Obj.vehicleType}
                     />
                  </View>
               </View>
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Plate number"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) =>
                           handleInput(text, "vehiclePlateNumber")
                        }
                        value={section1Obj.vehiclePlateNumber}
                     />
                  </View>
               </View>
            </View>
         )}
      </View>
   );
}

export default Section1;
