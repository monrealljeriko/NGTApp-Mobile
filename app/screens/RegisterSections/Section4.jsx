import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../../styles";

function Section4({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>Section4</Text>
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

export default Section4;
