import { Text, View, Pressable } from "react-native";
import { Muscle } from "../constants/muscles"
import { useState } from "react";

export default function Index() {

  const[selectedExerciseID, setSelectedExerciseID] = useState<string | null>(null);

  const exercises = [
    {id: "back-squat", name: "Back Squat", muscleGroups: [Muscle.QUADS, Muscle.GLUTES, Muscle.HAMSTRINGS]},
    {id: "leg-extensions", name: "Leg Extensions", muscleGroups: [Muscle.QUADS]},
    {id: "leg-curls", name: "Leg Curls", muscleGroups: [Muscle.HAMSTRINGS]},
    {id: "calf-raises", name: "Calf Raises", muscleGroups: [Muscle.CALVES]},
    {id: "bulgarian-split", name: "Bulgarian Split Squat", muscleGroups: [Muscle.QUADS, Muscle.HAMSTRINGS, Muscle.GLUTES]},
  ]
  return (
    <View>
      { exercises.map(exercise => {
        const isActive = exercise.id == selectedExerciseID;
        return (
          <Pressable key={exercise.id} onPress={() => setSelectedExerciseID(exercise.id)}>
            <Text style = {{ fontWeight: isActive ? "bold" : "normal" }}> 
              {exercise.name}
            </Text>
          </Pressable>
        );
      })}
    </View> 
  );
}
