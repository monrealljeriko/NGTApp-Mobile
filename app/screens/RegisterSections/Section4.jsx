import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";
import COLORS from "../../component/Colors";

function Section4() {
   const [addPerson, setAddPerson] = useState(null);
   const [selectedSource, setSelectedSource] = useState("");

   const handlePerson = (id) => {
      if (addPerson === id) {
         setAddPerson(null); // is clicked again, deselect it
      } else {
         setAddPerson(id);
      }
   };

   return (
      <View>
         <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionText}>References</Text>
            <Text style={styles.sectionSubText}>Person 1 :</Text>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Name"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
                  onChangeText={(text) => setLastName(text)}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.sectionInputText}
               />
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
               <TextInput
                  placeholder="Relation"
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
                  style={[styles.sectionInputText, { paddingLeft: 20 }]}
               />
            </View>
         </View>

         <View>
            <TouchableOpacity onPress={() => handlePerson("refPerson")}>
               <View style={{ flexDirection: "row" }}>
                  <View style={styles.sectionOption}>
                     {addPerson === "refPerson" ? (
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
                     Add reference
                  </Text>
               </View>
            </TouchableOpacity>
         </View>

         {addPerson === "refPerson" && (
            <View>
               <View style={{ marginBottom: 12 }}>
                  <Text style={styles.sectionSubText}>Person 2 :</Text>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Name"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) => setLastName(text)}
                     />
                  </View>
               </View>

               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Address"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                     />
                  </View>
               </View>

               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Relation"
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
                        style={[styles.sectionInputText, { paddingLeft: 20 }]}
                     />
                  </View>
               </View>
            </View>
         )}

         <View style={{ marginBottom: 22 }}>
            <Text style={styles.sectionSubText}>
               How did you hear about San Jose Public Market Vendors Credit
               Cooperative?
            </Text>

            <View style={[styles.sectionInputDropdown, { marginBottom: 12 }]}>
               <Picker
                  placeholder="Select income"
                  selectedValue={selectedSource}
                  onValueChange={(itemValue) => setSelectedSource(itemValue)}
                  mode={Platform.OS === "ios" ? "modal" : "dropdown"}
                  style={styles.pickerItemFont}
               >
                  <Picker.Item
                     label="Select source"
                     value=""
                     style={styles.pickerItem}
                  />

                  <Picker.Item label="Advertisement" value="ads" />
                  <Picker.Item label="Events or trade fair" value="events" />
                  <Picker.Item
                     label="Fliers of information drive"
                     value="fliers"
                  />
                  <Picker.Item
                     label="Internet or social media"
                     value="internet"
                  />
                  <Picker.Item label="Referred by" value="refer" />
                  <Picker.Item label="Others" value="others" />
               </Picker>
            </View>

            {selectedSource === "others" && (
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Specify"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) => setLastName(text)}
                     />
                  </View>
               </View>
            )}
            {selectedSource === "refer" && (
               <View style={{ marginBottom: 12 }}>
                  <View style={styles.sectionInput}>
                     <TextInput
                        placeholder="Specify"
                        placeholderTextColor={COLORS.gray}
                        style={styles.sectionInputText}
                        onChangeText={(text) => setLastName(text)}
                     />
                  </View>
               </View>
            )}
         </View>
      </View>
   );
}

export default Section4;
