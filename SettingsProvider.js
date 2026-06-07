import { useCallback, useMemo, useState, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import { themes } from './constants/themes';
import { translations } from './constants/translations';

const SettingsContext = createContext();
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_THEME = 'dark';
const DEFAULT_PATIENT_INFO = {
    bloodType: '',
    age: '',
    sex: '',
    weightKg: '',
    city: '',
    preferredCenter: ''
};

const getSupportedLanguage = (languageCode) => (
    translations[languageCode] ? languageCode : DEFAULT_LANGUAGE
);

const getValueByPath = (source, path) => (
    path.split('.').reduce((currentValue, pathPart) => currentValue?.[pathPart], source)
);

export default function SettingsProvider({ children }) {
    const defaultSettings = useMemo(() => ({
        language: getSupportedLanguage(Localization.getLocales()[0]?.languageCode),
        theme: DEFAULT_THEME,
        patientInfo: DEFAULT_PATIENT_INFO,
        defaultLogin: null
    }), []);

    const [settings, setSettings] = useState(defaultSettings);

    const normalizeSettings = useCallback((savedSettings = {}) => ({
        ...defaultSettings,
        ...savedSettings,
        patientInfo: {
            ...defaultSettings.patientInfo,
            ...(savedSettings.patientInfo || {})
        },
        language: getSupportedLanguage(savedSettings.language || defaultSettings.language),
        theme: themes[savedSettings.theme] ? savedSettings.theme : defaultSettings.theme
    }), [defaultSettings]);

    const loadSettings = useCallback(async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('settings');

            if (!savedSettings) {
                setSettings(defaultSettings);
                return;
            }

            const parsedSettings = JSON.parse(savedSettings);
            const safeSettings = parsedSettings && typeof parsedSettings === 'object' ? parsedSettings : {};
            setSettings(normalizeSettings(safeSettings));
        } catch (error) {
            console.error(error);
            setSettings(defaultSettings);
        }
    }, [defaultSettings, normalizeSettings]);

    const updateSettings = useCallback(async (newSettings = {}) => {
        const updatedSettings = normalizeSettings({ ...settings, ...newSettings });
        setSettings(updatedSettings);
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(updatedSettings));
        } catch (error) {
            console.error(error);
        }
    }, [normalizeSettings, settings]);

    const restoreDefault = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('settings');
            setSettings(defaultSettings);
        } catch (error) {
            console.error(error);
        }
    }, [defaultSettings]);

    const clearAllData = useCallback(async () => {
        try {
            await AsyncStorage.clear();
            setSettings(defaultSettings);
        } catch (error) {
            console.error(error);
        }
    }, [defaultSettings]);

    const translate = useCallback((key) => (
        translations[settings.language]?.[key]
        || getValueByPath(translations[settings.language], key)
        || translations[DEFAULT_LANGUAGE]?.[key]
        || getValueByPath(translations[DEFAULT_LANGUAGE], key)
        || key
    ), [settings.language]);

    const getColor = useCallback((key) => (
        themes[settings.theme]?.[key] || themes[DEFAULT_THEME]?.[key] || key
    ), [settings.theme]);

    const value = useMemo(() => ({
        settings,
        clearAllData,
        getColor,
        loadSettings,
        restoreDefault,
        translate,
        updateSettings
    }), [settings, clearAllData, getColor, loadSettings, restoreDefault, translate, updateSettings]);

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);
