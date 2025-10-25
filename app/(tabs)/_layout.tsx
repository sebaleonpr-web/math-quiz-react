import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    //para configurar el estilo de la cabecera de la aplicacion
      screenOptions={{
        headerStyle: { backgroundColor: '#0d1321' },
        headerTintColor: '#ffffff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Juego de sumas',
          tabBarShowLabel: false,
          tabBarIcon: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
