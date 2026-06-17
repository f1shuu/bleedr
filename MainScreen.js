import { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BottomTabBar from './components/BottomTabBar';
import FaqScreen from './screens/FaqScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SettingsScreen from './screens/SettingsScreen';
import { syncDonationReminderNotifications } from './services/notifications';

import { useSettings } from './SettingsProvider';

const TABS = {
    faq: FaqScreen,
    home: HomeScreen,
    settings: SettingsScreen
};

export default function MainScreen() {
    const [activeTab, setActiveTab] = useState('home');
    const { getColor, settings, translate } = useSettings();

    const ActiveScreen = TABS[activeTab] || HomeScreen;
    const reminderSignature = useMemo(() => JSON.stringify({
        donations: settings.donations || [],
        language: settings.language,
        notificationPreferences: settings.notificationPreferences || {},
        sex: settings.patientInfo?.sex || '',
        hasCompletedOnboarding: settings.hasCompletedOnboarding
    }), [
        settings.donations,
        settings.hasCompletedOnboarding,
        settings.language,
        settings.notificationPreferences,
        settings.patientInfo?.sex
    ]);

    useEffect(() => {
        syncDonationReminderNotifications({ settings, translate }).catch(console.error);
    }, [reminderSignature, translate]);

    const styles = {
        app: {
            flex: 1,
            backgroundColor: getColor('primary')
        },
        keyboardArea: {
            flex: 1
        },
        content: {
            flex: 1
        }
    };

    return (
        <View style={styles.app}>
            <StatusBar style={settings.theme === 'dark' ? 'light' : 'dark'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardArea}
            >
                {!settings.hasCompletedOnboarding ? (
                    <OnboardingScreen />
                ) : (
                    <>
                        <View style={styles.content}>
                            <ActiveScreen />
                        </View>
                        <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    )
}
