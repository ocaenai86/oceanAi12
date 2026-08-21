import React from "react";
import { View } from "react-native";
import OceanAIIdeaMachineMobile from "../components/OceanAIIdeaMachineMobile";

export default function PublicIdeaScreen({ embedded }) {
  return (
    <View style={{ marginTop: embedded ? 0 : 16 }}>
      <OceanAIIdeaMachineMobile mode="public" />
    </View>
  );
}
