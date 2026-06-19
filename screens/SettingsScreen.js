import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Container from '../components/Container';
import PatientInfoForm from '../components/PatientInfoForm';
import appConfig from '../app.json';

import { useSettings } from '../SettingsProvider';

const themeOptions = [
    { value: 'dark', labelKey: 'settingsThemeDark', iconName: 'moon' },
    { value: 'light', labelKey: 'settingsThemeLight', iconName: 'sun' }
];
const languageOptions = [
    { value: 'pl', label: 'Polski', flag: '🇵🇱' },
    { value: 'en', label: 'English', flag: '🇬🇧' }
];
const notificationOptions = [
    { key: 'weekBefore', labelKey: 'settingsNotificationWeekBefore' },
    { key: 'dayBefore', labelKey: 'settingsNotificationDayBefore' },
    { key: 'onDate', labelKey: 'settingsNotificationOnDate' }
];

export default function SettingsScreen() {
    const [isSavedToastVisible, setIsSavedToastVisible] = useState(false);
    const { getColor, settings, translate, updateSettings } = useSettings();
    const patientInfo = settings.patientInfo || {};
    const notificationPreferences = settings.notificationPreferences || {};

    const updatePatientInfo = (key, value) => {
        updateSettings({
            patientInfo: {
                ...patientInfo,
                [key]: value
            }
        });
    };

    const updateNotificationPreference = (key, value) => {
        updateSettings({
            notificationPreferences: {
                ...notificationPreferences,
                [key]: value
            }
        });
    };

    const showSavedToast = () => {
        setIsSavedToastVisible(true);
        setTimeout(() => setIsSavedToastVisible(false), 2600);
    };

    const styles = {
        savedToastArea: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20
        },
        savedToast: {
            marginHorizontal: 16,
            marginTop: 8,
            borderColor: getColor('secondary'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            padding: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            elevation: 8
        },
        savedIcon: {
            width: 42,
            height: 42,
            borderRadius: 21,
            borderColor: getColor('secondary'),
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        savedText: {
            fontFamily: 'KGRedHands',
            fontSize: 16,
            color: getColor('secondary')
        },
        screen: {
            paddingBottom: 0
        },
        content: {
            paddingBottom: 24
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
            marginBottom: 18
        },
        infoBox: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
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
        optionRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10
        },
        option: {
            minHeight: 42,
            borderRadius: 14,
            borderWidth: 1,
            flex: 1,
            paddingHorizontal: 14,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getColor('surface')
        },
        optionContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
        },
        flag: {
            fontSize: 16,
            lineHeight: 20
        },
        optionText: {
            fontFamily: 'KGRedHands',
            fontSize: 13,
            textAlign: 'center'
        },
        switchRow: {
            minHeight: 52,
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            paddingHorizontal: 14,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
        },
        switchLabel: {
            flex: 1,
            fontSize: 14,
            lineHeight: 20,
            color: getColor('text')
        },
        saveSection: {
            marginTop: 12,
            paddingTop: 24
        },
        saveButton: {
            minHeight: 52,
            borderRadius: 14,
            backgroundColor: getColor('secondary'),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            marginTop: 4
        },
        saveButtonText: {
            fontFamily: 'KGRedHands',
            fontSize: 15,
            color: getColor('primary'),
            textAlign: 'center'
        },
        version: {
            fontSize: 10,
            lineHeight: 16,
            color: getColor('muted'),
            textAlign: 'center',
            marginTop: 16
        }
    };

    const renderOption = ({ value, label, labelKey, iconName, flag }, selectedValue, onSelect) => {
        const isSelected = selectedValue === value;

        return (
            <TouchableOpacity
                key={value}
                activeOpacity={0.8}
                onPress={() => onSelect(value)}
                style={[
                    styles.option,
                    {
                        backgroundColor: isSelected ? getColor('secondary') : getColor('surface'),
                        borderColor: isSelected ? getColor('secondary') : getColor('border')
                    }
                ]}
            >
                <View style={styles.optionContent}>
                    {iconName && (
                        <FontAwesome6
                            name={iconName}
                            size={14}
                            color={isSelected ? getColor('primary') : getColor('secondary')}
                        />
                    )}
                    {flag && (
                        <Text style={styles.flag}>{flag}</Text>
                    )}
                    <Text
                        style={[
                            styles.optionText,
                            { color: isSelected ? getColor('primary') : getColor('text') }
                        ]}
                    >
                        {label || translate(labelKey)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Container additionalStyle={styles.screen}>
            {isSavedToastVisible && (
                <SafeAreaView edges={['top']} pointerEvents='none' style={styles.savedToastArea}>
                    <View style={styles.savedToast}>
                        <View style={styles.savedIcon}>
                            <FontAwesome6
                                name='check'
                                size={17}
                                color={getColor('secondary')}
                            />
                        </View>
                        <Text style={styles.savedText}>{translate('settingsSaved')}</Text>
                    </View>
                </SafeAreaView>
            )}
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{translate('settingsTitle')}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{translate('settingsPatientSection')}</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>{translate('settingsPatientPrivacy')}</Text>
                    </View>

                    <PatientInfoForm
                        patientInfo={patientInfo}
                        onChange={updatePatientInfo}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{translate('settingsNotificationsSection')}</Text>

                    {notificationOptions.map((option) => {
                        const isEnabled = notificationPreferences[option.key] !== false;

                        return (
                            <View key={option.key} style={styles.switchRow}>
                                <Text style={styles.switchLabel}>{translate(option.labelKey)}</Text>
                                <Switch
                                    onValueChange={(value) => updateNotificationPreference(option.key, value)}
                                    thumbColor={isEnabled ? '#FFFFFF' : getColor('muted')}
                                    trackColor={{
                                        false: getColor('border'),
                                        true: getColor('secondary')
                                    }}
                                    value={isEnabled}
                                />
                            </View>
                        );
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

                </View>

                <View style={styles.saveSection}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={showSavedToast}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>{translate('settingsSave')}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.version}>
                    {translate('version')} {appConfig.expo.version}
                </Text>
            </ScrollView>
        </Container>
    )
}
