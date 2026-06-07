import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Container from '../components/Container';
import Modal from '../components/Modal';
import appConfig from '../app.json';

import { useSettings } from '../SettingsProvider';

const bloodTypeOptions = ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const sexOptions = [
    { value: 'female', labelKey: 'settingsPatientSexFemale' },
    { value: 'male', labelKey: 'settingsPatientSexMale' },
    { value: 'other', labelKey: 'settingsPatientSexOther' }
];
const themeOptions = [
    { value: 'dark', labelKey: 'settingsThemeDark' },
    { value: 'light', labelKey: 'settingsThemeLight' }
];
const languageOptions = [
    { value: 'pl', label: 'Polski' },
    { value: 'en', label: 'English' }
];

export default function SettingsScreen() {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const { clearAllData, getColor, settings, translate, updateSettings } = useSettings();
    const patientInfo = settings.patientInfo || {};

    const updatePatientInfo = (key, value) => {
        updateSettings({
            patientInfo: {
                ...patientInfo,
                [key]: value
            }
        });
    };

    const handleClearAllData = async () => {
        await clearAllData();
        setIsDeleteModalVisible(false);
    };

    const styles = {
        screen: {
            paddingBottom: 0
        },
        content: {
            paddingBottom: 26
        },
        title: {
            fontFamily: 'KGRedHands',
            fontSize: 28,
            color: getColor('secondary'),
            marginTop: 26,
            marginBottom: 26
        },
        section: {
            marginBottom: 32
        },
        sectionTitle: {
            fontFamily: 'KGRedHands',
            fontSize: 18,
            color: getColor('secondary'),
            marginBottom: 12
        },
        infoBox: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            padding: 14,
            marginBottom: 16
        },
        infoText: {
            fontSize: 13,
            lineHeight: 20,
            color: getColor('muted')
        },
        field: {
            marginBottom: 16
        },
        label: {
            fontSize: 13,
            lineHeight: 18,
            color: getColor('muted'),
            marginBottom: 8
        },
        input: {
            minHeight: 48,
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 14,
            color: getColor('text'),
            fontSize: 15
        },
        optionRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8
        },
        option: {
            minHeight: 42,
            borderRadius: 8,
            borderWidth: 1,
            paddingHorizontal: 14,
            alignItems: 'center',
            justifyContent: 'center'
        },
        optionText: {
            fontFamily: 'KGRedHands',
            fontSize: 13
        },
        dangerButton: {
            minHeight: 48,
            borderRadius: 8,
            backgroundColor: getColor('secondary'),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            marginTop: 6
        },
        dangerButtonText: {
            fontFamily: 'KGRedHands',
            fontSize: 14,
            color: '#FFFFFF',
            textAlign: 'center'
        },
        version: {
            fontFamily: 'KGRedHands',
            fontSize: 10,
            lineHeight: 16,
            color: getColor('muted'),
            textAlign: 'center',
            marginTop: 6
        }
    };

    const renderOption = ({ value, label, labelKey }, selectedValue, onSelect) => {
        const isSelected = selectedValue === value;

        return (
            <TouchableOpacity
                key={value}
                activeOpacity={0.8}
                onPress={() => onSelect(value)}
                style={[
                    styles.option,
                    {
                        backgroundColor: isSelected ? getColor('secondary') : 'transparent',
                        borderColor: isSelected ? getColor('secondary') : getColor('border')
                    }
                ]}
            >
                <Text
                    style={[
                        styles.optionText,
                        { color: isSelected ? getColor('primary') : getColor('text') }
                    ]}
                >
                    {label || translate(labelKey)}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderField = ({ key, labelKey, keyboardType = 'default', placeholderKey }) => (
        <View style={styles.field}>
            <Text style={styles.label}>{translate(labelKey)}</Text>
            <TextInput
                keyboardType={keyboardType}
                onChangeText={(value) => updatePatientInfo(key, value)}
                placeholder={translate(placeholderKey)}
                placeholderTextColor={getColor('muted')}
                selectionColor={getColor('secondary')}
                style={styles.input}
                value={patientInfo[key] || ''}
            />
        </View>
    );

    return (
        <Container additionalStyle={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{translate('settingsTitle')}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{translate('settingsPatientSection')}</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>{translate('settingsPatientPrivacy')}</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>{translate('settingsPatientBloodType')}</Text>
                        <View style={styles.optionRow}>
                            {bloodTypeOptions.map((bloodType) => (
                                renderOption(
                                    { value: bloodType, label: bloodType },
                                    patientInfo.bloodType,
                                    (value) => updatePatientInfo('bloodType', value)
                                )
                            ))}
                        </View>
                    </View>

                    {renderField({
                        key: 'age',
                        labelKey: 'settingsPatientAge',
                        keyboardType: 'numeric',
                        placeholderKey: 'settingsPatientAgePlaceholder'
                    })}

                    <View style={styles.field}>
                        <Text style={styles.label}>{translate('settingsPatientSex')}</Text>
                        <View style={styles.optionRow}>
                            {sexOptions.map((option) => (
                                renderOption(option, patientInfo.sex, (value) => updatePatientInfo('sex', value))
                            ))}
                        </View>
                    </View>

                    {renderField({
                        key: 'weightKg',
                        labelKey: 'settingsPatientWeight',
                        keyboardType: 'numeric',
                        placeholderKey: 'settingsPatientWeightPlaceholder'
                    })}

                    {renderField({
                        key: 'city',
                        labelKey: 'settingsPatientCity',
                        placeholderKey: 'settingsPatientCityPlaceholder'
                    })}

                    {renderField({
                        key: 'preferredCenter',
                        labelKey: 'settingsPatientPreferredCenter',
                        placeholderKey: 'settingsPatientPreferredCenterPlaceholder'
                    })}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{translate('settingsAppSection')}</Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>{translate('settingsTheme')}</Text>
                        <View style={styles.optionRow}>
                            {themeOptions.map((option) => (
                                renderOption(option, settings.theme, (value) => updateSettings({ theme: value }))
                            ))}
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>{translate('settingsLanguage')}</Text>
                        <View style={styles.optionRow}>
                            {languageOptions.map((option) => (
                                renderOption(option, settings.language, (value) => updateSettings({ language: value }))
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setIsDeleteModalVisible(true)}
                        style={styles.dangerButton}
                    >
                        <Text style={styles.dangerButtonText}>{translate('settingsDeleteAllData')}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.version}>
                    {appConfig.expo.version}
                </Text>
            </ScrollView>

            <Modal
                isVisible={isDeleteModalVisible}
                text={translate('settingsDeleteAllDataConfirm')}
                twoButtons={true}
                buttonOneText={translate('settingsDeleteConfirm')}
                buttonTwoText={translate('settingsDeleteCancel')}
                buttonOneOnPress={handleClearAllData}
                buttonTwoOnPress={() => setIsDeleteModalVisible(false)}
            />
        </Container>
    )
}
