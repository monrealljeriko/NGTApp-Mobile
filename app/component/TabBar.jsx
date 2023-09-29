import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "./Colors";
function TabBar({ state, descriptors, navigation }) {
   const [showLabels, setShowLabels] = useState(true);

   const toggleLabels = () => {
      setShowLabels(!showLabels);
   };

   return (
      <View
         style={{
            flexDirection: "row",
            height: 60,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            paddingHorizontal: 15,
         }}
      >
         {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const iconSize = isFocused ? 26 : 20;

            const showLabel = showLabels && options.tabBarLabel;

            return (
               <TouchableOpacity
                  key={route.key}
                  onPress={() => {
                     const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                     });

                     if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                     }
                  }}
                  style={{
                     flex: 1,
                     fontFamily: "Poppins-Regular",
                     justifyContent: "center",
                     flexDirection: "row",
                     alignItems: "center",
                     gap: 8,
                  }}
               >
                  <Ionicons
                     name={
                        isFocused
                           ? options.tabBarIconName
                           : options.tabBarIconName + "-outline"
                     }
                     size={iconSize}
                     color={isFocused ? "white" : "white"}
                  />
                  {showLabel && (
                     <Text
                        style={{
                           color: isFocused ? "white" : "white",
                           fontFamily: "Poppins-Regular",
                           marginTop: 5,
                           fontSize: 16,
                        }}
                     >
                        {isFocused ? options.tabBarLabel : null}
                     </Text>
                  )}
               </TouchableOpacity>
            );
         })}
      </View>
   );
}

export default TabBar;
