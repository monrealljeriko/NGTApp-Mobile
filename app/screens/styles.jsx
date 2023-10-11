import { StyleSheet } from "react-native";
import COLORS from "../component/Colors";

const styles = StyleSheet.create({
   // global styles
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
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
      fontSize: 16,
      fontFamily: "Poppins-Regular",
   },
   customSubtext: {
      textAlign: "center",
      fontSize: 14,
      fontFamily: "Poppins-Regular",
   },
   customSubtextData: {
      textAlign: "center",
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      textTransform: "uppercase",
   },
   customSubtextSmall: {
      textAlign: "justify",
      fontSize: 12,
      fontFamily: "Poppins-Regular",
   },
   buttonContainer: {
      marginTop: 50,
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
      paddingTop: 50,
      bottom: 50,
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
   },

   loginButton: {
      width: "45%",
      zIndex: 1,
   },
   registerButton: {
      bottom: "50%",
      paddingLeft: "40%",
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

   // Register section
   /* sectionContainer: {
      marginVertical: 20,
   }, */
   customMargin: {
      marginHorizontal: 40,
      marginTop: 40,
      marginBottom: 20,
   },
   progressBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   circle: {
      width: 25,
      height: 25,
      borderRadius: 15,
      backgroundColor: "lightgray",
      alignItems: "center",
      justifyContent: "center",
   },
   circleText: {
      fontSize: 15,
      color: "white",
   },
   customCheckIcon: {
      backgroundColor: COLORS.primary,
      borderRadius: 20,
      width: 20,
      height: 20,
      opacity: 0.8,
   },
   line: {
      width: 45,
      height: 3,
      backgroundColor: COLORS.grey,
   },
   sectionButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginVertical: 40,
      gap: 10,
   },

   // section inputs
   sectionSubText: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      color: COLORS.black,
      marginBottom: 10,
   },
   sectionSubtitle: {
      fontSize: 22,
      fontFamily: "Poppins-Bold",
      color: COLORS.primary,
   },
   sectionText: {
      fontSize: 18,
      fontFamily: "Poppins-Regular",
      color: COLORS.primary,
   },
   sectionInput: {
      height: 48,
      borderColor: COLORS.gray2,
      borderWidth: 1,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 22,
      fontFamily: "Poppins-Regular",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   sectionInputText: {
      width: "100%",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
   },
   customNumner: {
      width: "12%",
      borderRightWidth: 1,
      borderColor: COLORS.gray,
   },
   sectionInputContainer: {
      flexDirection: "row",
      width: "50%",
      gap: 10,
   },
   sectionOption: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.primary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
   },
   sectionOptionFill: {
      width: 12,
      height: 12,
      borderRadius: 5,
      backgroundColor: COLORS.primary,
   },
   customPicker: {
      height: 48,
      borderColor: COLORS.gray2,
      borderWidth: 1,
      borderRadius: 50,
      alignItems: "center",
      fontFamily: "Poppins-Regular",
   },
   sectionInputDropdown: {
      height: 48,
      borderColor: COLORS.gray2,
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: 5,
      fontFamily: "Poppins-Regular",
   },
   pickerItem: {
      color: COLORS.gray,
      fontFamily: "Poppins-Regular",
   },
   pickerItemFont: {
      fontFamily: "Poppins-Regular",
   },
   sectionSubtext: {
      fontSize: 14,
      fontFamily: "Poppins-Bold",
   },
   /*  customSubtext: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
   }, */
   sectionContainer: {
      flexDirection: "row",
      gap: 20,
   },

   // Section submit
   modalContainer: {
      backgroundColor: "white",
      marginHorizontal: 20,
      height: 140,
      borderRadius: 15,
   },
   modalHeader: {
      textAlign: "center",
      fontFamily: "Poppins-Regular",
      fontSize: 18,
   },
   modalContainer: {
      backgroundColor: "white",
      marginHorizontal: 20,
      height: 140,
      borderRadius: 15,
   },
   modalHeader: {
      textAlign: "center",
      fontFamily: "Poppins-Regular",
      fontSize: 18,
   },
   modalButton: {
      flexDirection: "row",
      justifyContent: "space-around",
   },
   /*  moodalCancel: {
      borderTopWidth: 1.5,
      paddingVertical: 10,
      borderBottomLeftRadius: 15,
      width: 165,
      alignItems: "center",
      borderTopColor: COLORS.white,
   }, */
   /*   modalConfirm: {
      paddingVertical: 10,
      borderBottomEndRadius: 15,
      width: 165,
      alignItems: "center",
      backgroundColor: COLORS.primary,
   }, */
   modalCancelText: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      color: "red",
   },
   modalConfirmText: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      color: COLORS.primary,
   },

   // submit
   submitTitle: {
      fontSize: 22,
      fontFamily: "Poppins-Regular",
      color: COLORS.primary,
      textAlign: "center",
   },
   submitText: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      textAlign: "center",
   },
});

export default styles;
