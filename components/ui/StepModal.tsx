import React from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type StepModalProps = {
    visible: boolean;
    step: string;
    customStep: string;
    time: string;
    waterAmount: string;
    onChangeStep: (text: string) => void;
    onChangeCustomStep: (text: string) => void;
    onChangeTime: (text: string) => void;
    onChangeWaterAmount: (text: string) => void;
    onSave: (time: string, waterAmount: string) => void; // 引数を追加
    onCancel: () => void;
};

const StepModal: React.FC<StepModalProps> = ({
    visible,
    step,
    customStep,
    time = '0',
    waterAmount = '0',
    onChangeStep,
    onChangeCustomStep,
    onChangeTime,
    onChangeWaterAmount,
    onSave,
    onCancel,
}) => {
    const stepPresets = [
        { label: 'お湯を注ぐ', value: 'お湯を注ぐ' },
        { label: '蒸らし', value: '蒸らし' },
        { label: 'かき混ぜる', value: 'かき混ぜる' },
        { label: '抽出を停止', value: '抽出を停止' },
        { label: 'その他', value: 'その他' },
    ];

    const handleSave = () => {
        // timeとwaterAmountが空の場合は0に設定
        const finalTime = time.trim() === '' ? '0' : time;
        const finalWaterAmount = waterAmount.trim() === '' ? '0' : waterAmount;

        // 保存処理を実行
        onSave(finalTime, finalWaterAmount);
    };

    const handleStepChange = (value: string | null) => {
        if (value === 'その他') {
            onChangeStep('その他');
            onChangeCustomStep('');
        } else if (value) {
            onChangeStep(value);
        }
    };

    const incrementTime = () => {
        const newTime = (parseInt(time) || 0) + 10;
        onChangeTime(newTime.toString());
    };

    const decrementTime = () => {
        const newTime = Math.max((parseInt(time) || 0) - 10, 0);
        onChangeTime(newTime.toString());
    };

    const incrementWaterAmount = () => {
        const newAmount = (parseInt(waterAmount) || 0) + 10;
        onChangeWaterAmount(newAmount.toString());
    };

    const decrementWaterAmount = () => {
        const newAmount = Math.max((parseInt(waterAmount) || 0) - 10, 0);
        onChangeWaterAmount(newAmount.toString());
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>手順を追加</Text>

                    <RNPickerSelect
                        onValueChange={handleStepChange}
                        items={stepPresets}
                        placeholder={{ label: '手順を選択してください', value: null }}
                        style={{
                            inputAndroid: styles.picker,
                            inputIOS: styles.picker,
                        }}
                        value={step}
                    />

                    {step === 'その他' && (
                        <TextInput
                            style={styles.input}
                            placeholder="任意の手順を入力してください"
                            value={customStep}
                            onChangeText={onChangeCustomStep}
                        />
                    )}

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.flexInput]}
                            placeholder="時間 (秒)"
                            value={time}
                            onChangeText={onChangeTime}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.buttonSmall} onPress={incrementTime}>
                            <Text style={styles.buttonText}>+10秒</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmall} onPress={decrementTime}>
                            <Text style={styles.buttonText}>-10秒</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.flexInput]}
                            placeholder="湯量 (ml)"
                            value={waterAmount}
                            onChangeText={onChangeWaterAmount}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.buttonSmall} onPress={incrementWaterAmount}>
                            <Text style={styles.buttonText}>+10ml</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSmall} onPress={decrementWaterAmount}>
                            <Text style={styles.buttonText}>-10ml</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave} // 修正したhandleSaveを使用
                        >
                            <Text style={styles.buttonText}>保存</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.buttonText}>キャンセル</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        fontSize: 16,
    },
    flexInput: {
        flex: 1,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonSmall: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#007BFF',
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default StepModal;