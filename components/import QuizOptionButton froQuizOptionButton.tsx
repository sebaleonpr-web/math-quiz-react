import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AppColors } from "../core/colors";
import { TextStyles } from "../core/textStyles";

type Props = { label: string; onPress: () => void; disabled?: boolean };

export default function QuizOptionButton({ label, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { opacity: disabled ? 0.6 : 1 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={TextStyles.button}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 8,
    width: "40%",
    alignItems: "center",
    elevation: 3,
  },
});
