import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#795548' },
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
