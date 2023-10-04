import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../component/Colors";

function Notification() {
   return (
      <View style={styles.container}>
         <View style={styles.cardHeaderLabel}>
            <Text style={styles.cardLabelText}>Today</Text>
         </View>

         <View style={styles.cardItem}>
            <View style={styles.contentWrapper}>
               <Text style={styles.cardText}>
                  You have paid your daily payment 155 for you loan ID-00000.
               </Text>
               <Text style={[styles.cardText, { alignSelf: "flex-end" }]}>
                  9:20
               </Text>
            </View>
         </View>
         <View style={styles.cardItem}>
            <View style={styles.contentWrapper}>
               <Text style={styles.cardText}>
                  Congratulations! Your loan ammount 5000 have been approved.
               </Text>
               <Text style={[styles.cardText, { alignSelf: "flex-end" }]}>
                  9:20
               </Text>
            </View>
         </View>
         <View style={styles.cardHeaderLabel}>
            <Text style={styles.cardLabelText}>Yesterday</Text>
         </View>
         <View style={styles.cardItem}>
            <View style={styles.contentWrapper}>
               <Text style={styles.cardText}>
                  Your request has been submitted successfully. You will
                  notified soon.
               </Text>
               <Text style={[styles.cardText, { alignSelf: "flex-end" }]}>
                  9:20
               </Text>
            </View>
         </View>
      </View>
   );
}

export default Notification;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
      marginHorizontal: 20,
      marginVertical: 20,
   },
   cardItem: {
      width: "100%",
      borderRadius: 15,
      height: 90,
      padding: 15,
      marginBottom: 10,
      backgroundColor: "white",
      elevation: 5,
   },

   cardLabelText: {
      fontSize: 14,
      fontFamily: "Poppins-SemiBold",
      marginBottom: 10,
   },
   cardText: {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
   },
   contentWrapper: {
      marginHorizontal: 10,
   },
   cardHeaderLabel: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
   },
});
