import { Text, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import { useSettings } from '../SettingsProvider';

export default function AchievementItem({ achievement }) {
    const { getColor } = useSettings();
    const accentColor = achievement.isUnlocked
        ? achievement.color || getColor('secondary')
        : getColor('muted');

    const styles = {
        item: {
            borderColor: achievement.isUnlocked ? accentColor : getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            padding: 14,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            opacity: achievement.isUnlocked ? 1 : 0.68
        },
        iconBox: {
            width: 46,
            height: 46,
            borderRadius: 23,
            borderColor: accentColor,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            flex: 1
        },
        name: {
            fontFamily: 'KGRedHands',
            fontSize: 15,
            lineHeight: 20,
            color: achievement.isUnlocked ? accentColor : getColor('muted'),
            marginBottom: 5
        },
        description: {
            fontSize: 13,
            lineHeight: 19,
            color: achievement.isUnlocked ? getColor('text') : getColor('muted')
        }
    };

    return (
        <View style={styles.item}>
            <View style={styles.iconBox}>
                <FontAwesome6
                    name={achievement.icon}
                    size={19}
                    color={accentColor}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{achievement.name}</Text>
                <Text style={styles.description}>{achievement.description}</Text>
            </View>
        </View>
    )
}
