import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';

import { useSettings } from '../SettingsProvider';

const tabs = [
    { key: 'faq', labelKey: 'tabFaq', icon: 'circle-question' },
    { key: 'home', labelKey: 'tabHome', icon: 'house' },
    { key: 'settings', labelKey: 'tabSettings', icon: 'gear' }
];

export default function BottomTabBar({ activeTab, onChange }) {
    const { getColor, translate } = useSettings();

    const styles = {
        safeArea: {
            backgroundColor: getColor('primary'),
            borderTopColor: getColor('border'),
            borderTopWidth: 1
        },
        tabBar: {
            flexDirection: 'row',
            height: 60
        },
        tab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5
        },
        label: {
            fontFamily: 'KGRedHands',
            fontSize: 11,
            textAlign: 'center'
        }
    };

    return (
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
            <View style={styles.tabBar}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            accessibilityRole='tab'
                            accessibilityState={{ selected: isActive }}
                            activeOpacity={0.75}
                            onPress={() => onChange(tab.key)}
                            style={styles.tab}
                        >
                            <FontAwesome6
                                name={tab.icon}
                                size={20}
                                color={isActive ? getColor('secondary') : getColor('muted')}
                            />
                            <Text
                                style={[
                                    styles.label,
                                    { color: isActive ? getColor('secondary') : getColor('muted') }
                                ]}
                            >
                                {translate(tab.labelKey)}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}
