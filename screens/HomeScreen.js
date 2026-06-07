import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import Container from '../components/Container';
import { fallbackDonationCenters } from '../constants/homeMockData';
import DonationFormScreen from './DonationFormScreen';
import DonationHistoryScreen from './DonationHistoryScreen';
import { searchNearbyDonationCenters } from '../services/places';
import {
    calculateNextDonationDate,
    getSortedDonations,
    getTotalDonatedMl,
    parseDateInputValue
} from '../utils/donations';

import { useSettings } from '../SettingsProvider';

const DEFAULT_REGION = {
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.18,
    longitudeDelta: 0.18
};

const formatDate = (date, language) => (
    new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(typeof date === 'string' ? parseDateInputValue(date) : date)
);

const formatDonationVolume = (milliliters, language) => (
    `${new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-US').format(milliliters)} ml`
);

export default function HomeScreen() {
    const { getColor, settings, translate } = useSettings();
    const [userLocation, setUserLocation] = useState(null);
    const [centers, setCenters] = useState(fallbackDonationCenters);
    const [placesStatus, setPlacesStatus] = useState('idle');
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
    const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadCenters = async () => {
            setIsLoadingPlaces(true);

            try {
                const permission = await Location.requestForegroundPermissionsAsync();

                if (permission.status !== 'granted') {
                    if (isMounted) setPlacesStatus('location-denied');
                    return;
                }

                const currentPosition = await Location.getCurrentPositionAsync({});
                const currentLocation = {
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude
                };

                if (isMounted) setUserLocation(currentLocation);

                const result = await searchNearbyDonationCenters({
                    ...currentLocation,
                    languageCode: settings.language
                });

                if (!isMounted) return;

                setPlacesStatus(result.status);
                if (result.places.length > 0) setCenters(result.places);
            } catch (error) {
                console.error(error);
                if (isMounted) setPlacesStatus('error');
            } finally {
                if (isMounted) setIsLoadingPlaces(false);
            }
        };

        loadCenters();

        return () => {
            isMounted = false;
        };
    }, [settings.language]);

    const mapRegion = useMemo(() => {
        if (!userLocation) {
            const firstCenter = centers[0];

            if (firstCenter) {
                return {
                    latitude: firstCenter.latitude,
                    longitude: firstCenter.longitude,
                    latitudeDelta: 0.18,
                    longitudeDelta: 0.18
                };
            }

            return DEFAULT_REGION;
        }

        return {
            ...userLocation,
            latitudeDelta: 0.18,
            longitudeDelta: 0.18
        };
    }, [centers, userLocation]);

    const statusText = translate(`placesStatus.${placesStatus}`);
    const bloodType = settings.patientInfo?.bloodType || translate('homeNotProvided');
    const sortedDonationHistory = useMemo(() => (
        getSortedDonations(settings.donations || [])
    ), [settings.donations]);
    const recentDonationHistory = sortedDonationHistory.slice(0, 3);
    const hasMoreDonationHistory = sortedDonationHistory.length > recentDonationHistory.length;
    const totalDonatedMl = getTotalDonatedMl(sortedDonationHistory);
    const nextDonationDate = calculateNextDonationDate(
        sortedDonationHistory,
        settings.patientInfo?.sex
    );

    if (isHistoryOpen) {
        return (
            <DonationHistoryScreen
                donations={sortedDonationHistory}
                onBack={() => setIsHistoryOpen(false)}
            />
        );
    }

    if (isDonationFormOpen) {
        return (
            <DonationFormScreen onBack={() => setIsDonationFormOpen(false)} />
        );
    }

    const styles = {
        screen: {
            paddingBottom: 0
        },
        content: {
            paddingBottom: 26
        },
        hero: {
            alignItems: 'center',
            marginTop: 64,
            marginBottom: 64
        },
        logo: {
            width: 140,
            height: 140,
            borderRadius: 70,
            marginBottom: 14
        },
        greeting: {
            fontFamily: 'KGRedHands',
            fontSize: 16,
            lineHeight: 22,
            color: getColor('text'),
            textAlign: 'center'
        },
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10
        },
        statCard: {
            flexGrow: 1,
            flexBasis: '47%',
            minHeight: 82,
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 14,
            paddingVertical: 12,
            justifyContent: 'space-between'
        },
        statLabel: {
            fontSize: 13,
            lineHeight: 18,
            color: getColor('muted')
        },
        statValue: {
            fontFamily: 'KGRedHands',
            fontSize: 21,
            color: getColor('secondary'),
            flexShrink: 1
        },
        section: {
            marginTop: 32
        },
        sectionTitle: {
            fontFamily: 'KGRedHands',
            fontSize: 18,
            color: getColor('secondary'),
            marginBottom: 12
        },
        historyItem: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            padding: 14,
            marginBottom: 10
        },
        historyDate: {
            fontFamily: 'KGRedHands',
            fontSize: 16,
            color: getColor('text'),
            marginBottom: 6
        },
        historyPlace: {
            fontSize: 14,
            lineHeight: 20,
            color: getColor('muted')
        },
        showAllButton: {
            height: 44,
            borderColor: getColor('secondary'),
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2
        },
        showAllText: {
            fontFamily: 'KGRedHands',
            fontSize: 14,
            color: getColor('secondary')
        },
        mapCard: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            overflow: 'hidden'
        },
        map: {
            height: 230
        },
        mapFooter: {
            padding: 14,
            borderTopColor: getColor('border'),
            borderTopWidth: 1
        },
        statusRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10
        },
        statusText: {
            flex: 1,
            fontSize: 13,
            lineHeight: 18,
            color: getColor('muted')
        },
        centerItem: {
            marginTop: 8
        },
        centerName: {
            fontFamily: 'KGRedHands',
            fontSize: 15,
            color: getColor('text')
        },
        centerAddress: {
            fontSize: 13,
            lineHeight: 18,
            color: getColor('muted'),
            marginTop: 3
        }
    };

    return (
        <Container additionalStyle={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.hero}>
                    <TouchableOpacity
                        accessibilityLabel={translate('donationFormTitle')}
                        accessibilityRole='button'
                        activeOpacity={0.8}
                        onPress={() => setIsDonationFormOpen(true)}
                    >
                        <Image
                            source={require('../assets/images/icon.png')}
                            resizeMode='contain'
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                    <Text style={styles.greeting}>{translate('homeDonationPrompt')}</Text>
                </View>

                <View style={styles.grid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>{translate('homeBloodType')}</Text>
                        <Text numberOfLines={1} style={styles.statValue}>{bloodType}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>{translate('homeTotalDonated')}</Text>
                        <Text numberOfLines={1} style={styles.statValue}>
                            {formatDonationVolume(totalDonatedMl, settings.language)}
                        </Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>{translate('homeNextDonation')}</Text>
                        <Text numberOfLines={1} style={styles.statValue}>
                            {nextDonationDate
                                ? formatDate(nextDonationDate, settings.language)
                                : translate('homeNotProvided')}
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{translate('homeDonationHistory')}</Text>
                    {recentDonationHistory.length === 0 ? (
                        <Text style={styles.historyPlace}>{translate('homeDonationHistoryEmpty')}</Text>
                    ) : (
                        recentDonationHistory.map((donation) => (
                            <View key={donation.id} style={styles.historyItem}>
                                <Text style={styles.historyDate}>
                                    {formatDate(donation.date, settings.language)}
                                </Text>
                                <Text style={styles.historyPlace}>{donation.place}</Text>
                            </View>
                        ))
                    )}
                    {hasMoreDonationHistory && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setIsHistoryOpen(true)}
                            style={styles.showAllButton}
                        >
                            <Text style={styles.showAllText}>{translate('showAllDonations')}</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{translate('homeNearbyCenters')}</Text>
                    <View style={styles.mapCard}>
                        <MapView
                            initialRegion={mapRegion}
                            region={mapRegion}
                            style={styles.map}
                        >
                            {userLocation && (
                                <Marker
                                    coordinate={userLocation}
                                    pinColor={getColor('secondary')}
                                    title={translate('homeYourLocation')}
                                />
                            )}
                            {centers.map((center) => (
                                <Marker
                                    key={center.id}
                                    coordinate={{
                                        latitude: center.latitude,
                                        longitude: center.longitude
                                    }}
                                    title={center.name}
                                    description={center.address}
                                />
                            ))}
                        </MapView>
                        <View style={styles.mapFooter}>
                            <View style={styles.statusRow}>
                                {isLoadingPlaces && (
                                    <ActivityIndicator color={getColor('secondary')} size='small' />
                                )}
                                <Text style={styles.statusText}>{statusText}</Text>
                            </View>
                            {centers.slice(0, 3).map((center) => (
                                <View key={center.id} style={styles.centerItem}>
                                    <Text style={styles.centerName}>{center.name}</Text>
                                    <Text style={styles.centerAddress}>{center.address}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}
