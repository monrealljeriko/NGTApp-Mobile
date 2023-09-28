import { View, Text, TextInput, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";
import COLORS from "../../component/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

function Section3() {
   const [date, setDate] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [dateTextSpouse, setDateTextSpouse] = useState("");

   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      const formattedDate = currentDate.toLocaleDateString();

      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);
      setDateTextSpouse(formattedDate);
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
                  onChangeText={(text) => setLastName(text)}
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
            <Pressable onPress={showDatepicker}>
               <View style={styles.sectionInput}>
                  <TextInput
                     placeholder={showDatePicker ? "" : "Date of birth"}
                     placeholderTextColor={COLORS.gray}
                     keyboardType="numeric"
                     style={styles.sectionInputText}
                     value={dateTextSpouse}
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
         <Text style={styles.sectionSubText}>Work :</Text>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Employer or business"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Business/Employer's address work"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>
      </View>
   );
}

export default Section3;
