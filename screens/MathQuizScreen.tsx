// screens/MathQuizScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { AppColors } from "../core/colors";
import { TextStyles } from "../core/textStyles";
import QuizOptionButton from "../components/QuizOptionButton";

export default function MathQuizScreen() {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [correcta, setCorrecta] = useState<number>(0);
  const [opciones, setOpciones] = useState<number[]>([]);
  const [respondido, setRespondido] = useState<boolean>(false);
  const [acierto, setAcierto] = useState<boolean>(false);

  const nuevaPregunta = () => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    const resultado = n1 + n2;

    const set = new Set<number>([resultado]);
    while (set.size < 4) set.add(Math.floor(Math.random() * 19));

    const lista = Array.from(set).sort(() => Math.random() - 0.5);
    setNum1(n1);
    setNum2(n2);
    setCorrecta(resultado);
    setOpciones(lista);
    setRespondido(false);
    setAcierto(false);
  };

  useEffect(() => {
    nuevaPregunta();
  }, []);

  const verificar = (valor: number) => {
    if (respondido) return;
    setRespondido(true);
    setAcierto(valor === correcta);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: AppColors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={AppColors.appBar} />
      <View style={[styles.appBar, { backgroundColor: AppColors.appBar }]}>
        <Text style={TextStyles.appBarTitle}>Juego de Sumas</Text>
      </View>

      <View style={styles.content}>
        <Text style={TextStyles.questionTitle}>¿Cuánto es…?</Text>
        <Text style={TextStyles.operation}>{num1} + {num2}</Text>

        <View style={styles.optionsContainer}>
          {opciones.map((op, i) => (
            <QuizOptionButton
              key={i}
              label={String(op)}
              onPress={() => verificar(op)}
              disabled={respondido}
            />
          ))}
        </View>

        {respondido && (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: acierto ? AppColors.success : AppColors.error,
              marginVertical: 15,
            }}
          >
            {acierto ? "✅ Correcto" : "❌ Incorrecto"}
          </Text>
        )}

        {respondido && (
          <View style={{ marginTop: 10 }}>
            <QuizOptionButton label="Siguiente" onPress={nuevaPregunta} disabled={false} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: { paddingVertical: 15, alignItems: "center", shadowColor: "#000", elevation: 4 },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30 },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});
