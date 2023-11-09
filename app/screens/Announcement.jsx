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
                <Text style={styles.customSubtextTC}>Seminar Announcement</Text>
                <Text style={styles.customSubtextSmall}>
                  Join us for an informative seminar on responsible borrowing
                  and financial literacy, organized by San Jose Cooperative
                  Lending. This seminar will provide valuable insights on
                  managing your finances, making informed borrowing decisions,
                  and understanding the cooperative lending process. Don't miss
                  this opportunity to enhance your financial knowledge. Mark
                  your calendar!
                </Text>
                <Text style={styles.customSubtextTC}>
                  Interview Announcement
                </Text>
                <Text style={styles.customSubtextSmall}>
                  San Jose Cooperative Lending is conducting interviews for
                  potential borrowers. If you're interested in obtaining a loan
                  and want to learn more about our lending options, our
                  administrators are here to help. Schedule an interview to
                  discuss your financial needs and find the right lending
                  solution tailored to you.
                </Text>
                <Text style={styles.customSubtextTC}>Event Description</Text>
                <Text style={styles.customSubtextSmall}>
                  San Jose Cooperative Lending invites you to our Borrower's Day
                  event! Join us for a day of financial empowerment, where you
                  can meet with our experienced administrators to discuss your
                  borrowing options, learn about our cooperative lending
                  process, and explore the various financial resources we offer.
                  It's a great opportunity to take a step closer to achieving
                  your financial goals. Don't miss out on this event!
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
