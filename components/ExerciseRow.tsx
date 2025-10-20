import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Muscle } from "../constants/muscles";

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
  children?: React.ReactNode;
};

export default function ExerciseRow({ 
    exercise,
    isActive, 
    latestWeight, 
    onPress, 
    children
} : ExerciseRowProps) {
    return (
        <View>
            <Pressable style={styles.row} onPress={onPress}>
                <Text style={[styles.name, isActive && styles.nameActive]}> 
                {exercise.name}
                </Text>
                <Text style={styles.latest}>
                    {latestWeight ?? "-"}
                </Text>
                {isActive && <View style={styles.expanded}>{children}</View>}
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // light gray divider
  },
  name: {
    fontSize: 16,
  },
  nameActive: {
    fontWeight: "bold",
  },
  latest: {
    fontSize: 14,
    color: "#6B7280", // muted gray
  },
  expanded: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
