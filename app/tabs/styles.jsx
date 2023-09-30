import { StyleSheet } from "react-native";
import COLORS from "../component/Colors";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
      marginTop: 40,
      paddingTop: 10,
   },

   // Home styles
   headerContainer: {
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 40,
      borderStartColor: "red",
      height: 80,
   },
   headerProfile: { flexDirection: "row", alignItems: "center", gap: 10 },
   headerImage: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderColor: COLORS.primary,
      borderRadius: 50,
   },
   headerName: {
      fontFamily: "Poppins-Regular",
      fontSize: 18,
   },
   loanDetailsContainer: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 40,
      paddingVertical: 20,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
   },
   loanTitle: {
      fontFamily: "Poppins-Regular",
      color: COLORS.white,
      fontSize: 20,
   },
   loanBalance: {
      fontFamily: "Poppins-SemiBold",
      letterSpacing: 2,
      color: COLORS.white,
      fontSize: 32,
   },
   payableLoan: {
      fontFamily: "Poppins-Regular",
      color: COLORS.white,
      fontSize: 14,
      bottom: 15,
   },

   loanCardContainer: {
      paddingHorizontal: 40,
      paddingVertical: 20,
      flex: 1,
      gap: 15,
   },
   loanCardItem: {
      borderRadius: 15,
      backgroundColor: "white",
      height: 125,
      padding: 20,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: COLORS.primary,
      opacity: 0.7,
   },
   cardHeaderLabel: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
   },
   cardLabelText: {
      fontSize: 14,
      fontFamily: "Poppins-SemiBold",
   },
   cartTitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 22,
   },
   cartText: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
   },
   cardTextWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      alignItems: "center",
   },
   cardLine: {
      borderBottomWidth: 2,
      borderColor: COLORS.gray2,
      opacity: 0.5,
      marginVertical: 10,
   },
});

export default styles;
