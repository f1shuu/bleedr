import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import Container from '../components/Container';

import { useSettings } from '../SettingsProvider';

const formatDate = (date, language) => (
    new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(new Date(date))
);

export default function DonationHistoryScreen({ donations, onBack }) {
    const { getColor, settings, translate } = useSettings();

    const styles = {
        screen: {
            paddingBottom: 0
        },
        content: {
            paddingBottom: 26
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginTop: 24,
            marginBottom: 32
        },
        backButton: {
            width: 48,
            height: 48,
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
        historyItem: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            padding: 14,
            marginBottom: 10
        },
        historyDate: {
            fontFamily: 'KGRedHands',
            fontSize: 16,
            color: getColor('text'),
            marginBottom: 6
        },
        historyPlace: {
            fontSize: 14,
            lineHeight: 20,
            color: getColor('muted')
        }
    };

    return (
        <Container additionalStyle={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.content}
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
                    <Text style={styles.title}>{translate('allDonationsTitle')}</Text>
                </View>

                {donations.map((donation) => (
                    <View key={donation.id} style={styles.historyItem}>
                        <Text style={styles.historyDate}>
                            {formatDate(donation.date, settings.language)}
                        </Text>
                        <Text style={styles.historyPlace}>{donation.place}</Text>
                    </View>
                ))}
            </ScrollView>
        </Container>
    )
}
