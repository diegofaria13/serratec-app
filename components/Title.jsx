import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return (
    <View>
      <Text style={styles}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fontSize: 30,
});
export default Title;