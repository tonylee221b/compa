import { useNavigation } from '@react-navigation/native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

export const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigation
      style={{ padding: 0 }}
      accessoryLeft={
        <TopNavigationAction
          onPress={() => navigation.goBack()}
          icon={<Icon name="arrow-back" />}
        />
      }
      title="Go back"
    />
  );
};
