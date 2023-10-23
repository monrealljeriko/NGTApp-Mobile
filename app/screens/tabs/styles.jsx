import { StyleSheet } from "react-native";
import COLORS from "../../component/Colors";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },

   // Home styles
   headerContainer: {
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 40,
      paddingTop: 40,
      height: 120,
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
      justifyContent: "space-around",
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
   },

   loanCardContainer: {
      paddingHorizontal: 40,
      paddingVertical: 20,
      flex: 1,
      gap: 15,
   },
   loanCardItem: {
      borderRadius: 15,
      height: 125,
      padding: 20,
      marginBottom: 10,
      backgroundColor: "white",
      elevation: 5,
   },
   cardHeaderLabel: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
   },

   //

   detailsContainer: {
      backgroundColor: "white",
      elevation: 5,
      margin: 10,
      borderRadius: 15,
      flex: 1,
      paddingBottom: 20,
   },
   detailsTitle: {
      fontSize: 16,
      fontFamily: "Poppins-Regular",
      textAlign: "center",
      marginTop: 15,
      marginBottom: 10,
   },
   detailsHeaderLabel: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: COLORS.white,
      paddingVertical: 10,
      marginVertical: 10,
   },
   detailsList: {
      flexDirection: "row",
      justifyContent: "space-around",
   },
   detailsLabel: {
      fontFamily: "Poppins-Regular",
      alignSelf: "flex-end",
      fontSize: 16,
   },

   breakdownLine: {
      borderBottomWidth: 2,
      borderColor: COLORS.gray2,
      opacity: 0.5,
   },
   detailsItem: {
      fontFamily: "Poppins-Regular",
      marginVertical: 2,
      fontSize: 16,
   },

   cardLabelText: {
      fontSize: 14,
      fontFamily: "Poppins-SemiBold",
   },
   cartTitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 22,
   },
   cardText: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
   },
   cardTextTouchable: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      color: COLORS.tertiary,
      borderColor: COLORS.tertiary,
   },
   cardTextWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      alignItems: "center",
   },
   cardLine: {
      borderBottomWidth: 1,
      borderColor: COLORS.gray2,
      opacity: 0.5,
      marginVertical: 10,
   },

   dividerLine: {
      borderBottomWidth: 1,
      borderColor: COLORS.gray2,
      opacity: 0.2,
      marginVertical: 10,
   },

   // Loan styles
   headerTitle: {
      fontFamily: "Poppins-SemiBold",
      letterSpacing: 2,
      color: COLORS.primary,
      fontSize: 24,
   },

   appliedTextWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginVertical: 5,
      alignItems: "center",
   },
   appliedCardItem: {
      borderRadius: 15,
      height: 200,
      padding: 20,
      marginBottom: 10,
      backgroundColor: "white",
      elevation: 5,
   },
   cardHeaderLabel: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
   },

   // segment
   segmentControl: {
      height: 50,
      borderBlockColor: COLORS.gray2,
      flexDirection: "row",
   },
   customTouchable: {
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 2,
   },
   touchableText: {
      fontSize: 16,
      color: COLORS.primary,
      fontFamily: "Poppins-Regular",
   },

   // Credit performance
   headerContainerCredit: {
      backgroundColor: COLORS.primary,
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 40,
      paddingTop: 40,
      height: 120,
   },
   headerTitleCredit: {
      fontFamily: "Poppins-SemiBold",
      letterSpacing: 2,
      color: COLORS.white,
      fontSize: 24,
   },
   creditTitle: {
      fontFamily: "Poppins-Regular",
      color: COLORS.primary,
      fontSize: 22,
   },
   creditBalance: {
      fontFamily: "Poppins-SemiBold",
      letterSpacing: 2,
      color: COLORS.primary,
      fontSize: 40,
   },
   creditContainer: {
      paddingVertical: 20,
      justifyContent: "center",
      backgroundColor: "white",
      marginHorizontal: 20,
      marginVertical: 15,
      borderRadius: 15,
      elevation: 5,
      flex: 1,
   },
   creditCircle: {
      marginVertical: 10,
      borderWidth: 8,
      justifyContent: "center",
      alignSelf: "center",
      height: 180,
      width: 180,
      borderRadius: 100,
      borderColor: COLORS.primary,
   },

   //history
   historyContainer: {
      backgroundColor: "white",
      elevation: 5,
      margin: 10,
      borderRadius: 15,
      flex: 1,
      paddingBottom: 20,
   },
   historyTitle: {
      fontSize: 16,
      fontFamily: "Poppins-Regular",
      textAlign: "center",
      marginTop: 15,
      marginBottom: 10,
   },
   historyHeaderLabel: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: COLORS.white,
      paddingVertical: 10,
      marginBottom: 10,
   },
   historyList: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
   },
   historyLabel: {
      fontFamily: "Poppins-Regular",
      alignSelf: "flex-end",
      fontSize: 12,
   },
   historyItem: {
      fontFamily: "Poppins-Regular",
      alignSelf: "center",
      marginVertical: 2,
      fontSize: 12,
   },
});

export default styles;
