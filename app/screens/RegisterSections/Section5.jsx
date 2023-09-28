import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "../../styles";
import COLORS from "../../component/Colors";

export default function Section5() {
   return (
      <View>
         <Text style={styles.sectionText}>Review changes you have made</Text>
         <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionSubText}>
               Pleade double check for missing and incorrect informations
            </Text>
            <Text style={styles.sectionSubtext}>Personal Information</Text>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Last name :</Text>
               <Text style={styles.customSubtext}>lastName</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>First name :</Text>
               <Text style={styles.customSubtext}>firstName</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Middle name :</Text>
               <Text style={styles.customSubtext}>lastName</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Place of birth :</Text>
               <Text style={styles.customSubtext}>placeOfBirth</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Height :</Text>
               <Text style={styles.customSubtext}>height</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Weight :</Text>
               <Text style={styles.customSubtext}>weight</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>
                  Highest completed education :
               </Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={[styles.customSubtext, { paddingLeft: 40 }]}>
                  highestCompletedEducation
               </Text>
            </View>
         </View>

         <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionSubtext}>Identificationn</Text>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Tax ID number :</Text>
               <Text style={styles.customSubtext}>taxNumber</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>SSS ID number :</Text>
               <Text style={styles.customSubtext}>sssNumber</Text>
            </View>
         </View>
         <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionSubtext}>Address</Text>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Present address :</Text>
               <Text style={styles.customSubtext}>presentAddress</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Owner Type :</Text>
               <Text style={styles.customSubtext}>ownerType</Text>
            </View>

            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>
                  Length of time at present address :
               </Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={[styles.customSubtext, { marginLeft: 40 }]}>
                  lengthTime
               </Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Email address :</Text>
               <Text style={styles.customSubtext}>emailAddress</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>Contact number :</Text>
               <Text style={styles.customSubtext}>contactNumber</Text>
            </View>
            <View style={styles.sectionContainer}>
               <Text style={styles.customSubtext}>
                  Do you owned a vehicle? :
               </Text>
               <Text style={styles.customSubtext}>ownedVehicle</Text>
            </View>
         </View>
      </View>
   );
}
