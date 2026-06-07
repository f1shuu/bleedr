import { Dropdown } from 'react-native-element-dropdown';

import colors from '../constants/colors';

import { useSettings } from '../SettingsProvider';

export default function CustomDropdown({ data, placeholder, value, onFocus, onBlur, onChange }) {
    const { getColor } = useSettings();

    const styles = {
        dropdown: {
            width: '100%',
            backgroundColor: getColor('secondary'),
            height: 50,
            borderRadius: 15,
            padding: 15,
            marginVertical: 10
        },
        container: {
            backgroundColor: getColor('primary'),
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderWidth: 0
        },
        itemText: {
            fontFamily: 'KGRedHands',
            color: getColor('secondary')
        },
        placeholder: {
            fontFamily: 'KGRedHands',
            color: colors.placeholder
        },
        selectedText: {
            fontFamily: 'KGRedHands',
            color: getColor('primary')
        }
    }

    return (
        <Dropdown
            style={styles.dropdown}
            containerStyle={styles.container}
            itemTextStyle={styles.itemText}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            activeColor={getColor('primary')}
            data={data}
            labelField='value'
            valueField='value'
            placeholder={placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(item) => onChange?.(item?.value)}
        />
    )
}
