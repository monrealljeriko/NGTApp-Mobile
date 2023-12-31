import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import styles from "../styles";
import Button from "../../component/Button";
import Modal from "react-native-modal";
import COLORS from "../../component/Colors";
import { Ionicons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import usePushNotification from "../../../useNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function RegisterCompleted({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Personal information */}
      <Image source={require("../../../assets/images/submit-check.png")} />
      <View style={{ marginHorizontal: 40, marginTop: 20 }}>
        <Text style={styles.submitTitle}>Submitted Successfully</Text>
        <Text style={styles.submitText}>
          Your application has been submitted successfully. You will be notified
          soon.
        </Text>
        <Button
          title="Close"
          filled
          onPress={() => navigation.navigate("Start")}
          style={{
            marginTop: 22,
            marginBottom: 4,
            border: "none",
            marginHorizontal: 60,
          }}
        />
      </View>
    </View>
  );
}

// Modal configuration
function ConfirmationModal({ isVisible, onConfirm, onCancel }) {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <View style={{ margin: 20 }}>
          <Text style={styles.modalHeader}>
            Are you sure you want to submit your application?
          </Text>
        </View>
        <View style={styles.modalButton}>
          <TouchableOpacity onPress={onCancel}>
            <View style={styles.moodalCancel}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onConfirm}>
            <View style={styles.modalConfirm}>
              <Text style={styles.modalConfirmText}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Section handler for multiple pages
function SectionHandler({ navigation }) {
  usePushNotification();

  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [registerID, setRegisterID] = useState(0);
  const [pushToken, setPushToken] = useState();

  function getToken() {
    AsyncStorage.getItem("PushToken")
      .then((savedToken) => {
        if (savedToken) {
          setPushToken(savedToken);
        }
      })
      .catch((error) => {});
  }

  useEffect(() => {
    function generateUniqueId() {
      // Generate 8 random numbers (0-9)
      const numChars = "0123456789";
      let numId = "";
      for (let i = 0; i < 8; i++) {
        numId += numChars[Math.floor(Math.random() * 10)];
      }

      // Generate 4 random letters (A-Z)
      const letterChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let letterId = "";
      for (let i = 0; i < 4; i++) {
        letterId += letterChars[Math.floor(Math.random() * 26)];
      }

      const uniqueId = letterId + numId;

      return uniqueId;
    }
    getToken();
    setRegisterID(generateUniqueId());
  }, []);

  // section 1 data handler
  const [section1Obj, setSection1Obj] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    placeOfBirth: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    completedEducation: "",
    taxIDnumber: "",
    sssIDnumber: "",
    addOtherID: "",
    otherIDname: "",
    otherIDnumber: "",
    dependenciesCount: "",
    dependenciesAges: "",
    presentAddress: "",
    addressType: "",
    otherType: "",
    addressOtherType: "",
    provincialAddress: "",
    lengthOfTime: "",
    emailAddress: "",
    contactNumber: "",
    vehicleSelect: "",
    vehicleType: "",
    vehiclePlateNumber: "",
    memberSince: "",
  });

  // section 2 data handler
  const [section2Obj, setSection2Obj] = useState({
    occupation: "",
    lengthOfService: "",
    businessAddress: "",
    bussinessName: "",
    businessContactNumber: "",
    monthltIncome: "",
    employmentStatus: "",
  });

  // section 3 data handler
  const [section3Obj, setSection3Obj] = useState({
    spouseLastName: "",
    spouseFirstName: "",
    spouseMiddleName: "",
    spouseDateOfBirth: "",
    spouseContactNumber: "",
    spouseOccupation: "",
    spouseBusiness: "",
    spouseBusinessAddress: "",
    spouseMonthlyIncome: "",
    spouseEmploymentStatus: "",
    spouseLenghtService: "",
  });

  // section 4 data handler
  const [section4Obj, setSection4Obj] = useState({
    referenceNameP1: "",
    referenceAddressP1: "",
    referenceRelationP1: "",
    referenceContactNumberP1: "",
    businessContactNumberP1: "",
    addOtherPerson: "",
    referenceNameP2: "",
    referenceAddressP2: "",
    referenceRelationP2: "",
    referenceContactNumberP2: "",
    businessContactNumberP2: "",
    heardFrom: "",
    others: "",
    referredBy: "",
  });

  const handleNextPage = () => {
    if (currentPage < 5) {
      if (currentPage === 1) {
        if (
          !section1Obj.lastName ||
          !section1Obj.firstName ||
          !section1Obj.middleName ||
          !section1Obj.placeOfBirth ||
          !section1Obj.dateOfBirth ||
          !section1Obj.height ||
          !section1Obj.weight ||
          !section1Obj.completedEducation ||
          !section1Obj.taxIDnumber ||
          !section1Obj.sssIDnumber ||
          !section1Obj.dependenciesCount ||
          !section1Obj.dependenciesAges ||
          !section1Obj.presentAddress ||
          !section1Obj.addressType ||
          !section1Obj.provincialAddress ||
          !section1Obj.lengthOfTime ||
          !section1Obj.emailAddress ||
          !section1Obj.contactNumber ||
          !section1Obj.vehicleSelect
        ) {
          alert(
            "Please fill in or select all required fields. Leave N/A if not applicable."
          );
        } else if (section1Obj.addOtherID === "otherID") {
          if (!section1Obj.otherIDname || !section1Obj.otherIDnumber) {
            alert(
              "Please fill in or select all required fields. Leave N/A if not applicable."
            );
          } else {
            setCurrentPage(currentPage + 1);
          }
        } else if (section1Obj.addressType === "Others") {
          if (!section1Obj.addressOtherType) {
            alert(
              "Please fill in or select all required fields. Leave N/A if not applicable."
            );
          } else {
            setCurrentPage(currentPage + 1);
          }
        } else if (section1Obj.vehicleSelect === "Yes") {
          if (!section1Obj.vehicleType || !section1Obj.vehiclePlateNumber) {
            alert(
              "Please fill in or select all required fields. Leave N/A if not applicable."
            );
          } else {
            setCurrentPage(currentPage + 1);
          }
        } else {
          setCurrentPage(currentPage + 1);
        }
      }
      if (currentPage === 2) {
        if (
          // Check if all required fields in section2Obj are filled
          !section2Obj.occupation ||
          !section2Obj.lengthOfService ||
          !section2Obj.businessAddress ||
          !section2Obj.bussinessName ||
          !section2Obj.businessContactNumber ||
          !section2Obj.monthltIncome ||
          !section2Obj.employmentStatus
        ) {
          alert(
            "Please fill in or select all required fields. Leave N/A if not applicable."
          );
        } else {
          setCurrentPage(currentPage + 1);
        }
      }
      if (currentPage === 3) {
        if (
          !section3Obj.spouseLastName ||
          !section3Obj.spouseFirstName ||
          !section3Obj.spouseMiddleName ||
          !section3Obj.spouseDateOfBirth ||
          !section3Obj.spouseContactNumber ||
          !section3Obj.spouseOccupation ||
          !section3Obj.spouseBusiness ||
          !section3Obj.spouseBusinessAddress ||
          !section3Obj.spouseMonthlyIncome ||
          !section3Obj.spouseEmploymentStatus ||
          !section3Obj.spouseLenghtService
        ) {
          alert(
            "Please fill in or select all required fields. Leave N/A if not applicable."
          );
        } else {
          setCurrentPage(currentPage + 1);
        }
      }
    }
    if (currentPage === 4) {
      if (
        !section4Obj.referenceNameP1 ||
        !section4Obj.referenceAddressP1 ||
        !section4Obj.referenceRelationP1 ||
        !section4Obj.referenceContactNumberP1 ||
        !section4Obj.heardFrom
      ) {
        alert(
          "Please fill in or select all required fields. Leave N/A if not applicable."
        );
      } else if (section1Obj.addOtherPerson === "personAdd") {
        if (
          !section4Obj.referenceNameP2 ||
          !section4Obj.referenceAddressP2 ||
          !section4Obj.referenceRelationP2 ||
          !section4Obj.referenceContactNumberP2
        ) {
          alert(
            "Please fill in or select all required fields. Leave N/A if not applicable."
          );
        } else {
          setCurrentPage(currentPage + 1);
        }
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
    if (currentPage == 5) {
      setConfirmationVisible(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (currentPage == 1) {
      navigation.navigate("Register");
    }
  };

  const handleConfirmSubmit = async () => {
    const userData = {
      ...section1Obj,
      ...section2Obj,
      ...section3Obj,
      ...section4Obj,
      fullName: section1Obj.firstName + " " + section1Obj.lastName,
      registerID,
      status: "Pending",
      tokenID: pushToken,
    };

    try {
      const docRef = doc(FIREBASE_DB, "memberRegister", registerID);
      await setDoc(docRef, userData);

      console.log("Data added to Firestore successfully!");
      navigation.navigate("RegisterCompleted"); // Navigate to the success screen
    } catch (error) {
      console.error("Error adding data to Firestore: ", error);
    }
    /*  console.log(registerID);
      console.log("Successul!");
      navigation.navigate("RegisterCompleted"); */
  };
  const handleCancelSubmit = () => {
    console.log("Cancelled!");
    setConfirmationVisible(false);
  };

  const renderSection = () => {
    switch (currentPage) {
      case 1:
        return (
          <Section1 section1Obj={section1Obj} setSection1Obj={setSection1Obj} />
        );
      case 2:
        return (
          <Section2 section2Obj={section2Obj} setSection2Obj={setSection2Obj} />
        );
      case 3:
        return (
          <Section3 section3Obj={section3Obj} setSection3Obj={setSection3Obj} />
        );
      case 4:
        return (
          <Section4 section4Obj={section4Obj} setSection4Obj={setSection4Obj} />
        );
      case 5:
        return (
          <Section5
            section1Obj={section1Obj}
            section2Obj={section2Obj}
            section3Obj={section3Obj}
            section4Obj={section4Obj}
          />
        );
      default:
        return null;
    }
  };

  // render circle for progress bar
  const renderCircles = () => {
    const circles = [];
    for (let i = 1; i <= 5; i++) {
      circles.push(
        <View
          key={i}
          style={[
            styles.circle,
            {
              backgroundColor: currentPage === i ? COLORS.primary : "lightgray",
            },
          ]}
        >
          {currentPage > i ? (
            // Render the checkmark for completed circles
            <Ionicons
              name="checkmark-sharp"
              size={18}
              color={COLORS.white}
              style={styles.customCheckIcon}
            />
          ) : (
            // Render the circle number for the current page
            <Text style={styles.circleText}>{i}</Text>
          )}
        </View>
      );
      if (i < 5) {
        circles.push(<View key={`line-${i}`} style={styles.line} />);
      }
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <View style={styles.customMargin}>
        <View style={styles.progressBar}>{renderCircles()}</View>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 40 }}>
          <View>{renderSection()}</View>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 40 }}>
        <View style={styles.sectionButtonContainer}>
          <Button
            title="Back"
            onPress={handlePrevPage}
            style={{ width: "50%" }}
          />
          {currentPage == 5 ? (
            <Button
              title="Submit"
              filled
              onPress={handleNextPage}
              style={{ width: "50%" }}
            />
          ) : (
            <Button
              title="Next"
              filled
              onPress={handleNextPage}
              style={{ width: "50%" }}
            />
          )}
        </View>
      </View>

      <ConfirmationModal
        isVisible={isConfirmationVisible}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />
    </View>
  );
}

export default SectionHandler;
