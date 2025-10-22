import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Muscle } from "../constants/muscles";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type Exercise = {
  id: string;
  name: string;
  muscleGroups: Muscle[];
};

type ExerciseRowProps = {
  exercise: Exercise;
  isActive: boolean;
  latestWeight?: number | null;
  onPress: () => void;
  onRemove?: () => void;
  children?: React.ReactNode;
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExerciseRow({
  exercise,
  isActive,
  latestWeight,
  onPress,
  onRemove,
  children,
}: ExerciseRowProps) {
  const swipeRef = React.useRef<any>(null);

  return (
    <View style={styles.container}>
      <Swipeable
        ref={swipeRef}
        overshootRight={false}
        renderRightActions={() => (
          <Pressable
            onPress={onRemove}
            style={{
              backgroundColor: "#DC2626",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingHorizontal: 20,
              marginVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Delete</Text>
          </Pressable>
        )}
      >
        <Pressable
          style={styles.row}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            onPress();
          }}
          accessibilityRole="button"
          accessibilityState={{ expanded: isActive }}
        >
          <View style={styles.left}>
            <Text style={[styles.name, isActive && styles.nameActive]}>
              {exercise.name}
            </Text>
          </View>

          <View style={styles.right}>
            <View style={styles.latest}>
              <Text>{latestWeight}</Text>
            </View>
          </View>
        </Pressable>
      </Swipeable>
      {isActive && <View style={styles.expanded}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  left: {
    flex: 1, // take remaining space
    paddingRight: 12, // little gap before the right label
  },
  right: {
    minWidth: 48, // prevents drifting when content below appears
    alignItems: "flex-end", // keep contents pinned to the right
  },
  name: {
    fontSize: 16,
  },
  nameActive: {
    fontWeight: "bold",
  },
  latest: {
    flexDirection: "row",
  },
  expanded: {
    marginTop: 8,
    paddingHorizontal: 16,
    alignItems: "flex-end",
  },
});
