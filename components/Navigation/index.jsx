import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Post from '../../screens/Post';
import PostDetail from '../../screens/PostDetail';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Post" component={MyStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
