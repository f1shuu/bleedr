import { View, Text, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';

import { useSettings } from '../SettingsProvider';

export default function SegmentedButton({ option1, option2, onOptionChange, selectedOption }) {
    const { getColor } = useSettings();

    const styles = {
        container: {
            flexDirection: 'row',
            height: 50,
            borderRadius: 15,
            overflow: 'hidden',
            marginVertical: 10
        },
        segment: {
            flex: 1,
            paddingVertical: 15,
            alignItems: 'center',
            justifyContent: 'center'
        },
        activeText: {
            fontFamily: 'KGRedHands',
            fontSize: 16,
            color: getColor('primary')
        },
        inactiveText: {
            fontFamily: 'KGRedHands',
            fontSize: 16,
            color: getColor('secondary')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { if (onOptionChange) onOptionChange(option1) }}
                style={[styles.segment, selectedOption === option1 ? { backgroundColor: getColor('secondary') } : { backgroundColor: colors.placeholder }]}
                disabled={selectedOption === option1}
                activeOpacity={0.8}
            >
                <Text style={selectedOption === option1 ? styles.activeText : styles.inactiveText}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { if (onOptionChange) onOptionChange(option2) }}
                style={[styles.segment, selectedOption === option2 ? { backgroundColor: getColor('secondary') } : { backgroundColor: colors.placeholder }]}
                disabled={selectedOption === option2}
                activeOpacity={0.8}
            >
                <Text style={selectedOption === option2 ? styles.activeText : styles.inactiveText}>{option2}</Text>
            </TouchableOpacity>
        </View>
    )
}
