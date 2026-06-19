import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {
    hasPlacesApiKey,
    searchDonationCentersByText
} from '../services/places';
import { useSettings } from '../SettingsProvider';

const bloodTypeOptions = ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const sexOptions = [
    { value: 'female', labelKey: 'settingsPatientSexFemale' },
    { value: 'male', labelKey: 'settingsPatientSexMale' }
];

export default function PatientInfoForm({ patientInfo, onChange }) {
    const { getColor, settings, translate } = useSettings();
    const [centerSuggestions, setCenterSuggestions] = useState([]);
    const [centerSuggestionStatus, setCenterSuggestionStatus] = useState(null);
    const [isLoadingCenterSuggestions, setIsLoadingCenterSuggestions] = useState(false);
    const city = patientInfo.city?.trim() || '';
    const canLoadCenterSuggestions = !isLoadingCenterSuggestions;

    const loadCenterSuggestions = async () => {
        if (!hasPlacesApiKey()) {
            setCenterSuggestions([]);
            setCenterSuggestionStatus('missing-api-key');
            return;
        }

        if (!city) {
            setCenterSuggestions([]);
            setCenterSuggestionStatus('missing-city');
            return;
        }

        setIsLoadingCenterSuggestions(true);
        setCenterSuggestionStatus(null);

        try {
            const result = await searchDonationCentersByText({
                city,
                languageCode: settings.language
            });

            setCenterSuggestions(result.places);
            setCenterSuggestionStatus(result.places.length > 0 ? 'ready' : 'empty');
        } catch (error) {
            console.error(error);
            setCenterSuggestions([]);
            setCenterSuggestionStatus('error');
        } finally {
            setIsLoadingCenterSuggestions(false);
        }
    };

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
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            paddingHorizontal: 14,
            color: getColor('text'),
            fontSize: 15
        },
        helpText: {
            fontSize: 12,
            lineHeight: 18,
            color: getColor('muted'),
            marginTop: 7
        },
        optionRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10
        },
        option: {
            minHeight: 42,
            borderRadius: 14,
            borderWidth: 1,
            paddingHorizontal: 14,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getColor('surface')
        },
        bloodTypeOption: {
            width: '22.8%'
        },
        halfOption: {
            flex: 1
        },
        optionText: {
            fontFamily: 'KGRedHands',
            fontSize: 13,
            textAlign: 'center'
        },
        loadButton: {
            minHeight: 44,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: canLoadCenterSuggestions ? getColor('secondary') : getColor('border'),
            backgroundColor: getColor('surface'),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 14,
            marginTop: 10,
            flexDirection: 'row',
            gap: 8,
            opacity: canLoadCenterSuggestions ? 1 : 0.62
        },
        loadButtonText: {
            fontFamily: 'KGRedHands',
            fontSize: 13,
            color: canLoadCenterSuggestions ? getColor('secondary') : getColor('muted')
        },
        suggestionList: {
            marginTop: 10,
            gap: 8
        },
        suggestion: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            padding: 12
        },
        suggestionName: {
            fontFamily: 'KGRedHands',
            fontSize: 13,
            lineHeight: 18,
            color: getColor('text')
        },
        suggestionAddress: {
            fontSize: 12,
            lineHeight: 17,
            color: getColor('muted'),
            marginTop: 3
        }
    };

    const renderOption = ({ value, label, labelKey }, selectedValue, onSelect, additionalStyle) => {
        const isSelected = selectedValue === value;

        return (
            <TouchableOpacity
                key={value}
                activeOpacity={0.8}
                onPress={() => onSelect(value)}
                style={[
                    styles.option,
                    additionalStyle,
                    {
                        backgroundColor: isSelected ? getColor('secondary') : getColor('surface'),
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
                blurOnSubmit={true}
                keyboardType={keyboardType}
                onChangeText={(value) => onChange(key, value)}
                placeholder={translate(placeholderKey)}
                placeholderTextColor={getColor('muted')}
                returnKeyType='done'
                selectionColor={getColor('secondary')}
                style={styles.input}
                value={patientInfo[key] || ''}
            />
        </View>
    );

    const getCenterSuggestionStatusText = () => {
        if (!centerSuggestionStatus || centerSuggestionStatus === 'ready') return null;

        return translate(`preferredCenterStatus.${centerSuggestionStatus}`);
    };

    const renderPreferredCenterField = () => {
        const statusText = getCenterSuggestionStatusText();

        return (
            <View style={styles.field}>
                <Text style={styles.label}>{translate('settingsPatientPreferredCenter')}</Text>
                <TextInput
                    blurOnSubmit={true}
                    onChangeText={(value) => onChange('preferredCenter', value)}
                    placeholder={translate('settingsPatientPreferredCenterPlaceholder')}
                    placeholderTextColor={getColor('muted')}
                    returnKeyType='done'
                    selectionColor={getColor('secondary')}
                    style={styles.input}
                    value={patientInfo.preferredCenter || ''}
                />
                <Text style={styles.helpText}>
                    {translate('settingsPatientPreferredCenterHelp')}
                </Text>
                <TouchableOpacity
                    accessibilityRole='button'
                    activeOpacity={0.8}
                    disabled={!canLoadCenterSuggestions}
                    onPress={loadCenterSuggestions}
                    style={styles.loadButton}
                >
                    {isLoadingCenterSuggestions && (
                        <ActivityIndicator color={getColor('secondary')} size='small' />
                    )}
                    <Text style={styles.loadButtonText}>
                        {translate('settingsPatientPreferredCenterLoad')}
                    </Text>
                </TouchableOpacity>
                {statusText && (
                    <Text style={styles.helpText}>{statusText}</Text>
                )}
                {centerSuggestions.length > 0 && (
                    <View style={styles.suggestionList}>
                        {centerSuggestions.map((center) => (
                            <TouchableOpacity
                                key={center.id}
                                accessibilityRole='button'
                                activeOpacity={0.8}
                                onPress={() => onChange('preferredCenter', center.name)}
                                style={styles.suggestion}
                            >
                                <Text style={styles.suggestionName}>{center.name}</Text>
                                {Boolean(center.address) && (
                                    <Text style={styles.suggestionAddress}>{center.address}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    return (
        <>
            <View style={styles.field}>
                <Text style={styles.label}>{translate('settingsPatientBloodType')}</Text>
                <View style={styles.optionRow}>
                    {bloodTypeOptions.map((bloodType) => (
                        renderOption(
                            { value: bloodType, label: bloodType },
                            patientInfo.bloodType,
                            (value) => onChange('bloodType', value),
                            styles.bloodTypeOption
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
                        renderOption(option, patientInfo.sex, (value) => onChange('sex', value), styles.halfOption)
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

            {renderPreferredCenterField()}
        </>
    )
}
