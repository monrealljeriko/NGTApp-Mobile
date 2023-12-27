import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";
import COLORS from "../../component/Colors";

function Section4({ section4Obj, setSection4Obj }) {
  const [addPerson, setAddPerson] = useState(true);
  const [selectedSource, setSelectedSource] = useState("");

  // function to handle multiple inputs with obj state
  function handleInput(text, inputName) {
    setSection4Obj((prevSection4Obj) => {
      return {
        ...prevSection4Obj,
        [inputName]: text,
      };
    });
    console.log(inputName + " : " + text);
  }

  const handlePerson = () => {
    setAddPerson(!addPerson); // is clicked again, deselect it
    {
      addPerson
        ? handleInput("personAdd", "addOtherPerson")
        : handleInput("", "addOtherPerson");
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.sectionText}>References</Text>
        <Text style={[styles.sectionSubText, { fontStyle: "italic" }]}>
          Leave N/A if not applicable
        </Text>
        <Text style={styles.sectionSubText}>Person 1 :</Text>
        <View style={styles.sectionInput}>
          <TextInput
            placeholder="Name"
            placeholderTextColor={COLORS.gray}
            style={styles.sectionInputText}
            onChangeText={(text) => handleInput(text, "referenceNameP1")}
            value={section4Obj.referenceNameP1}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <View style={styles.sectionInput}>
          <TextInput
            placeholder="Address"
            placeholderTextColor={COLORS.gray}
            style={styles.sectionInputText}
            onChangeText={(text) => handleInput(text, "referenceAddressP1")}
            value={section4Obj.referenceAddressP1}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <View style={styles.sectionInput}>
          <TextInput
            placeholder="Relation"
            placeholderTextColor={COLORS.gray}
            style={styles.sectionInputText}
            onChangeText={(text) => handleInput(text, "referenceRelationP1")}
            value={section4Obj.referenceRelationP1}
          />
        </View>
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
            maxLength={9}
            style={[styles.sectionInputText, { paddingLeft: 20 }]}
            onChangeText={(text) =>
              handleInput(text, "referenceContactNumberP1")
            }
            value={section4Obj.referenceContactNumberP1}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => handlePerson()}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.sectionOption}>
              {!addPerson ? (
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

      {section4Obj.addOtherPerson == "personAdd" && (
        <View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionSubText}>Person 2 :</Text>
            <View style={styles.sectionInput}>
              <TextInput
                placeholder="Name"
                placeholderTextColor={COLORS.gray}
                style={styles.sectionInputText}
                onChangeText={(text) => handleInput(text, "referenceNameP2")}
                value={section4Obj.referenceNameP2}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
              <TextInput
                placeholder="Address"
                placeholderTextColor={COLORS.gray}
                style={styles.sectionInputText}
                onChangeText={(text) => handleInput(text, "referenceAddressP2")}
                value={section4Obj.referenceAddressP2}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
              <TextInput
                placeholder="Relation"
                placeholderTextColor={COLORS.gray}
                style={styles.sectionInputText}
                onChangeText={(text) =>
                  handleInput(text, "referenceRelationP2")
                }
                value={section4Obj.referenceRelationP2}
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
                keyboardType="numeric"
                maxLength={9}
                placeholderTextColor={COLORS.gray}
                style={[styles.sectionInputText, { paddingLeft: 20 }]}
                onChangeText={(text) =>
                  handleInput(text, "referenceContactNumberP2")
                }
                value={section4Obj.referenceContactNumberP2}
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
            selectedValue={section4Obj.heardFrom}
            onValueChange={(itemValue) => handleInput(itemValue, "heardFrom")}
            mode={section4Obj.heardFrom ? "modal" : "dropdown"}
            style={styles.pickerItemFont}
          >
            <Picker.Item
              label="Select source"
              value=""
              style={styles.pickerItem}
            />

            <Picker.Item label="Advertisement" value="advertisement" />
            <Picker.Item label="Events or trade fair" value="events" />
            <Picker.Item label="Fliers of information drive" value="fliers" />
            <Picker.Item label="Internet or social media" value="internet" />
            <Picker.Item label="Referred by" value="referred" />
            <Picker.Item label="Others" value="others" />
          </Picker>
        </View>

        {section4Obj.heardFrom === "others" && (
          <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
              <TextInput
                placeholder="Specify"
                placeholderTextColor={COLORS.gray}
                style={styles.sectionInputText}
                onChangeText={(text) => handleInput(text, "others")}
                value={section4Obj.others}
              />
            </View>
          </View>
        )}
        {section4Obj.heardFrom === "referred" && (
          <View style={{ marginBottom: 12 }}>
            <View style={styles.sectionInput}>
              <TextInput
                placeholder="Specify"
                placeholderTextColor={COLORS.gray}
                style={styles.sectionInputText}
                onChangeText={(text) => handleInput(text, "referredBy")}
                value={section4Obj.referredBy}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default Section4;
