import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigation/StackNavigation";
import { useFonts } from "expo-font";

export default function App() {
   const [fontsLoaded] = useFonts({
      "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
   });

   if (!fontsLoaded) {
      return null;
   }
   return (
      <NavigationContainer>
         <StackNavigation />
      </NavigationContainer>
   );
}
