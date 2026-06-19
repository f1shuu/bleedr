import { Text, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '../SettingsProvider';

export default function AchievementToast({ achievement }) {
    const { getColor, translate } = useSettings();
    if (!achievement) return null;

    const accentColor = achievement.color || getColor('secondary');

    const styles = {
        safeArea: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20
        },
        toast: {
            marginHorizontal: 16,
            marginTop: 8,
            borderColor: accentColor,
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            padding: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            elevation: 8
        },
        iconBox: {
            width: 42,
            height: 42,
            borderRadius: 21,
            borderColor: accentColor,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            flex: 1
        },
        label: {
            fontSize: 11,
            lineHeight: 15,
            color: getColor('muted'),
            marginBottom: 3
        },
        name: {
            fontFamily: 'KGRedHands',
            fontSize: 15,
            lineHeight: 20,
            color: accentColor
        }
    };

    return (
        <SafeAreaView edges={['top']} pointerEvents='none' style={styles.safeArea}>
            <View style={styles.toast}>
                <View style={styles.iconBox}>
                    <FontAwesome6
                        name={achievement.icon}
                        size={18}
                        color={accentColor}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.label}>{translate('achievementUnlockedLabel')}</Text>
                    <Text style={styles.name}>{achievement.name}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
