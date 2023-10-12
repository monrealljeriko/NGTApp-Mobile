import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../component/Colors";

function Section5({ section1Obj, section2Obj, section3Obj, section4Obj }) {
   const [showPersonalInfo, setShowPersonalInfo] = useState(true);
   const [showIndentification, setShowIndentification] = useState(false);
   const [showAddress, setShowAddress] = useState(false);
   const [showOther, setShowOther] = useState(false);
   const [showEmployment, setShowEmployment] = useState(false);
   const [showSpouseInfo, setShowSpouseInfo] = useState(false);
   const [showReference, setShowreference] = useState(false);

   const toggleInformation = (toggleNumber) => {
      if (toggleNumber === 0) {
         setShowPersonalInfo(!showPersonalInfo);
      }
      if (toggleNumber === 1) {
         setShowIndentification(!showIndentification);
      }
      if (toggleNumber === 2) {
         setShowAddress(!showAddress);
      }
      if (toggleNumber === 3) {
         setShowOther(!showOther);
      }
      if (toggleNumber === 4) {
         setShowEmployment(!showEmployment);
      }
      if (toggleNumber === 5) {
         setShowSpouseInfo(!showSpouseInfo);
      }
      if (toggleNumber === 6) {
         setShowreference(!showReference);
      }
   };

   return (
      <View>
         <Text style={styles.sectionText}>Review changes you have made</Text>
         <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionSubText}>
               Pleade double check for missing and incorrect informations
            </Text>
            <TouchableOpacity onPress={() => toggleInformation(0)}>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                     name={
                        showPersonalInfo == false
                           ? "chevron-down-outline"
                           : "chevron-up-outline"
                     }
                     size={20}
                     color={COLORS.primary}
                  />
                  <Text style={styles.sectionSubtext}>
                     Personal Information
                  </Text>
               </View>
            </TouchableOpacity>
            {showPersonalInfo && (
               <View style={{ marginLeft: 25 }}>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Last name :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.lastName == ""
                           ? "n/a"
                           : section1Obj.lastName}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>First name :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.firstName == ""
                           ? "n/a"
                           : section1Obj.firstName}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Middle name :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.middleName == ""
                           ? "n/a"
                           : section1Obj.middleName}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Place of birth :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.placeOfBirth == ""
                           ? "n/a"
                           : section1Obj.placeOfBirth}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Height :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.height == "" ? "n/a" : section1Obj.height}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Weight :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.weight == "" ? "n/a" : section1Obj.weight}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Highest completed education :
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text
                        style={[styles.customSubtextData, { paddingLeft: 40 }]}
                     >
                        {section1Obj.completedEducation == ""
                           ? "n/a"
                           : section1Obj.completedEducation}
                     </Text>
                  </View>
               </View>
            )}
         </View>

         <View style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleInformation(1)}>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                     name={
                        showIndentification == false
                           ? "chevron-down-outline"
                           : "chevron-up-outline"
                     }
                     size={20}
                     color={COLORS.primary}
                  />
                  <Text style={styles.sectionSubtext}>Identification</Text>
               </View>
            </TouchableOpacity>
            {showIndentification && (
               <View style={{ marginLeft: 25 }}>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Tax ID number :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.taxIDnumber == ""
                           ? "n/a"
                           : section1Obj.taxIDnumber}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>SSS ID number :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.sssIDnumber == ""
                           ? "n/a"
                           : section1Obj.sssIDnumber}
                     </Text>
                  </View>
                  {section1Obj.addOtherID == "otherID" && (
                     <View style={styles.sectionContainer}>
                        <Text style={styles.customSubtext}>Other ID :</Text>
                        <Text style={styles.customSubtextData}>
                           {section1Obj.otherIDname == ""
                              ? "n/a"
                              : section1Obj.otherIDname}
                        </Text>
                        <Text style={styles.customSubtextData}>
                           (
                           {section1Obj.otherIDnumber == ""
                              ? "n/a"
                              : section1Obj.otherIDnumber}
                           )
                        </Text>
                     </View>
                  )}
               </View>
            )}
         </View>
         <View style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleInformation(2)}>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                     name={
                        showAddress == false
                           ? "chevron-down-outline"
                           : "chevron-up-outline"
                     }
                     size={20}
                     color={COLORS.primary}
                  />
                  <Text style={styles.sectionSubtext}>Address</Text>
               </View>
            </TouchableOpacity>
            {showAddress && (
               <View style={{ marginLeft: 25 }}>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Present address :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.presentAddress == ""
                           ? "n/a"
                           : section1Obj.presentAddress}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Owner Type :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.addressType == ""
                           ? "n/a"
                           : section1Obj.addressType}
                     </Text>
                     {section1Obj.addressType == "Others" && (
                        <Text style={styles.customSubtextData}>
                           ({section1Obj.addressOtherType})
                        </Text>
                     )}
                  </View>

                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Length of time at present address :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.lengthOfTime == ""
                           ? "n/a"
                           : section1Obj.lengthOfTime}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Email address :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.emailAddress == ""
                           ? "n/a"
                           : section1Obj.emailAddress}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Contact number :</Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.contactNumber == ""
                           ? "n/a"
                           : section1Obj.contactNumber}
                     </Text>
                  </View>
               </View>
            )}
         </View>
         <View style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleInformation(3)}>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                     name={
                        showOther == false
                           ? "chevron-down-outline"
                           : "chevron-up-outline"
                     }
                     size={20}
                     color={COLORS.primary}
                  />
                  <Text style={styles.sectionSubtext}>Other</Text>
               </View>
            </TouchableOpacity>
            {showOther && (
               <View style={{ marginLeft: 25 }}>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Do you owned a vehicle? :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section1Obj.vehicleSelect == ""
                           ? "n/a"
                           : section1Obj.vehicleSelect}
                     </Text>
                  </View>

                  {section1Obj.vehicleSelect == "Yes" && (
                     <View>
                        <View style={styles.sectionContainer}>
                           <Text style={styles.customSubtext}>
                              Vehicle Type :
                           </Text>
                           <Text style={styles.customSubtextData}>
                              {section1Obj.vehicleType == ""
                                 ? "n/a"
                                 : section1Obj.vehicleType}
                           </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                           <Text style={styles.customSubtext}>
                              Plate Number :
                           </Text>
                           <Text style={styles.customSubtextData}>
                              {section1Obj.vehiclePlateNumber == ""
                                 ? "n/a"
                                 : section1Obj.vehiclePlateNumber}
                           </Text>
                        </View>
                     </View>
                  )}
               </View>
            )}
         </View>
         <View style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleInformation(4)}>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                     name={
                        showEmployment == false
                           ? "chevron-down-outline"
                           : "chevron-up-outline"
                     }
                     size={20}
                     color={COLORS.primary}
                  />
                  <Text style={styles.sectionSubtext}>
                     Employment or Business Information
                  </Text>
               </View>
            </TouchableOpacity>
            {showEmployment && (
               <View style={{ marginLeft: 25 }}>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Occupation :</Text>
                     <Text style={styles.customSubtextData}>
                        {section2Obj.occupation == ""
                           ? "n/a"
                           : section2Obj.occupation}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Length of Service :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section2Obj.lengthOfService == ""
                           ? "n/a"
                           : section2Obj.lengthOfService}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Employer or Business Name :
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text
                        style={[styles.customSubtextData, { paddingLeft: 40 }]}
                     >
                        {section2Obj.bussinessName == ""
                           ? "n/a"
                           : section2Obj.bussinessName}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Employer or Business Address :
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text
                        style={[styles.customSubtextData, { paddingLeft: 40 }]}
                     >
                        {section2Obj.businessAddress == ""
                           ? "n/a"
                           : section2Obj.businessAddress}
                     </Text>
                  </View>

                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Contact Number:</Text>
                     <Text style={styles.customSubtextData}>
                        {section2Obj.businessContactNumber == ""
                           ? "n/a"
                           : section2Obj.businessContactNumber}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text
                        style={[styles.customSubtext, { textAlign: "left" }]}
                     >
                        Monthly Income :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section2Obj.monthltIncome == ""
                           ? "n/a"
                           : section2Obj.monthltIncome}
                     </Text>
                  </View>

                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Employment Status :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section2Obj.employmentStatus == ""
                           ? "n/a"
                           : section2Obj.employmentStatus}
                     </Text>
                  </View>
               </View>
            )}
         </View>
         <View style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleInformation(5)}>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                     name={
                        showSpouseInfo == false
                           ? "chevron-down-outline"
                           : "chevron-up-outline"
                     }
                     size={20}
                     color={COLORS.primary}
                  />
                  <Text style={styles.sectionSubtext}>
                     Spouse's Information
                  </Text>
               </View>
            </TouchableOpacity>
            {showSpouseInfo && (
               <View style={{ marginLeft: 25 }}>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Last Name :</Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseLastName == ""
                           ? "n/a"
                           : section3Obj.spouseLastName}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>First Name :</Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseFirstName == ""
                           ? "n/a"
                           : section3Obj.spouseFirstName}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Middle name :</Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseMiddleName == ""
                           ? "n/a"
                           : section3Obj.spouseMiddleName}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Date of Birth :</Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseDateOfBirth == ""
                           ? "n/a"
                           : section3Obj.spouseDateOfBirth}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Contact Number:</Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseContactNumber == ""
                           ? "n/a"
                           : section3Obj.spouseContactNumber}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Occupation :</Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseOccupation == ""
                           ? "n/a"
                           : section3Obj.spouseOccupation}
                     </Text>
                  </View>
                  <View style={[styles.sectionContainer, { marginTop: 18 }]}>
                     <Text
                        style={[styles.sectionSubtext, { fontStyle: "italic" }]}
                     >
                        Work
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Employer or Business :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseBusiness == ""
                           ? "n/a"
                           : section3Obj.spouseBusiness}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Business or Employer's Address :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseBusinessAddress == ""
                           ? "n/a"
                           : section3Obj.spouseBusinessAddress}
                     </Text>
                  </View>

                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Monthly Income (In Peso) :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseMonthlyIncome == ""
                           ? "n/a"
                           : section3Obj.spouseMonthlyIncome}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Employment Status :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseEmploymentStatus == ""
                           ? "n/a"
                           : section3Obj.spouseEmploymentStatus}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>
                        Length of Service :
                     </Text>
                     <Text style={styles.customSubtextData}>
                        {section3Obj.spouseLenghtService == ""
                           ? "n/a"
                           : section3Obj.spouseLenghtService}
                     </Text>
                  </View>
               </View>
            )}
         </View>
         <View style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleInformation(6)}>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                     name={
                        showReference == false
                           ? "chevron-down-outline"
                           : "chevron-up-outline"
                     }
                     size={20}
                     color={COLORS.primary}
                  />
                  <Text style={styles.sectionSubtext}>References</Text>
               </View>
            </TouchableOpacity>
            {showReference && (
               <View style={{ marginLeft: 25 }}>
                  <Text
                     style={[styles.sectionSubtext, { fontStyle: "italic" }]}
                  >
                     Person 1
                  </Text>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Name :</Text>
                     <Text style={styles.customSubtextData}>
                        {section4Obj.referenceNameP1 == ""
                           ? "n/a"
                           : section4Obj.referenceNameP1}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Address :</Text>
                     <Text style={styles.customSubtextData}>
                        {section4Obj.referenceAddressP1 == ""
                           ? "n/a"
                           : section4Obj.referenceAddressP1}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Relation :</Text>
                     <Text style={styles.customSubtextData}>
                        {section4Obj.referenceRelationP1 == ""
                           ? "n/a"
                           : section4Obj.referenceRelationP1}
                     </Text>
                  </View>
                  <View style={styles.sectionContainer}>
                     <Text style={styles.customSubtext}>Contact Number :</Text>
                     <Text style={styles.customSubtextData}>
                        {section4Obj.referenceContactNumberP1 == ""
                           ? "n/a"
                           : section4Obj.referenceContactNumberP1}
                     </Text>
                  </View>

                  {section4Obj.addOtherPerson == "personAdd" && (
                     <View style={{ marginTop: 18 }}>
                        <Text
                           style={[
                              styles.sectionSubtext,
                              { fontStyle: "italic" },
                           ]}
                        >
                           Person 2
                        </Text>
                        <View style={styles.sectionContainer}>
                           <Text style={styles.customSubtext}>Name :</Text>
                           <Text style={styles.customSubtextData}>
                              {section4Obj.referenceNameP2 == ""
                                 ? "n/a"
                                 : section4Obj.referenceNameP2}
                           </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                           <Text style={styles.customSubtext}>Address :</Text>
                           <Text style={styles.customSubtextData}>
                              {section4Obj.referenceAddressP2 == ""
                                 ? "n/a"
                                 : section4Obj.referenceAddressP2}
                           </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                           <Text style={styles.customSubtext}>Relation :</Text>
                           <Text style={styles.customSubtextData}>
                              {section4Obj.referenceRelationP2 == ""
                                 ? "n/a"
                                 : section4Obj.referenceRelationP2}
                           </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                           <Text style={styles.customSubtext}>
                              Contact Number :
                           </Text>
                           <Text style={styles.customSubtextData}>
                              {section4Obj.referenceContactNumberP2 == ""
                                 ? "n/a"
                                 : section4Obj.referenceContactNumberP2}
                           </Text>
                        </View>
                     </View>
                  )}
                  <View style={[styles.sectionContainer, { marginTop: 18 }]}>
                     <Text
                        style={[styles.customSubtext, { textAlign: "left" }]}
                     >
                        Heard from :
                     </Text>
                     <Text style={[styles.customSubtextData, ,]}>
                        {section4Obj.heardFrom == ""
                           ? "n/a"
                           : section4Obj.heardFrom}
                     </Text>
                     <Text style={[styles.customSubtextData]}>
                        {section4Obj.heardFrom == "others" &&
                           section4Obj.others}
                     </Text>
                     <Text style={[styles.customSubtextData]}>
                        {section4Obj.heardFrom == "referred" &&
                           section4Obj.referredBy}
                     </Text>
                  </View>
               </View>
            )}
         </View>
      </View>
   );
}

export default Section5;
