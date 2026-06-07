import { View } from 'react-native';

import { useSettings } from '../SettingsProvider';

export default function Container({ additionalStyle, children }) {
    const { getColor } = useSettings();

    const styles = {
        container: {
            flex: 1,
            padding: 20,
            paddingBottom: 30,
            backgroundColor: getColor('primary')
        }
    }

    return (
        <View style={[styles.container, additionalStyle]}>
            {children}
        </View>
    )
}