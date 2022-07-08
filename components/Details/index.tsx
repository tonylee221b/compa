import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface DetailsProps {
  label: string;
  value: string;
}

export const Details = ({ label, value }: DetailsProps) => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.row}>
        <Text category="s1">{label}</Text>
      </Layout>

      <Text category="p1">{value}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginTop: 16,
  },
});
