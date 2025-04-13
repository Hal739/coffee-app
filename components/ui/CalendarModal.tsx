import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CalendarModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectDate: (date: string) => void;
    markedDate?: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ visible, onClose, onSelectDate, markedDate }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day: { dateString: string; day: number; month: number; year: number }) => {
                            onSelectDate(day.dateString);
                            onClose();
                        }}
                        markedDates={{
                            [markedDate || '']: { selected: true, marked: true, selectedColor: '#007BFF' },
                        }}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>閉じる</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        width: '90%',
    },
    closeButton: {
        marginTop: 16,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CalendarModal;