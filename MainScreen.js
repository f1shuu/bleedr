import { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BottomTabBar from './components/BottomTabBar';
import FaqScreen from './screens/FaqScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SettingsScreen from './screens/SettingsScreen';

import { useSettings } from './SettingsProvider';

const TABS = {
    faq: FaqScreen,
    home: HomeScreen,
    settings: SettingsScreen
};

export default function MainScreen() {
    const [activeTab, setActiveTab] = useState('home');
    const { getColor, settings } = useSettings();

    const ActiveScreen = TABS[activeTab] || HomeScreen;

    const styles = {
        app: {
            flex: 1,
            backgroundColor: getColor('primary')
        },
        content: {
            flex: 1
        }
    };

    return (
        <View style={styles.app}>
            <StatusBar style={settings.theme === 'dark' ? 'light' : 'dark'} />
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
        </View>
    )
}
