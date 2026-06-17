import { useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import Container from '../components/Container';
import {
    formatDateInputValue,
    getTodayDateInputValue,
    parseDateInputValue
} from '../utils/donations';

import { useSettings } from '../SettingsProvider';

export default function DonationFormScreen({ onBack }) {
    const { getColor, settings, translate, updateSettings } = useSettings();
    const [place, setPlace] = useState(settings.patientInfo?.preferredCenter || '');
    const [selectedDate, setSelectedDate] = useState(parseDateInputValue(getTodayDateInputValue()));
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const handleDateChange = (event, date) => {
        if (event.type === 'dismissed') {
            setIsDatePickerVisible(false);
            return;
        }

        setSelectedDate(date || selectedDate);
        if (Platform.OS !== 'ios') setIsDatePickerVisible(false);
    };

    const saveDonation = async () => {
        const donation = {
            id: `donation-${Date.now()}`,
            date: formatDateInputValue(selectedDate),
            place: place || translate('donationPlaceFallback')
        };

        await updateSettings({
            donations: [
                donation,
                ...(settings.donations || [])
            ]
        });
        onBack();
    };

    const styles = {
        screen: {
            paddingBottom: 0
        },
        content: {
            paddingBottom: 140
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginTop: 24,
            marginBottom: 32
        },
        backButton: {
            width: 40,
            minHeight: 48,
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12
        },
        title: {
            flex: 1,
            fontFamily: 'KGRedHands',
            fontSize: 24,
            color: getColor('secondary')
        },
        intro: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            padding: 14,
            marginBottom: 18
        },
        introText: {
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
        dateButton: {
            justifyContent: 'center'
        },
        dateText: {
            color: getColor('text'),
            fontSize: 15
        },
        primaryButton: {
            minHeight: 52,
            borderRadius: 8,
            backgroundColor: getColor('secondary'),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            marginTop: 8
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
                <View style={styles.header}>
                    <TouchableOpacity
                        accessibilityLabel={translate('back')}
                        accessibilityRole='button'
                        activeOpacity={0.75}
                        onPress={onBack}
                        style={styles.backButton}
                    >
                        <FontAwesome6
                            name='chevron-left'
                            size={16}
                            color={getColor('secondary')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>{translate('donationFormTitle')}</Text>
                </View>

                <View style={styles.intro}>
                    <Text style={styles.introText}>{translate('donationFormIntro')}</Text>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>{translate('donationPlace')}</Text>
                    <TextInput
                        blurOnSubmit={true}
                        onChangeText={setPlace}
                        placeholder={translate('donationPlacePlaceholder')}
                        placeholderTextColor={getColor('muted')}
                        returnKeyType='done'
                        selectionColor={getColor('secondary')}
                        style={styles.input}
                        value={place}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>{translate('donationDate')}</Text>
                    <TouchableOpacity
                        accessibilityRole='button'
                        activeOpacity={0.8}
                        onPress={() => setIsDatePickerVisible(true)}
                        style={[styles.input, styles.dateButton]}
                    >
                        <Text style={styles.dateText}>{formatDateInputValue(selectedDate)}</Text>
                    </TouchableOpacity>
                    {isDatePickerVisible && (
                        <DateTimePicker
                            maximumDate={new Date()}
                            mode='date'
                            onChange={handleDateChange}
                            value={selectedDate}
                        />
                    )}
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={saveDonation}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>{translate('donationSave')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    )
}
