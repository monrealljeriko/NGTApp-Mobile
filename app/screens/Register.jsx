import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Button from "../component/Button";
import COLORS from "../component/Colors";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import styles from "./styles";

function Register({ navigation }) {
   const [isChecked, setIsChecked] = useState(true);
   const [selectedIndex, setSelectedIndex] = useState(1);

   // Segment control
   const handleSegmentChange = (event) => {
      setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
   };

   // check if user has accept t&c
   const handleProceed = () => {
      if (!isChecked) {
         return;
      }
      navigation.navigate("SectionHandler");
   };

   return (
      <View style={styles.container}>
         <View style={{ marginBottom: 20 }}>
            <Image
               source={require("../../assets/images/bg-login.png")}
               style={{ width: "100%" }}
            />
         </View>
         <ScrollView>
            <View style={[styles.contentContainer, { marginTop: 0 }]}>
               <View style={{ marginBottom: 20, alignItems: "flex-start" }}>
                  <Text style={styles.customSubtitleTC}>
                     Membership Registration
                  </Text>

                  <Text style={[styles.customSubtext]}>
                     Become a member now and loan later!
                  </Text>
               </View>
               <View style={{ width: "100%" }}>
                  <SegmentedControl
                     values={["Requirements", "T & C"]}
                     selectedIndex={selectedIndex}
                     onChange={handleSegmentChange}
                     style={{ height: 40 }}
                  />
                  {selectedIndex == 1 ? (
                     <View>
                        <View style={{ marginVertical: 20, gap: 10 }}>
                           <Text
                              style={[
                                 styles.customSubtext,
                                 { fontFamily: "Poppins-Bold" },
                              ]}
                           >
                              Terms and Conditions
                           </Text>
                           <Text style={styles.customSubtext}>
                              Welcome to Our Lending Management System!
                           </Text>
                           <Text style={styles.customSubtextTC}>
                              1. Registration
                           </Text>
                           <Text style={styles.customSubtextSmall}>
                              When you sign up, make sure your information is
                              accurate. Your username and password are just for
                              you, so don't share them. If you suspect someone's
                              trying to access your account without permission,
                              tell us right away.
                           </Text>
                           <Text style={styles.customSubtextTC}>
                              2. Using the Platform
                           </Text>
                           <Text style={styles.customSubtextSmall}>
                              Our platform lets you manage loans and payments.
                              Please use it responsibly – no funny business.
                              Treat other users with respect, and don't mess
                              with their stuff.
                           </Text>
                           <Text style={styles.customSubtextTC}>
                              3. Borrowing and Lending
                           </Text>
                           <Text style={styles.customSubtextSmall}>
                              If you borrow money, you've got to pay it back
                              according to the rules you and the lender agreed
                              on. If you're the lender, be aware that lending
                              has its risks. We're not responsible for your loan
                              deals – that's between you and the borrower.
                           </Text>
                           <Text style={styles.customSubtextTC}>
                              4. Privacy
                           </Text>
                           <Text style={styles.customSubtextSmall}>
                              We're committed to protecting your info. We'll
                              only use it as our Privacy Policy says we will.
                           </Text>
                           <Text style={styles.customSubtextTC}>
                              5. Security
                           </Text>
                           <Text style={styles.customSubtextSmall}>
                              We're serious about security, but no one can
                              promise it's perfect. If you spot any security
                              issues, tell us right away.
                           </Text>
                        </View>

                        <View style={styles.acceptTC}>
                           <Checkbox
                              style={{ marginRight: 8 }}
                              value={isChecked}
                              onValueChange={setIsChecked}
                              color={isChecked ? COLORS.primary : undefined}
                           />

                           <Text
                              style={[
                                 styles.customSubtext,
                                 {
                                    color: isChecked ? "green" : "red",
                                 },
                              ]}
                           >
                              I agree to the terms and conditions
                           </Text>
                        </View>

                        <Button
                           onPress={handleProceed}
                           title="Proceed"
                           filled
                           style={{
                              marginVertical: 20,
                           }}
                        />

                        <View
                           style={[
                              styles.options,
                              { justifyContent: "center" },
                           ]}
                        >
                           <Text style={styles.customSubtext}>
                              Already a member ?
                           </Text>
                           <Pressable
                              onPress={() => navigation.navigate("Login")}
                           >
                              <Text style={styles.pressableText}>
                                 Click here
                              </Text>
                           </Pressable>
                        </View>
                     </View>
                  ) : (
                     <View>
                        <View style={styles.requirements}>
                           <Text
                              style={[
                                 styles.customSubtextTC,
                                 { alignSelf: "center" },
                              ]}
                           >
                              Prepare the following requirements:
                           </Text>
                           <Text style={styles.customSubtext}>
                              1. Membership Application Form
                           </Text>

                           <Text style={styles.customSubtext}>
                              2. Barangay Clearance
                           </Text>

                           <Text style={styles.customSubtext}>
                              3. 2x2 ID Picture
                           </Text>

                           <Text style={styles.customSubtext}>
                              4. 1x1 ID Picture
                           </Text>
                        </View>
                     </View>
                  )}
               </View>
            </View>
         </ScrollView>
      </View>
   );
}

export default Register;
