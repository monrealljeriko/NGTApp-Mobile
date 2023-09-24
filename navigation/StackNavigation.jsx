import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Welcome,
    Login,
    Register,
    Section1,
    Section2,
    Section3,
    Section4,
} from "../app/index";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
            <Stack.Screen name="Section1" component={Section1} />
            <Stack.Screen name="Section2" component={Section2} />
            <Stack.Screen name="Section3" component={Section3} />
            <Stack.Screen name="Section4" component={Section4} />
        </Stack.Navigator>
    );
}
export default StackNavigation;
