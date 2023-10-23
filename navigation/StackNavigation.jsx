import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
   Start,
   Login,
   Register,
   SectionHandler,
   RegisterCompleted,
   Profile,
   Notification,
   Apply,
   RequestCompleted,
} from "../app/index";
import TabNavigation from "./TabNavigation";
import COLORS from "../app/component/Colors";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

const Stack = createNativeStackNavigator();

function StackNavigation() {
   const [user, setUser] = useState(null);

   useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
         if (user) {
            console.log("user", user.uid);
         }
         setUser(user);
      });
   }, []);

   return (
      <Stack.Navigator
         initialRouteName="Start"
         screenOptions={{ headerShown: false }}
      >
         {user ? (
            <>
               <Stack.Screen name="TabNavigation" component={TabNavigation} />
               <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                     headerShown: true,
                     headerTransparent: true,
                     title: null,
                     headerTintColor: "white",
                  }}
               />
               <Stack.Screen
                  name="Notification"
                  component={Notification}
                  options={{
                     headerShown: true,
                     title: "Notification",
                     headerTintColor: COLORS.primary,
                  }}
               />
               <Stack.Screen
                  name="Apply"
                  component={Apply}
                  initialParams={{ userUid: user ? user.uid : null }}
                  options={{
                     headerShown: true,
                     title: "Apply Loan",
                     headerTintColor: COLORS.primary,
                  }}
               />

               <Stack.Screen
                  name="RequestCompleted"
                  component={RequestCompleted}
               />
            </>
         ) : (
            <>
               <Stack.Screen name="Start" component={Start} />
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
               <Stack.Screen
                  name="SectionHandler"
                  component={SectionHandler}
                  options={{
                     headerShown: true,
                     title: "Membership form",
                     headerTintColor: "#57708C",
                  }}
               />
               <Stack.Screen
                  name="RegisterCompleted"
                  component={RegisterCompleted}
               />
            </>
         )}
      </Stack.Navigator>
   );
}
export default StackNavigation;
