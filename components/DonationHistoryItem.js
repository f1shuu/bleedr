import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import { useSettings } from '../SettingsProvider';

export default function DonationHistoryItem({ donation, formattedDate, onDelete }) {
    const { getColor, translate } = useSettings();

    const styles = {
        historyItem: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            padding: 14,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12
        },
        content: {
            flex: 1
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
        },
        deleteButton: {
            width: 42,
            height: 42,
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('primary'),
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    return (
        <View style={styles.historyItem}>
            <View style={styles.content}>
                <Text style={styles.historyDate}>{formattedDate}</Text>
                <Text style={styles.historyPlace}>{donation.place}</Text>
            </View>
            <TouchableOpacity
                accessibilityLabel={translate('deleteDonation')}
                accessibilityRole='button'
                activeOpacity={0.75}
                onPress={() => onDelete(donation)}
                style={styles.deleteButton}
            >
                <FontAwesome6
                    name='trash-can'
                    size={16}
                    color={getColor('secondary')}
                />
            </TouchableOpacity>
        </View>
    )
}
