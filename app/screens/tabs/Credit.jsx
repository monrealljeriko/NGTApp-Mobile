import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import COLORS from "../../component/Colors";
import { RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_DB } from "../../../firebaseConfig";

function Credit({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [creditScore, setCreditScore] = useState(0);
  const [shreCapital, setShareCapital] = useState(0);
  const [credistHistory, setCreditsHistory] = useState();
  const [capitalHistory, setCapitalHistory] = useState();

  const { userUid } = route.params; // Access the userUid parameter from the route

  useEffect(() => {
    fetchLoanData();
  }, []);

  // update date on refresh
  const onRefresh = async () => {
    setRefreshing(true);
    fetchLoanData();
  };
  // Fetch totalLoans data from firestore database
  // Fetch totalLoans data from Firestore database
  const fetchLoanData = async () => {
    if (userUid) {
      const borrowerUid = userUid;
      const borrowerRef = doc(FIREBASE_DB, "borrowers", borrowerUid);

      try {
        const borrowerSnapshot = await getDoc(borrowerRef);
        if (borrowerSnapshot.exists()) {
          const borrowData = borrowerSnapshot.data();
          setCreditScore(borrowData.creditScore);
          setShareCapital(borrowData.shareCapital);

          // Check if shareCapitalHistory exists in the data
          if (borrowData.shareCapitalHistory) {
            // Do something with shareCapitalHistory, e.g., set it in your state
            setCapitalHistory(borrowData.shareCapitalHistory);
          }

          // Check if creditScoreHistory exists in the data
          if (borrowData.creditScoreHistory) {
            // Do something with creditScoreHistory, e.g., set it in your state
            setCreditsHistory(borrowData.creditScoreHistory);
          }
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    }
    setLoading(false);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerCredit}>
        <Text style={styles.headerTitleCredit}>Performance</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AboutCredit")}>
          <Ionicons name="information-circle" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.segmentControl}>
        <TouchableOpacity
          style={[
            styles.customTouchable,
            {
              borderColor: selectedTab == 0 ? "#08a391" : COLORS.gray2,
            },
          ]}
          onPress={() => {
            setSelectedTab(0), onRefresh();
          }}
        >
          <Text
            style={[
              styles.touchableText,
              {
                color: selectedTab == 0 ? "#08a391" : COLORS.primary,
              },
            ]}
          >
            Credit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.customTouchable,
            {
              borderColor: selectedTab == 1 ? "#08a391" : COLORS.gray2,
            },
          ]}
          onPress={() => {
            setSelectedTab(1), onRefresh();
          }}
        >
          <Text
            style={[
              styles.touchableText,
              {
                color: selectedTab == 1 ? "#08a391" : COLORS.primary,
              },
            ]}
          >
            Shares
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab == 0 ? (
        <>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{ marginVertical: 20 }}
            />
          ) : (
            <View style={styles.creditContainer}>
              <Text style={[styles.creditTitle, { textAlign: "center" }]}>
                Available Score
              </Text>
              <View style={styles.creditCircle}>
                <Text style={[styles.creditBalance, { textAlign: "center" }]}>
                  {creditScore}
                </Text>
              </View>
              <View style={styles.detailsHeaderLabel}>
                <Text style={styles.detailsLabel}>Summary</Text>
                <Text style={[styles.detailsLabel, { right: 12 }]}>Date</Text>
              </View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                {credistHistory.map((item, index) => (
                  <View style={styles.detailsList}>
                    <>
                      <View
                        key={index}
                        style={{ flexDirection: "row", gap: 5 }}
                      >
                        <Ionicons
                          name="arrow-up"
                          size={18}
                          color="lightgreen"
                          style={{ top: 3 }}
                        />
                        <Text style={styles.detailsItem}>{item.amount}</Text>
                      </View>
                      <Text style={[styles.detailsItem]}> {item.date}</Text>
                    </>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </>
      ) : (
        <View style={styles.creditContainer}>
          <Text style={[styles.creditTitle, { textAlign: "center" }]}>
            Total Share
          </Text>
          <View style={styles.creditCircle}>
            <Text style={[styles.creditBalance, { textAlign: "center" }]}>
              {shreCapital}
            </Text>
          </View>
          <View style={styles.detailsHeaderLabel}>
            <Text style={styles.detailsLabel}>Summary</Text>
            <Text style={[styles.detailsLabel, { right: 12 }]}>Date</Text>
          </View>
          <ScrollView>
            {capitalHistory.map((item, index) => (
              <View style={styles.detailsList}>
                <>
                  <View key={index} style={{ flexDirection: "row", gap: 5 }}>
                    <Ionicons
                      name="arrow-up"
                      size={18}
                      color="lightgreen"
                      style={{ top: 3 }}
                    />
                    <Text style={styles.detailsItem}>{item.amount}</Text>
                  </View>
                  <Text style={[styles.detailsItem]}> {item.date}</Text>
                </>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default Credit;
