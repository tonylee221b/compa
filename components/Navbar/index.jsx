import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const Navbar = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar style={styles.logo} source={require('../../assets/icon.png')} />
      <Text {...props}>Eva Application</Text>
    </View>
  );

  return (
    <TabView
      selectedIndex={index}
      shouldLoadComponent={shouldLoadComp}
      onSelect={(ind) => navigation.navigate(ind === 0 ? 'Home' : 'Post')}
    >
      <Tab title="HOME">
        <Layout style={styles.tabContainer}></Layout>
      </Tab>
      <Tab title="POSTS">
        <Layout style={styles.tabContainer}></Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navbar;
