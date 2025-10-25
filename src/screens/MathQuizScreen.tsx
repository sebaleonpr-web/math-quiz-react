// screens/MathQuizScreen.tsx
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import QuizOptionButton from "../components/QuizOptionButton";
import { AppColors } from "../core/colors";
import { TextStyles } from "../core/textStyles";
export default function MathQuizScreen() {

  //Variables de estado
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [correcta, setCorrecta] = useState<number>(0);
  const [opciones, setOpciones] = useState<number[]>([]);
  const [respondido, setRespondido] = useState<boolean>(false);
  const [acierto, setAcierto] = useState<boolean>(false);

  //Función para generar una nueva pregunta
  const nuevaPregunta = () => {
    const n1 = Math.floor(Math.random() * 11)+1;
    const n2 = Math.floor(Math.random() * 11)+1;
    const resultado = n1 + n2;

    const set = new Set<number>([resultado]);
    while (set.size < 4) set.add(Math.floor(Math.random() * 19)+1);
    const lista = Array.from(set).sort(() => Math.random() - 0.5);

    setNum1(n1);
    setNum2(n2);
    setCorrecta(resultado);
    setOpciones(lista);
    setRespondido(false);
    setAcierto(false);
  };

  //Generar la primera pregunta al cargar el componente
  useEffect(() => {
    nuevaPregunta();
  }, []);

  //Función para verificar la respuesta seleccionada
  const verificar = (valor: number) => {
    if (respondido) return;
    setRespondido(true);
    setAcierto(valor === correcta);
  };

  //Render
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: AppColors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={AppColors.appBar} />

      <View style={styles.content}>
        <Text style={TextStyles.questionTitle}>¿Cuánto es…?</Text>
        <Text style={TextStyles.operation}>{num1} + {num2}</Text>

        <View style={styles.optionsContainer}>
          {opciones.map((op, recorrido) => (
            <QuizOptionButton
              key={recorrido}
              label={String(op)}
              onPress={() => verificar(op)}
              disabled={respondido}
            />
          ))}
        </View>

        <View style={styles.feedbackArea}>
          {respondido && (
            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.feedbackText,
                  {
                    opacity: respondido ? 1 : 0,
                    color: acierto ? AppColors.success : AppColors.error,
                  },
                ]}
                pointerEvents="none"
              >
                {acierto ? "✅ Correcto" : "❌ Incorrecto"}
              </Text>

              <View style={{ marginTop: 10 }}>
                <QuizOptionButton label="Siguiente" onPress={nuevaPregunta} disabled={false} />
              </View>
            </View>
          )}
        </View>
        </View>
        </SafeAreaView>
        );
        }

        //Estilos
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
          feedbackArea: {
            height: 110,          
            alignItems: "center",
            justifyContent: "center",
          },
          feedbackText: {
            fontSize: 18,
            fontWeight: "600",
            marginVertical: 15,
          },
        });
