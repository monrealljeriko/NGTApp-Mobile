import { View, Text, TextInput, Platform } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";
import COLORS from "../../component/Colors";

function Section2({ section2Obj, setSection2Obj }) {
  const [selectedIncome, setSelectedIncome] = useState("");
  const [selectedStatus, setSelecttedStatus] = useState("");

  // function to handle multiple inputs with obj state
  function handleInput(text, inputName) {
    setSection2Obj((prevSection2Obj) => {
      return {
        ...prevSection2Obj,
        [inputName]: text,
      };
    });
    console.log(inputName + " : " + text);
  }

  return (
    <View>
      <Text style={styles.sectionText}>Employment or Business Information</Text>
      <Text style={[styles.sectionSubText, { fontStyle: "italic" }]}>
        Leave N/A if not applicable
      </Text>
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.sectionSubText}>Basic information :</Text>
        <View style={styles.sectionInput}>
          <TextInput
            autoCapitalize="words"
            placeholder="Occupation"
            placeholderTextColor={COLORS.gray}
            style={styles.sectionInputText}
            onChangeText={(text) => handleInput(text, "occupation")}
            value={section2Obj.occupation}
          />
        </View>
      </View>
      <View style={{ marginBottom: 12 }}>
        <View style={styles.sectionInput}>
          <TextInput
            autoCapitalize="words"
            placeholder="Length of service or date started"
            placeholderTextColor={COLORS.gray}
            style={styles.sectionInputText}
            onChangeText={(text) => handleInput(text, "lengthOfService")}
            value={section2Obj.lengthOfService}
          />
        </View>
      </View>
      <View style={{ marginBottom: 12 }}>
        <View style={styles.sectionInput}>
          <TextInput
            autoCapitalize="words"
            placeholder="Employer or business name"
            placeholderTextColor={COLORS.gray}
            style={styles.sectionInputText}
            onChangeText={(text) => handleInput(text, "bussinessName")}
            value={section2Obj.bussinessName}
          />
        </View>
      </View>
      <View style={{ marginBottom: 12 }}>
        <View style={styles.sectionInput}>
          <TextInput
            autoCapitalize="words"
            placeholder="Employer or business address"
            placeholderTextColor={COLORS.gray}
            style={styles.sectionInputText}
            onChangeText={(text) => handleInput(text, "businessAddress")}
            value={section2Obj.businessAddress}
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
            keyboardType="numeric"
            placeholderTextColor={COLORS.gray}
            style={[styles.sectionInputText, { paddingLeft: 20 }]}
            maxLength={9}
            onChangeText={(text) => handleInput(text, "businessContactNumber")}
            value={section2Obj.businessContactNumber}
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
            selectedValue={section2Obj.monthltIncome}
            onValueChange={(itemValue) =>
              handleInput(itemValue, "monthltIncome")
            }
            mode={section2Obj.monthltIncome ? "modal" : "dropdown"}
            style={styles.pickerItemFont}
          >
            <Picker.Item
              label="Select income"
              value=""
              style={styles.pickerItem}
            />

            <Picker.Item label="Under 8,000" value="Under 8,00" />
            <Picker.Item label="8,000 - 15,000" value="8,000 - 15,000" />
            <Picker.Item label="15,000 - 30,000" value="15,000 - 30,000" />
            <Picker.Item label="30,001 - 50,000" value="30,001 - 50,000" />
            <Picker.Item label="50,001 - 100,000" value="50,001 - 100,000" />
            <Picker.Item label="Above 100,000" value="Above 100,000" />
          </Picker>
        </View>
      </View>
      <View style={{ marginBottom: 22 }}>
        <Text style={styles.sectionSubText}>Employment status</Text>

        <View style={styles.sectionInputDropdown}>
          <Picker
            placeholder="Select income"
            selectedValue={section2Obj.employmentStatus}
            onValueChange={(itemValue) =>
              handleInput(itemValue, "employmentStatus")
            }
            mode={section2Obj.employmentStatus ? "modal" : "dropdown"}
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
