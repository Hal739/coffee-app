import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

type TastingSliderProps = {
    label: string;
    value: number;
    onSlidingComplete: (value: number) => void;
};

const TastingSlider: React.FC<TastingSliderProps> = ({ label, value, onSlidingComplete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={value}
                onSlidingComplete={onSlidingComplete}
                minimumTrackTintColor="#007BFF" // 青色のトラック
                maximumTrackTintColor="#E0E0E0" // グレーのトラック
                thumbTintColor="#007BFF" // 青色のサム
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF', // 青色の値
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default TastingSlider;