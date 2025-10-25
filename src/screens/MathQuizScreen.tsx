// screens/MathQuizScreen.tsx
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import QuizOptionButton from "../components/QuizOptionButton";
import { AppColors } from "../core/colors";
import { TextStyles } from "../core/textStyles";
export default function MathQuizScreen() {

  // State variables
  //Variables que almacenan los numeros de la suma, la respuesta correcta, las opciones, y el estado del quiz
  //Estas cambian a medida que el usuario interactua con el quiz
  //Empiezan en 0 y se actualizan al llamar al numero random en nuevaPregunta
  //Pueden cambiar al usar la funcion set, usestate es el valor inicial
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [correcta, setCorrecta] = useState<number>(0);
  const [opciones, setOpciones] = useState<number[]>([]);
  const [respondido, setRespondido] = useState<boolean>(false);
  const [acierto, setAcierto] = useState<boolean>(false);

  const nuevaPregunta = () => {
    // Genera dos numeros aleatorios entre 1 y 10
    const n1 = Math.floor(Math.random() * 11)+1;
    const n2 = Math.floor(Math.random() * 11)+1;
    // Calcula la suma de los dos numeros
    //Constante que almacena la respuesta correcta de la suma / es nueva
    const resultado = n1 + n2;


    // Genera un conjunto de 4 opciones unicas, incluyendo la respuesta correcta
    const set = new Set<number>([resultado]);
    // Mientras el conjunto tenga menos de 4 elementos, agrega numeros aleatorios entre 0 y 18
    while (set.size < 4) set.add(Math.floor(Math.random() * 19)+1);

    // Mezcla las opciones y las convierte en un array
    //Con sort ordena aleatoriamente los elementos del array en ascendente
    //El -0.5 hace que el orden sea aleatorio, toma cada par de elementos y los intercambia segun el resultado de la resta
    //Constante precisa para ejercicios de suma basicos
    const lista = Array.from(set).sort(() => Math.random() - 0.5);
    // Actualiza el estado con los nuevos valores
    setNum1(n1);
    //Actualiza el estado con los nuevos valores
    setNum2(n2);
    //Actualiza el estado con los nuevos valores
    setCorrecta(resultado);
    //Actualiza el estado con los nuevos valores
    setOpciones(lista);
    // Reinicia el estado de respondido y acierto
    setRespondido(false);
    //Actualiza el estado con los nuevos valores
    setAcierto(false);
  };

// Llama a nuevaPregunta cuando el componente se monta por primera vez
  useEffect(() => {
    nuevaPregunta();
  }, []);

  // Funcion para verificar la respuesta del usuario
  const verificar = (valor: number) => {
    //Si ya se respondio, no hace nada
    if (respondido) return;
    // Actualiza el estado para indicar que se ha respondido
    setRespondido(true);
    // Actualiza el estado para indicar si la respuesta fue correcta
    setAcierto(valor === correcta);
  };

  // Renderiza el componente
  //Estructura principal de la pantalla del quiz, con el titulo, la operacion, las opciones y los mensajes de feedback
  return (
    //Contenedor principal que asegura que el contenido se muestre dentro de las areas seguras de la pantalla
    //Aplica estilos de contenedor y fondo
    <SafeAreaView style={[styles.container, { backgroundColor: AppColors.background }]}>
      {/*Configura el bar*/}
      <StatusBar barStyle="light-content" backgroundColor={AppColors.appBar} />

      {/*Barra de la aplicacion con el titulo*/}
      <View style={styles.content}>
        {/*Label con la pregunta*/}
        <Text style={TextStyles.questionTitle}>¿Cuánto es…?</Text>
        {/*Muestra los numeros con set, osea el numero generado*/}
        <Text style={TextStyles.operation}>{num1} + {num2}</Text>

        {/*Creacion de un contenedor de opciones*/}
        <View style={styles.optionsContainer}>
          {/*map es un bucle de react, recorre las opciones y crea un boton para cada una*/}
          {opciones.map((op, recorrido) => (
            <QuizOptionButton
              key={recorrido}
              label={String(op)}
              onPress={() => verificar(op)}
              disabled={respondido}
            />
          ))}
        </View>

       {/* Contenedor fijo para evitar que se muevan las opciones */}
        <View style={styles.feedbackArea}>
          {/* Si respondio, osea respondido es true */}
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
                {/* Si acierta correcto, else incorrecto */}
                {acierto ? "✅ Correcto" : "❌ Incorrecto"}
              </Text>

              {/* Si respondio, muestra el boton de siguiente */}
              <View style={{ marginTop: 10 }}>
                {/* Al presionar cargara mi funcion nueva pregunta y se desabilitara el boton */}
                <QuizOptionButton label="Siguiente" onPress={nuevaPregunta} disabled={false} />
              </View>
            </View>
          )}
        </View>
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
