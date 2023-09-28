import { StyleSheet } from "react-native";
import COLORS from "./component/Colors";

const styles = StyleSheet.create({
   // global styles
   container: {
      flex: 1,
      backgroundColor: "transparent",
   },
   customTitle: {
      textAlign: "center",
      fontSize: 45,
      fontFamily: "Poppins-Bold",
      color: COLORS.secondary,
   },
   customSubtitle: {
      textAlign: "center",
      fontSize: 22,
      fontFamily: "Poppins-Bold",
      color: COLORS.primary,
   },
   customText: {
      textAlign: "center",
      fontSize: 18,
      fontFamily: "Poppins-Regular",
   },
   customSubtext: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
   },
   customSubtextSmall: {
      textAlign: "justify",
      fontSize: 12,
      fontFamily: "Poppins-Regular",
   },
   buttonContainer: {
      marginVertical: 50,
   },
   contentContainer: {
      flex: 1,
      marginHorizontal: 40,
      marginVertical: 40,
   },
   pressableText: {
      color: COLORS.tertiary,
      fontSize: 14,
      fontFamily: "Poppins-Regular",
   },

   // Welcome styles
   whiteContainer: {
      paddingHorizontal: 30,
      position: "absolute",
      paddingTop: 70,
      top: 360,
      width: "100%",
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
   },

   loginButton: {
      width: "45%",
      zIndex: 1,
   },
   registerButton: {
      bottom: "50%",
      paddingLeft: 145,
   },

   // Login styles
   customInput: {
      width: "100%",
      height: 48,
      borderColor: COLORS.gray2,
      borderBottomWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
   },
   customIcon: {
      color: COLORS.primary,
      fontSize: 18,
      marginHorizontal: 15,
      paddingBottom: 2,
      paddingLeft: 20,
   },
   options: {
      flexDirection: "row",
      marginVertical: 20,
      justifyContent: "space-between",
      gap: 8,
   },
   checkBoxRemember: {
      width: 16,
      height: 16,
      top: 2,
   },

   // Register styles
   customSubtitleTC: {
      textAlign: "left",
      fontSize: 22,
      fontFamily: "Poppins-Regular",
      color: COLORS.primary,
   },
   customSubtextTC: {
      textAlign: "left",
      fontSize: 14,
      fontFamily: "Poppins-Bold",
   },
   customTextTC: {
      textAlign: "left",
      fontSize: 18,
      fontFamily: "Poppins-Regular",
   },
   requirements: {
      marginVertical: 20,
      gap: 10,
      alignItems: "flex-start",
   },

   acceptTC: {
      flexDirection: "row",
      marginVertical: 8,
   },
});

export default styles;
