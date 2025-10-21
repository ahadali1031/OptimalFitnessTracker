import { Text, View, Pressable, TextInput, LayoutAnimation } from "react-native";
import { Muscle } from "../constants/muscles"
import { useState } from "react";
import ExerciseRow from "../components/ExerciseRow"
export default function Index() {

  const exercises = [
    {id: "back-squat", name: "Back Squat", muscleGroups: [Muscle.QUADS, Muscle.GLUTES, Muscle.HAMSTRINGS]},
    {id: "leg-extensions", name: "Leg Extensions", muscleGroups: [Muscle.QUADS]},
    {id: "leg-curls", name: "Leg Curls", muscleGroups: [Muscle.HAMSTRINGS]},
    {id: "calf-raises", name: "Calf Raises", muscleGroups: [Muscle.CALVES]},
    {id: "bulgarian-split", name: "Bulgarian Split Squat", muscleGroups: [Muscle.QUADS, Muscle.HAMSTRINGS, Muscle.GLUTES]},
  ]

  const[selectedExerciseID, setSelectedExerciseID] = useState<string | null>(null);
  const [weightsExerciseHistory, setWeightsExerciseHistory] = useState<{ [key: string]: number[] }>(() =>
    Object.fromEntries(exercises.map(e => [e.id, []]))
  );
  const [inputByExercise, setInputByExercise] = useState<{ [key: string]: string }>({});
  function setInput(id: string, v: string) {
    setInputByExercise(prev => ({...prev, [id]: v}));
  }

  
  function handleSelect(id : string) {
    if (id === selectedExerciseID) {
      setSelectedExerciseID(null);
    } else {
      setSelectedExerciseID(id);
    }
  }

  function getList(id: string) {
    return weightsExerciseHistory[id] ?? [];
  }

  function getLatestWeight(id: string) {
    const list = getList(id);
    return list.length > 0 ? list[0] : 0;
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

  function handleAdd(exerciseId: string) {
    const raw = (inputByExercise[exerciseId] ?? "").trim();
    if (raw === "") return;
    const num = Number(raw)
    if (!Number.isFinite(num) || num < 0) {
      return;
    }
    insertLatestWeight(exerciseId, num);
    setInput(exerciseId, "");
  }

  function handleDeletePrevious(exerciseId: string, prevIndex: number) {
    setWeightsExerciseHistory(prev => {
      const list = prev[exerciseId] ?? [];
      if (list.length <= 1) return prev;

      const targetIndex = prevIndex + 1;
      if (targetIndex < 1 || targetIndex >= list.length) return prev;

      const nextList = list.slice();
      nextList.splice(targetIndex, 1);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      return { ...prev, [exerciseId]: nextList };
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
            <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600", marginBottom: 6 }}>Previous Weights:</Text>
                {(() => {
                  const previous = getList(exercise.id).slice(1);
                  if (previous.length === 0) {
                    return <Text style={{ color: "#6B7280" }}>None yet</Text>;
                  }
                  return previous.map((w, i) => (
                    <View style={{flexDirection: "row", alignItems: "baseline", marginBottom: 4}}>
                      <View style={{ width: 20 }}>
                        <Text style={{ textAlign: 'right' }}>{w}</Text>
                      </View>

                      <Pressable onPress={() => handleDeletePrevious(exercise.id, i)} hitSlop={8} style={{marginLeft: 10 }}>
                        <Text style={{ color:"red" }}>X</Text>
                      </Pressable>
                    </View>
                  ));
                })()}
              </View>
              <View style={{ minWidth: 120 }}>
                <TextInput
                  value={inputByExercise[exercise.id] ?? ""}
                  onChangeText={(t) => setInput(exercise.id, t.replace(/[^0-9]/g, ""))}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onSubmitEditing={() => handleAdd(exercise.id)}
                  placeholder="Enter Weight"
                  style={{
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }}
                />
                <Pressable
                  onPress={() => handleAdd(exercise.id)}
                  style={{
                    marginTop: 8,
                    alignSelf: "flex-end",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    backgroundColor: "#111827",
                  }}
                >
                  <Text style={{ color: "white" }}>Add</Text>
                </Pressable>
              </View>
            </View>

          </ExerciseRow>
        );
      })}
    </View> 
  );
}
