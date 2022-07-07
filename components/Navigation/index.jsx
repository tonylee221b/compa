import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBar, Tab } from '@ui-kitten/components';
import Home from '../../screens/Home';
import Post from '../../screens/Post';
import PostDetail from '../../screens/PostDetail';
import { CreateActivityForm } from '../CreateActivityForm';
import { MyActivitiesScreen } from '../../screens/MyActivitiesScreen';

const { Navigator, Screen } = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Posts" component={Post} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="CreateActivity" component={CreateActivityForm} />
    </Stack.Navigator>
  );
};

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(ind) => navigation.navigate(state.routeNames[ind])}
  >
    <Tab title="Home" />
    <Tab title="Post" />
    <Tab title="My Activities" />
  </TabBar>
);

const NavContainer = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TopTabBar {...props} />}
        initialRouteName="Home"
      >
        <Screen name="Home" component={Home} />
        <Screen name="Post" component={MyStack} />
        <Screen name="MyActivity" component={MyActivitiesScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
