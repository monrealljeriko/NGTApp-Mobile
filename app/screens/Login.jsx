import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../styles";

function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("TabNavigation")}>
                <Text
                    style={{
                        fontSize: 14,
                        marginLeft: 6,
                    }}
                >
                    Home
                </Text>
            </Pressable>
            <Text style={{ fontSize: 40 }}>Login</Text>
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

export default Login;
