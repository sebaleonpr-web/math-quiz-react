import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const TextStyles = StyleSheet.create({
  appBarTitle: { fontSize: 20, fontWeight: "700", color: AppColors.text },
  questionTitle: { fontSize: 18, fontWeight: "600", color: AppColors.text, marginBottom: 8 },
  operation: { fontSize: 44, fontWeight: "800", color: AppColors.primary, marginVertical: 10 },
  button: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
