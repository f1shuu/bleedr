import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { useSettings } from '../SettingsProvider';

export default function CustomModal({ isVisible, text, twoButtons, buttonOneText, buttonOneOnPress, buttonTwoText, buttonTwoOnPress }) {
    const { getColor } = useSettings();

    const styles = {
        wrapper: {
            justifyContent: 'flex-end',
            margin: 28
        },
        modal: {
            backgroundColor: getColor('surface'),
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 18,
            paddingHorizontal: 20,
            paddingVertical: 18,
            width: '100%'
        },
        text: {
            fontFamily: 'KGRedHands',
            fontSize: 16,
            lineHeight: 22,
            color: getColor('text'),
            textAlign: 'center',
            marginHorizontal: 6
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 18
        },
        textButton: {
            minHeight: 38,
            justifyContent: 'center',
            paddingHorizontal: 4
        },
        cancelText: {
            fontFamily: 'KGRedHands',
            fontSize: 14,
            color: getColor('muted')
        },
        actionText: {
            fontFamily: 'KGRedHands',
            fontSize: 14,
            color: getColor('secondary')
        }
    }

    return (
        <Modal isVisible={isVisible} style={styles.wrapper} backdropTransitionOutTiming={1}>
            <View style={styles.modal}>
                <Text style={styles.text}>{text}</Text>
            {twoButtons ? (<View style={styles.row}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={buttonTwoOnPress}
                    style={styles.textButton}
                >
                    <Text style={styles.cancelText}>{buttonTwoText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={buttonOneOnPress}
                    style={styles.textButton}
                >
                    <Text style={styles.actionText}>{buttonOneText}</Text>
                </TouchableOpacity>
            </View>) :
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={buttonOneOnPress}
                        style={styles.textButton}
                    >
                        <Text style={styles.actionText}>{buttonOneText}</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </Modal >
    )
}
