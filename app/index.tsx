import { Text, View } from "react-native";
import { Muscle } from "../constants/muscles"
import { useState } from "react";
import ExerciseRow from "../components/ExerciseRow"
export default function Index() {

  const[selectedExerciseID, setSelectedExerciseID] = useState<string | null>(null);
  
  function handleSelect(id : string) {
    if (id === selectedExerciseID) {
      setSelectedExerciseID(null);
    } else {
      setSelectedExerciseID(id);
    }
  }

  const exercises = [
    {id: "back-squat", name: "Back Squat", muscleGroups: [Muscle.QUADS, Muscle.GLUTES, Muscle.HAMSTRINGS]},
    {id: "leg-extensions", name: "Leg Extensions", muscleGroups: [Muscle.QUADS]},
    {id: "leg-curls", name: "Leg Curls", muscleGroups: [Muscle.HAMSTRINGS]},
    {id: "calf-raises", name: "Calf Raises", muscleGroups: [Muscle.CALVES]},
    {id: "bulgarian-split", name: "Bulgarian Split Squat", muscleGroups: [Muscle.QUADS, Muscle.HAMSTRINGS, Muscle.GLUTES]},
  ]

  const [weightsExerciseHistory, setWeightsExerciseHistory] = useState<{ [key: string]: number[] }>(() =>
    Object.fromEntries(exercises.map(e => [e.id, [0]]))
  );

  function getList(id: string) {
    return weightsExerciseHistory[id];
  }

  function getLatestWeight(id: string) {
    const list = getList(id);
    return list[0];
  }

  function insertLatestWeight(id: string, weight: number) {
    setWeightsExerciseHistory(prev => {
      const current = prev[id] ?? [];
      const updated = [weight, ...current];
      return {
        ...prev,
        [id]: updated,
      };
    });
  }
  return (
    <View>
      { exercises.map(exercise => {
        const isActive = exercise.id === selectedExerciseID;
        return (
          <ExerciseRow key={exercise.id}
            exercise={exercise}
            isActive={isActive}
            latestWeight={getLatestWeight(exercise.id)}
            onPress={() => handleSelect(exercise.id)}
          >
            <Text>Hello, you clicked?</Text>
          </ExerciseRow>
        );
      })}
    </View> 
  );
}
