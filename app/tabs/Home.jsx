import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../styles";

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>Home Tab</Text>
            <Pressable onPress={() => navigation.navigate("Welcome")}>
                <Text
                    style={{
                        fontSize: 14,
                        marginLeft: 6,
                    }}
                >
                    Logout
                </Text>
            </Pressable>
        </View>
    );
}
export default Home;
