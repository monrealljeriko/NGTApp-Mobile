import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
   Welcome,
   Login,
   Register,
   SectionHandler,
   RegisterCompleted,
} from "../app/index";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();

function StackNavigation() {
   return (
      <Stack.Navigator
         initialRouteName="Welcome"
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen name="Welcome" component={Welcome} />
         <Stack.Screen
            name="Login"
            component={Login}
            options={{
               headerShown: true,
               headerTransparent: true,
               title: null,
               headerTintColor: "white",
            }}
         />
         <Stack.Screen
            name="Register"
            component={Register}
            options={{
               headerShown: true,
               headerTransparent: true,
               title: null,
               headerTintColor: "white",
            }}
         />
         <Stack.Screen name="TabNavigation" component={TabNavigation} />
         <Stack.Screen
            name="SectionHandler"
            component={SectionHandler}
            options={{
               headerShown: true,
               title: "Membership form",
               headerTintColor: "#57708C",
            }}
         />
         <Stack.Screen name="RegisterCompleted" component={RegisterCompleted} />
      </Stack.Navigator>
   );
}
export default StackNavigation;
