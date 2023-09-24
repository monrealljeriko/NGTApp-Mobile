import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../styles";

function Register({ navigation }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Section1")}>
                <Text
                    style={{
                        fontSize: 14,
                        marginLeft: 6,
                    }}
                >
                    Next
                </Text>
            </Pressable>
            <Text style={{ fontSize: 40 }}>Resgister</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
                <Text
                    style={{
                        fontSize: 14,
                        marginLeft: 6,
                    }}
                >
                    Login
                </Text>
            </Pressable>
        </View>
    );
}

export default Register;
