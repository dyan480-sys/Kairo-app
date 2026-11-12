import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from './LibraryScreen';
import SearchScreens from './SearchScreens';
import ProfileScreen from './ProfileScreen';
import { COLORS } from '../theme/theme';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.gold,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border, height: 60, paddingBottom: 10 },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
    }}>
      <Tab.Screen name="Biblioteca" component={LibraryScreen} />
      <Tab.Screen name="Explorador" component={SearchScreens} />
      <Tab.Screen name="Perfil" component={ProfileScreen} /> 
    </Tab.Navigator>
  );
}