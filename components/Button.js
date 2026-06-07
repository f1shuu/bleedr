import { Text, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';

import { useSettings } from '../SettingsProvider';

export default function Button({ onPress, text, type }) {
    const { getColor } = useSettings();

    const styles = {
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 10
        },
        text: {
            fontFamily: 'KGRedHands',
            fontSize: 14,
            textAlign: 'center',
            textAlignVertical: 'center'
        }
    }

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: (type === 'delete' ? colors.red : getColor('secondary')) }]} activeOpacity={0.8}>
            <Text style={[styles.text, { color: type === 'delete' ? colors.white : getColor('primary') }]}>{text}</Text>
        </TouchableOpacity>
    )
}
