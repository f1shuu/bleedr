import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import Button from './Button';

import { useSettings } from '../SettingsProvider';

export default function CustomModal({ isVisible, text, twoButtons, buttonOneText, buttonOneOnPress, buttonTwoText, buttonTwoOnPress }) {
    const { getColor } = useSettings();

    const styles = {
        modal: {
            backgroundColor: getColor('primary'),
            position: 'absolute',
            bottom: 0,
            width: '100%',
            margin: 0,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        },
        text: {
            fontFamily: 'KGRedHands',
            fontSize: 18,
            color: getColor('secondary'),
            textAlign: 'center',
            marginHorizontal: 40
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20
        }
    }

    return (
        <Modal isVisible={isVisible} style={[styles.modal, { height: (twoButtons ? '30%' : '25%') }]} backdropTransitionOutTiming={1} >
            <Text style={styles.text}>{text}</Text>
            {twoButtons ? (<View style={styles.row}>
                <Button onPress={buttonOneOnPress} text={buttonOneText} />
                <Button onPress={buttonTwoOnPress} text={buttonTwoText} />
            </View>) :
                <View style={styles.row}>
                    <Button onPress={buttonOneOnPress} text={buttonOneText} />
                </View>}
        </Modal >
    )
}
