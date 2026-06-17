import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Container from '../components/Container';
import PatientInfoForm from '../components/PatientInfoForm';

import { useSettings } from '../SettingsProvider';

export default function OnboardingScreen() {
    const { getColor, settings, translate, updateSettings } = useSettings();
    const [patientInfo, setPatientInfo] = useState(settings.patientInfo || {});

    const updatePatientInfo = (key, value) => {
        setPatientInfo((currentPatientInfo) => ({
            ...currentPatientInfo,
            [key]: value
        }));
    };

    const completeOnboarding = async () => {
        await updateSettings({
            patientInfo,
            hasCompletedOnboarding: true
        });
    };

    const styles = {
        screen: {
            paddingBottom: 0
        },
        content: {
            paddingBottom: 150
        },
        hero: {
            alignItems: 'center',
            marginTop: 60,
            marginBottom: 60
        },
        logo: {
            width: 118,
            height: 118,
            borderRadius: 28,
            marginBottom: 16
        },
        title: {
            fontFamily: 'KGRedHands',
            fontSize: 26,
            lineHeight: 32,
            color: getColor('secondary'),
            textAlign: 'center',
            marginBottom: 10
        },
        subtitle: {
            fontSize: 14,
            lineHeight: 21,
            color: getColor('muted'),
            textAlign: 'center'
        },
        infoBox: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            padding: 14,
            marginBottom: 18
        },
        infoText: {
            fontSize: 13,
            lineHeight: 20,
            color: getColor('muted')
        },
        primaryButton: {
            minHeight: 52,
            borderRadius: 8,
            backgroundColor: getColor('secondary'),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            marginTop: 40
        },
        primaryButtonText: {
            fontFamily: 'KGRedHands',
            fontSize: 15,
            color: getColor('primary'),
            textAlign: 'center'
        }
    };

    return (
        <Container additionalStyle={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.hero}>
                    <Image
                        source={require('../assets/images/icon.png')}
                        resizeMode='contain'
                        style={styles.logo}
                    />
                    <Text style={styles.title}>{translate('onboardingTitle')}</Text>
                    <Text style={styles.subtitle}>{translate('onboardingSubtitle')}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>{translate('settingsPatientPrivacy')}</Text>
                </View>

                <PatientInfoForm
                    patientInfo={patientInfo}
                    onChange={updatePatientInfo}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={completeOnboarding}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>{translate('onboardingFinish')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    )
}
