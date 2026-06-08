import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import Container from '../components/Container';
import DonationHistoryItem from '../components/DonationHistoryItem';
import Modal from '../components/Modal';
import { getSortedDonations } from '../utils/donations';

import { useSettings } from '../SettingsProvider';

const formatDate = (date, language) => (
    new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(new Date(date))
);

export default function DonationHistoryScreen({ donations, onBack }) {
    const [donationToDelete, setDonationToDelete] = useState(null);
    const { getColor, settings, translate, updateSettings } = useSettings();
    const sortedDonations = getSortedDonations(donations);

    const confirmDeleteDonation = async () => {
        if (!donationToDelete) return;

        await updateSettings({
            donations: (settings.donations || []).filter((donation) => donation.id !== donationToDelete.id)
        });
        setDonationToDelete(null);
    };

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

                {sortedDonations.map((donation) => (
                    <DonationHistoryItem
                        key={donation.id}
                        donation={donation}
                        formattedDate={formatDate(donation.date, settings.language)}
                        onDelete={setDonationToDelete}
                    />
                ))}
            </ScrollView>
            <Modal
                isVisible={Boolean(donationToDelete)}
                text={translate('deleteDonationConfirm')}
                twoButtons={true}
                buttonOneText={translate('deleteDonationConfirmButton')}
                buttonTwoText={translate('deleteDonationCancelButton')}
                buttonOneOnPress={confirmDeleteDonation}
                buttonTwoOnPress={() => setDonationToDelete(null)}
            />
        </Container>
    )
}
