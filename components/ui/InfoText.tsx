import { View, Text ,StyleSheet} from 'react-native';

const InfoText = ({ title, value }: { title: string; value: string }) => (
    <View>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    value: {
        fontSize: 16,
        marginBottom: 16,
        color: '#555',
    },
});

export default InfoText;