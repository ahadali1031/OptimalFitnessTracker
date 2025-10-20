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
                <View style={styles.left}>
                    <Text style={[styles.name, isActive && styles.nameActive]}> 
                        {exercise.name}
                    </Text>
                </View>

                <View style={styles.right}>
                    <Text style={styles.latest}>
                        {latestWeight ?? "-"}
                    </Text>
                </View>
            </Pressable>
            {isActive && <View style={styles.expanded}>{children}</View>}
        </View>
    );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  left: {
    flex: 1,               // take remaining space
    paddingRight: 12,      // little gap before the right label
  },
  right: {
    minWidth: 48,          // prevents drifting when content below appears
    alignItems: "flex-end" // keep contents pinned to the right
  },
  name: {
    fontSize: 16,
  },
  nameActive: {
    fontWeight: "bold",
  },
  latest: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "right",
  },
  expanded: {
    marginTop: 8,
    paddingHorizontal: 16,
    alignItems:"flex-end"
  },
});

