import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useSettings } from '../SettingsProvider';

const bloodTypeOptions = ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const sexOptions = [
    { value: 'female', labelKey: 'settingsPatientSexFemale' },
    { value: 'male', labelKey: 'settingsPatientSexMale' }
];

export default function PatientInfoForm({ patientInfo, onChange }) {
    const { getColor, translate } = useSettings();

    const styles = {
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
                onChangeText={(value) => onChange(key, value)}
                placeholder={translate(placeholderKey)}
                placeholderTextColor={getColor('muted')}
                selectionColor={getColor('secondary')}
                style={styles.input}
                value={patientInfo[key] || ''}
            />
        </View>
    );

    return (
        <>
            <View style={styles.field}>
                <Text style={styles.label}>{translate('settingsPatientBloodType')}</Text>
                <View style={styles.optionRow}>
                    {bloodTypeOptions.map((bloodType) => (
                        renderOption(
                            { value: bloodType, label: bloodType },
                            patientInfo.bloodType,
                            (value) => onChange('bloodType', value)
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
                        renderOption(option, patientInfo.sex, (value) => onChange('sex', value))
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
        </>
    )
}
