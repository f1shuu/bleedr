import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import MainScreen from './MainScreen';

import { useSettings } from './SettingsProvider';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function Loader() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const { loadSettings } = useSettings();

    useEffect(() => {
        const load = async () => {
            try {
                await Font.loadAsync({
                    'KGRedHands': require('./assets/fonts/KGRedHands.ttf')
                })
                await loadSettings();
            } catch (error) {
                console.error(error);
            } finally {
                setFontsLoaded(true);
            }
        }
        load();
    }, [loadSettings])

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync().catch(console.error);
    }, [fontsLoaded])

    return (
        !fontsLoaded ? null : (
            <MainScreen />
        )
    )
}
