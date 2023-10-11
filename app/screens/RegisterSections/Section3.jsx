import { View, Text, TextInput, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import COLORS from "../../component/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

function Section3({ section3Obj, setSection3Obj }) {
   const [date, setDate] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);

   // function to handle multiple inputs with obj state
   function handleInput(text, inputName) {
      setSection3Obj((prevSection3Obj) => {
         return {
            ...prevSection3Obj,
            [inputName]: text,
         };
      });
      console.log(inputName + " : " + text);
   }

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      const formattedDate = currentDate.toLocaleDateString();
      setShowDatePicker(!showDatePicker);

      if (event.type === "set") {
         setDate(currentDate);
         handleInput(formattedDate, "spouseDateOfBirth");
      }
   };

   const showDatepicker = () => {
      setShowDatePicker(true);
   };
   return (
      <View>
         <Text style={styles.sectionText}>Spouse's Information</Text>
         <Text style={styles.sectionSubText}>Basic information :</Text>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Last name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "spouseLastName")}
                  value={section3Obj.spouseLastName}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="First name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "spouseFirstName")}
                  value={section3Obj.spouseFirstName}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Middle name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "spouseMiddleName")}
                  value={section3Obj.spouseMiddleName}
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
                     value={section3Obj.spouseDateOfBirth}
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
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="+63"
                  editable={false}
                  placeholderTextColor={COLORS.gray}
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
                  onChangeText={(text) =>
                     handleInput(text, "spouseContactNumber")
                  }
                  value={section3Obj.spouseContactNumber}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Occupation"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "spouseOccupation")}
                  value={section3Obj.spouseOccupation}
               />
            </View>
         </View>

         <Text style={styles.sectionSubText}>Work :</Text>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Employer or business"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => handleInput(text, "spouseBusiness")}
                  value={section3Obj.spouseBusiness}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Business/Employer's Address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) =>
                     handleInput(text, "spouseBusinessAddress")
                  }
                  value={section3Obj.spouseBusinessAddress}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Monthly Income (In Peso)"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) =>
                     handleInput(text, "spouseMonthlyIncome")
                  }
                  value={section3Obj.spouseMonthlyIncome}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Employment Status"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) =>
                     handleInput(text, "spouseEmploymentStatus")
                  }
                  value={section3Obj.spouseEmploymentStatus}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Length of Service"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) =>
                     handleInput(text, "spouseLenghtService")
                  }
                  value={section3Obj.spouseLenghtService}
               />
            </View>
         </View>
      </View>
   );
}

export default Section3;
