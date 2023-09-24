import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../styles";

function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>Welcome</Text>
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
            <Pressable onPress={() => navigation.navigate("Register")}>
                <Text
                    style={{
                        fontSize: 14,
                        marginLeft: 6,
                    }}
                >
                    Register
                </Text>
            </Pressable>
        </View>
    );
}

export default Welcome;
