import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const TextStyles = StyleSheet.create({
  appBarTitle: { color: AppColors.white, fontSize: 22, fontWeight: "bold" },
  questionTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: AppColors.appBar,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  operation: {
    fontSize: 52,
    fontWeight: "bold",
    color: AppColors.primary,
    marginVertical: 20,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  button: { fontSize: 18, color: AppColors.white, fontWeight: "bold" },
});
