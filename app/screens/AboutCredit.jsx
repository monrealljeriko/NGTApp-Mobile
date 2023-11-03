import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";

function AboutCredit() {
   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={[styles.contentContainer, { marginTop: 0 }]}>
               <View style={{ width: "100%" }}>
                  <View>
                     <View style={{ marginVertical: 20, gap: 10 }}>
                        <Text
                           style={[
                              styles.customSubtext,
                              { fontFamily: "Poppins-Bold", fontSize: 16 },
                           ]}
                        >
                           More about credit score and share
                        </Text>

                        <Text
                           style={[
                              styles.customSubtext,
                              { textAlign: "justify" },
                           ]}
                        >
                           {"           "}
                           Loanable amount is based on the share capital of the
                           borrower, meaning a larger share capital allows for a
                           higher loan amount. While the eligibility of a member
                           to obtain a loan is determined through their
                           membership status, share capital, and payment
                           history.
                        </Text>

                        <Text style={styles.customSubtextTC}>
                           Understanding Credit
                        </Text>
                        <Text style={styles.customSubtextSmall}>
                           - Your credit history and credit score are crucial
                           factors that lenders and creditors consider when
                           determining your creditworthiness. It's important to
                           understand how to improve and maintain good credit
                           performance.
                        </Text>
                        <Text style={styles.customSubtextTC}>
                           Improving Credit
                        </Text>
                        <Text style={styles.customSubtextSmall}>
                           - Pay your bills on time: Late payments can
                           negatively impact your credit score{"\n"}- Lorem
                           ipsum dolor sit amet, consectetur adipiscing elit
                           {"\n"}- Lorem ipsum dolor sit amet, consectetur
                           adipiscing elit
                        </Text>
                        <Text style={styles.customSubtextTC}>
                           Maintaining Good Credit Performance
                        </Text>
                        <Text style={styles.customSubtextSmall}>
                           - Pay your bills on time: Late payments can
                           negatively impact your credit score{"\n"}- Lorem
                           ipsum dolor sit amet, consectetur adipiscing elit
                           {"\n"}- Lorem ipsum dolor sit amet, consectetur
                           adipiscing elit
                        </Text>
                     </View>
                  </View>
               </View>
            </View>
         </ScrollView>
      </View>
   );
}

export default AboutCredit;
