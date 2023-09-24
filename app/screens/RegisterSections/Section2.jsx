import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../../styles";

function Section2({ navigation }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Section3")}>
                <Text
                    style={{
                        fontSize: 14,
                        marginLeft: 6,
                    }}
                >
                    Next
                </Text>
            </Pressable>
            <Text style={{ fontSize: 40 }}>Section2</Text>
            <Pressable onPress={() => navigation.goBack()}>
                <Text
                    style={{
                        fontSize: 14,
                        marginLeft: 6,
                    }}
                >
                    Back
                </Text>
            </Pressable>
        </View>
    );
}

export default Section2;
