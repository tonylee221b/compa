import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../screens/Home';
import Post from '../../screens/Post';
import PostDetail from '../../screens/PostDetail';

const Navigator = createStackNavigator(
  {
    Home: Home,
    Post: Post,
    PostDetail: PostDetail,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const NavContainer = createAppContainer(Navigator);

export default NavContainer;
