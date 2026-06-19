import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import AchievementItem from '../components/AchievementItem';
import AchievementToast from '../components/AchievementToast';
import Container from '../components/Container';
import DonationHistoryItem from '../components/DonationHistoryItem';
import Modal from '../components/Modal';
import AchievementListScreen from './AchievementListScreen';
import DonationFormScreen from './DonationFormScreen';
import DonationHistoryScreen from './DonationHistoryScreen';
import { notifyAchievementUnlocked } from '../services/notifications';
import { hasMapsApiKey, hasPlacesApiKey, searchNearbyDonationCenters } from '../services/places';
import { getAchievements, getNewlyUnlockedAchievements } from '../utils/achievements';
import {
    calculateNextDonationDate,
    formatDonationDate,
    formatDonationVolume,
    getSortedDonations,
    getTotalDonatedMl
} from '../utils/donations';

import { useSettings } from '../SettingsProvider';

const DEFAULT_REGION = {
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.18,
    longitudeDelta: 0.18
};

export default function HomeScreen() {
    const { getColor, settings, translate, updateSettings } = useSettings();
    const [userLocation, setUserLocation] = useState(null);
    const [centers, setCenters] = useState([]);
    const [placesStatus, setPlacesStatus] = useState('idle');
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
    const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
    const [donationToDelete, setDonationToDelete] = useState(null);
    const [achievementToastQueue, setAchievementToastQueue] = useState([]);

    const loadNearbyCenters = useCallback(async () => {
        if (!hasPlacesApiKey()) {
            setCenters([]);
            setUserLocation(null);
            setPlacesStatus('missing-api-key');
            return;
        }

        setIsLoadingPlaces(true);

        try {
            const permission = await Location.requestForegroundPermissionsAsync();

            if (permission.status !== 'granted') {
                setCenters([]);
                setUserLocation(null);
                setPlacesStatus('location-denied');
                return;
            }

            const currentPosition = await Location.getCurrentPositionAsync({});
            const currentLocation = {
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude
            };

            setUserLocation(currentLocation);

            const result = await searchNearbyDonationCenters({
                ...currentLocation,
                languageCode: settings.language
            });

            setPlacesStatus(result.status);
            setCenters(result.places);
        } catch (error) {
            console.error(error);
            setPlacesStatus('error');
        } finally {
            setIsLoadingPlaces(false);
        }
    }, [settings.language]);

    const faqItems = translate('faqItems');
    const faqItemCount = Array.isArray(faqItems) ? faqItems.length : 0;
    const achievements = useMemo(() => (
        getAchievements({ settings, faqItemCount, translate })
    ), [faqItemCount, settings, translate]);
    const currentAchievementToast = achievementToastQueue[0];

    useEffect(() => {
        const newlyUnlockedAchievements = getNewlyUnlockedAchievements(
            achievements,
            settings.unlockedAchievementIds || []
        );

        if (newlyUnlockedAchievements.length === 0) return;

        const unlockedAchievementIds = Array.from(new Set([
            ...(settings.unlockedAchievementIds || []),
            ...newlyUnlockedAchievements.map((achievement) => achievement.id)
        ]));

        updateSettings({ unlockedAchievementIds });
        setAchievementToastQueue((currentQueue) => ([
            ...currentQueue,
            ...newlyUnlockedAchievements
        ]));
        newlyUnlockedAchievements.forEach((achievement) => {
            notifyAchievementUnlocked(achievement).catch(console.error);
        });
    }, [achievements, settings.unlockedAchievementIds, updateSettings]);

    useEffect(() => {
        if (!currentAchievementToast) return undefined;

        const timer = setTimeout(() => {
            setAchievementToastQueue((currentQueue) => currentQueue.slice(1));
        }, 4200);

        return () => clearTimeout(timer);
    }, [currentAchievementToast?.id]);

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
    const canRenderMap = hasMapsApiKey();
    const bloodType = settings.patientInfo?.bloodType || translate('homeNotProvided');
    const sortedDonationHistory = useMemo(() => (
        getSortedDonations(settings.donations || [])
    ), [settings.donations]);
    const recentDonationHistory = sortedDonationHistory.slice(0, 3);
    const hasMoreDonationHistory = sortedDonationHistory.length > recentDonationHistory.length;
    const recentAchievements = achievements.slice(0, 3);
    const hasMoreAchievements = achievements.length > recentAchievements.length;
    const totalDonatedMl = getTotalDonatedMl(sortedDonationHistory);
    const nextDonationDate = calculateNextDonationDate(
        sortedDonationHistory,
        settings.patientInfo?.sex
    );

    const confirmDeleteDonation = async () => {
        if (!donationToDelete) return;

        await updateSettings({
            donations: (settings.donations || []).filter((donation) => donation.id !== donationToDelete.id)
        });
        setDonationToDelete(null);
    };

    if (isHistoryOpen) {
        return (
            <DonationHistoryScreen
                donations={sortedDonationHistory}
                onBack={() => setIsHistoryOpen(false)}
            />
        );
    }

    if (isAchievementsOpen) {
        return (
            <AchievementListScreen
                achievements={achievements}
                onBack={() => setIsAchievementsOpen(false)}
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
            marginBottom: 20,
            elevation: 3
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
            borderRadius: 14,
            backgroundColor: getColor('surface'),
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
            marginBottom: 18
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
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2
        },
        showAllText: {
            fontFamily: 'KGRedHands',
            fontSize: 14,
            color: getColor('secondary')
        },
        loadCentersButton: {
            minHeight: 44,
            borderColor: getColor('secondary'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 14,
            marginBottom: 12,
            flexDirection: 'row',
            gap: 8,
            opacity: isLoadingPlaces ? 0.68 : 1
        },
        loadCentersButtonText: {
            fontFamily: 'KGRedHands',
            fontSize: 13,
            color: getColor('secondary'),
            textAlign: 'center'
        },
        mapCard: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 14,
            backgroundColor: getColor('surface'),
            overflow: 'hidden'
        },
        map: {
            height: 230
        },
        mapUnavailable: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18
        },
        mapUnavailableText: {
            fontSize: 13,
            lineHeight: 19,
            color: getColor('muted'),
            textAlign: 'center'
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
            marginTop: 10,
            marginBottom: 10
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
        },
        emptyCentersText: {
            fontSize: 13,
            lineHeight: 18,
            color: getColor('muted'),
            marginTop: 8
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
                                ? formatDonationDate(nextDonationDate, settings.language)
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
                            <DonationHistoryItem
                                key={donation.id}
                                donation={donation}
                                formattedDate={formatDonationDate(donation.date, settings.language)}
                                onDelete={setDonationToDelete}
                            />
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
                        {canRenderMap ? (
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
                        ) : (
                            <View style={[styles.map, styles.mapUnavailable]}>
                                <Text style={styles.mapUnavailableText}>
                                    {translate('homeMapUnavailable')}
                                </Text>
                            </View>
                        )}
                        <View style={styles.mapFooter}>
                            <TouchableOpacity
                                accessibilityRole='button'
                                activeOpacity={0.8}
                                disabled={isLoadingPlaces}
                                onPress={loadNearbyCenters}
                                style={styles.loadCentersButton}
                            >
                                {isLoadingPlaces && (
                                    <ActivityIndicator color={getColor('secondary')} size='small' />
                                )}
                                <Text style={styles.loadCentersButtonText}>
                                    {translate('homeLoadNearbyCenters')}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.statusRow}>
                                <Text style={styles.statusText}>{statusText}</Text>
                            </View>
                            {centers.length === 0 ? (
                                <Text style={styles.emptyCentersText}>{translate('homeNearbyCentersEmpty')}</Text>
                            ) : (
                                centers.slice(0, 3).map((center) => (
                                    <View key={center.id} style={styles.centerItem}>
                                        <Text style={styles.centerName}>{center.name}</Text>
                                        <Text style={styles.centerAddress}>{center.address}</Text>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{translate('homeAchievements')}</Text>
                    {recentAchievements.map((achievement) => (
                        <AchievementItem
                            key={achievement.id}
                            achievement={achievement}
                        />
                    ))}
                    {hasMoreAchievements && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setIsAchievementsOpen(true)}
                            style={styles.showAllButton}
                        >
                            <Text style={styles.showAllText}>{translate('showAllAchievements')}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            <AchievementToast achievement={currentAchievementToast} />
            <Modal
                isVisible={Boolean(donationToDelete)}
                text={translate('deleteDonationConfirm')}
                twoButtons={true}
                buttonOneText={translate('deleteDonationConfirmButton')}
                buttonTwoText={translate('deleteDonationCancelButton')}
                buttonOneOnPress={confirmDeleteDonation}
                buttonTwoOnPress={() => setDonationToDelete(null)}
            />
        </Container>
    )
}
