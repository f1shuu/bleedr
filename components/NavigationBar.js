import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalendarScreen from '../screens/navbar/CalendarScreen';
import HomeScreen from '../screens/navbar/HomeScreen';
import SettingsScreen from '../screens/navbar/SettingsScreen';

const Tab = createBottomTabNavigator();

const customOptions = {
    headerStyle: {
        backgroundColor: '#EF233C'
    },
    headerTitleStyle: {
        fontFamily: 'ab',
        color: '#F6F6F6',
        fontSize: 24
    },
    tabBarStyle: {
        backgroundColor: '#F6F6F6',
        height: 60,
        paddingTop: 20
    },
    tabBarLabel: ''
}

const getIconName = (routeName, focused) => {
    let iconName;

    switch (routeName) {
        case 'Kalendarz':
            iconName = focused ? require('../assets/navbar/calendar-active.png') : require('../assets/navbar/calendar-inactive.png');
            break;
        case 'Donacje':
            iconName = focused ? require('../assets/navbar/donations-active.png') : require('../assets/navbar/donations-inactive.png');
            break;
        case 'Ustawienia':
            iconName = focused ? require('../assets/navbar/settings-active.png') : require('../assets/navbar/settings-inactive.png');
            break;
    }

    return iconName;
}

export default function NavigationBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Donacje" screenOptions={{ cardStyle: { backgroundColor: '#141414' } }}>
                <Tab.Screen
                    name="Kalendarz"
                    component={CalendarScreen}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 35,
                                height: 35,
                                marginBottom: 5
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Donacje"
                    component={HomeScreen}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 70,
                                height: 70,
                                marginBottom: 30
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Ustawienia"
                    component={SettingsScreen}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 35,
                                height: 35,
                                marginBottom: 5
                            }} />
                        )
                    })
                    }
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}