import {
   Start,
   Login,
   Register,
   SectionHandler,
   RegisterCompleted,
   Profile,
   Notification,
   Apply,
   AnswerSurvey,
   RequestCompleted,
   FeedbackCompleted,
} from "../app/index";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import COLORS from "../app/component/Colors";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { FIREBASE_DB } from "../firebaseConfig";

const Stack = createNativeStackNavigator();

function StackNavigation() {
   const [user, setUser] = useState(null);

   useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, async (user) => {
         if (user) {
            console.log("user:", user.uid);

            // Get or create the user's data in Firestore
            const userUid = user.uid;
            const userDataRef = doc(FIREBASE_DB, "borrowers", userUid);
            const userDataSnapshot = await getDoc(userDataRef);

            if (!userDataSnapshot.exists()) {
               // If the user data doesn't exist, create it with initial values
               const initialUserData = {
                  totalLoans: 0,
                  loanCount: 0,
               };
               await setDoc(userDataRef, initialUserData);
            }
            setUser(user);
         } else {
            setUser(null);
            console.log("user:", user);
         }
      });
   }, []);

   return (
      <Stack.Navigator
         initialRouteName="Start"
         screenOptions={{ headerShown: false }}
      >
         {user ? (
            <>
               <Stack.Screen name="TabNavigation">
                  {() => <TabNavigation userUid={user.uid} />}
               </Stack.Screen>
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
                  initialParams={{ userUid: user.uid }}
                  options={{
                     headerShown: true,
                     title: "Apply Loan",
                     headerTintColor: COLORS.primary,
                  }}
               />
               <Stack.Screen
                  name="AnswerSurvey"
                  component={AnswerSurvey}
                  initialParams={{ userUid: user.uid }}
                  options={{
                     headerShown: true,
                     title: "Customer Feedback",
                     headerTintColor: COLORS.primary,
                  }}
               />

               <Stack.Screen
                  name="RequestCompleted"
                  component={RequestCompleted}
               />
               <Stack.Screen
                  name="FeedbackCompleted"
                  component={FeedbackCompleted}
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
