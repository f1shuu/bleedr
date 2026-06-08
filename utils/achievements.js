import {
    parseDateInputValue,
    getSortedDonations,
    getTotalDonatedMl
} from './donations';

const DEFAULT_SEX = 'male';
const REQUIRED_PATIENT_INFO_KEYS = ['bloodType', 'age', 'sex', 'weightKg', 'city', 'preferredCenter'];
const WHOLE_BLOOD_DONATION_ML = 450;

const SPECIAL_COLORS = {
    bronze: '#B87333',
    silver: '#C7CDD4',
    gold: '#E4B83A',
    platinum: '#DDE7F0'
};

const replaceTokens = (text, tokens) => (
    Object.entries(tokens).reduce((result, [key, value]) => (
        result.replace(new RegExp(`{${key}}`, 'g'), value)
    ), text)
);

const normalizeText = (value = '') => (
    value.trim().toLowerCase().replace(/\s+/g, ' ')
);

const inferCityFromPlace = (place = '') => {
    const normalizedPlace = place.trim();
    if (!normalizedPlace) return '';

    const commaParts = normalizedPlace.split(',').map((part) => part.trim()).filter(Boolean);
    if (commaParts.length > 1) return normalizeText(commaParts[commaParts.length - 1]);

    const dashParts = normalizedPlace.split(' - ').map((part) => part.trim()).filter(Boolean);
    if (dashParts.length > 1) return normalizeText(dashParts[dashParts.length - 1]);

    const words = normalizedPlace.split(/\s+/).filter(Boolean);
    return normalizeText(words[words.length - 1] || '');
};

const getDonationDatesAscending = (donations) => (
    getSortedDonations(donations)
        .map((donation) => parseDateInputValue(donation.date))
        .filter(Boolean)
        .sort((firstDate, secondDate) => firstDate - secondDate)
);

const hasFastDonationReturn = (donations) => {
    const dates = getDonationDatesAscending(donations);

    return dates.some((date, index) => {
        if (index === 0) return false;

        const previousDate = dates[index - 1];
        const daysBetween = Math.round((date - previousDate) / (1000 * 60 * 60 * 24));

        return daysBetween > 0 && daysBetween <= 60;
    });
};

const hasThreeDonationsInRollingYear = (donations) => {
    const dates = getDonationDatesAscending(donations);

    return dates.some((date, index) => {
        const windowStart = new Date(date);
        windowStart.setDate(windowStart.getDate() - 365);

        const donationsInWindow = dates
            .slice(0, index + 1)
            .filter((donationDate) => donationDate > windowStart && donationDate <= date);

        return donationsInWindow.length >= 3;
    });
};

const hasRepeatedCenter = (donations, minimumVisits) => {
    const visitCounts = donations.reduce((counts, donation) => {
        const place = normalizeText(donation.place);
        if (!place) return counts;

        return {
            ...counts,
            [place]: (counts[place] || 0) + 1
        };
    }, {});

    return Object.values(visitCounts).some((count) => count >= minimumVisits);
};

const hasTwoCitiesAndCenters = (donations) => {
    const places = new Set();
    const cities = new Set();

    donations.forEach((donation) => {
        const place = normalizeText(donation.place);
        const city = inferCityFromPlace(donation.place);

        if (place) places.add(place);
        if (city) cities.add(city);
    });

    return places.size >= 2 && cities.size >= 2;
};

const isPatientInfoComplete = (patientInfo = {}) => (
    REQUIRED_PATIENT_INFO_KEYS.every((key) => Boolean(`${patientInfo[key] || ''}`.trim()))
);

const getSex = (patientInfo = {}) => (
    patientInfo.sex === 'female' ? 'female' : DEFAULT_SEX
);

const getMeritLiters = (level, sex) => {
    const thresholds = {
        bronze: { female: 5, male: 6 },
        silver: { female: 10, male: 12 },
        gold: { female: 15, male: 18 }
    };

    return thresholds[level][sex] || thresholds[level][DEFAULT_SEX];
};

const getLitersLabel = (liters) => `${liters} l`;

const getMeritDescription = ({ level, patientInfo, translate }) => {
    const liters = getMeritLiters(level, getSex(patientInfo));

    return replaceTokens(translate('achievementMeritDescription'), {
        liters: getLitersLabel(liters)
    });
};

const getMeritMessage = ({ level, patientInfo, translate }) => {
    const liters = getMeritLiters(level, getSex(patientInfo));

    return replaceTokens(translate('achievementMeritMessage'), {
        liters: getLitersLabel(liters)
    });
};

const getMinimumDonationCount = (liters) => Math.ceil((liters * 1000) / WHOLE_BLOOD_DONATION_ML);

const ACHIEVEMENT_DEFINITIONS = [
    {
        id: 'firstDonation',
        icon: 'droplet',
        nameKey: 'achievementFirstDonationName',
        descriptionKey: 'achievementFirstDonationDescription',
        messageKey: 'achievementFirstDonationMessage',
        isUnlocked: ({ donations }) => donations.length >= 1
    },
    {
        id: 'completeDonorInfo',
        icon: 'user-check',
        nameKey: 'achievementCompleteDonorInfoName',
        descriptionKey: 'achievementCompleteDonorInfoDescription',
        messageKey: 'achievementCompleteDonorInfoMessage',
        isUnlocked: ({ patientInfo }) => isPatientInfoComplete(patientInfo)
    },
    {
        id: 'meritBronze',
        icon: 'medal',
        color: SPECIAL_COLORS.bronze,
        nameKey: 'achievementMeritBronzeName',
        getDescription: (context) => getMeritDescription({ ...context, level: 'bronze' }),
        getMessage: (context) => getMeritMessage({ ...context, level: 'bronze' }),
        isUnlocked: ({ totalDonatedMl, patientInfo }) => (
            totalDonatedMl >= getMeritLiters('bronze', getSex(patientInfo)) * 1000
        )
    },
    {
        id: 'meritSilver',
        icon: 'medal',
        color: SPECIAL_COLORS.silver,
        nameKey: 'achievementMeritSilverName',
        getDescription: (context) => getMeritDescription({ ...context, level: 'silver' }),
        getMessage: (context) => getMeritMessage({ ...context, level: 'silver' }),
        isUnlocked: ({ totalDonatedMl, patientInfo }) => (
            totalDonatedMl >= getMeritLiters('silver', getSex(patientInfo)) * 1000
        )
    },
    {
        id: 'meritGold',
        icon: 'medal',
        color: SPECIAL_COLORS.gold,
        nameKey: 'achievementMeritGoldName',
        getDescription: (context) => getMeritDescription({ ...context, level: 'gold' }),
        getMessage: (context) => getMeritMessage({ ...context, level: 'gold' }),
        isUnlocked: ({ totalDonatedMl, patientInfo }) => (
            totalDonatedMl >= getMeritLiters('gold', getSex(patientInfo)) * 1000
        )
    },
    {
        id: 'nationalHealth',
        icon: 'trophy',
        color: SPECIAL_COLORS.platinum,
        nameKey: 'achievementNationalHealthName',
        descriptionKey: 'achievementNationalHealthDescription',
        messageKey: 'achievementNationalHealthMessage',
        isUnlocked: ({ totalDonatedMl }) => totalDonatedMl >= 20000
    },
    {
        id: 'wanderer',
        icon: 'map-location-dot',
        nameKey: 'achievementWandererName',
        descriptionKey: 'achievementWandererDescription',
        messageKey: 'achievementWandererMessage',
        isUnlocked: ({ donations }) => hasTwoCitiesAndCenters(donations)
    },
    {
        id: 'quickReturn',
        icon: 'bolt',
        nameKey: 'achievementQuickReturnName',
        descriptionKey: 'achievementQuickReturnDescription',
        messageKey: 'achievementQuickReturnMessage',
        isUnlocked: ({ donations }) => hasFastDonationReturn(donations)
    },
    {
        id: 'educated',
        icon: 'book-open-reader',
        nameKey: 'achievementEducatedName',
        descriptionKey: 'achievementEducatedDescription',
        messageKey: 'achievementEducatedMessage',
        isUnlocked: ({ faqReadItemIds, faqItemCount }) => (
            faqItemCount > 0 && faqReadItemIds.length >= faqItemCount
        )
    },
    {
        id: 'threeDrops',
        icon: 'hand-holding-droplet',
        nameKey: 'achievementThreeDropsName',
        descriptionKey: 'achievementThreeDropsDescription',
        messageKey: 'achievementThreeDropsMessage',
        isUnlocked: ({ donations }) => donations.length >= 3
    },
    {
        id: 'loyalCenter',
        icon: 'house-medical',
        nameKey: 'achievementLoyalCenterName',
        descriptionKey: 'achievementLoyalCenterDescription',
        messageKey: 'achievementLoyalCenterMessage',
        isUnlocked: ({ donations }) => hasRepeatedCenter(donations, 3)
    },
    {
        id: 'goodYear',
        icon: 'calendar-check',
        nameKey: 'achievementGoodYearName',
        descriptionKey: 'achievementGoodYearDescription',
        messageKey: 'achievementGoodYearMessage',
        isUnlocked: ({ donations }) => hasThreeDonationsInRollingYear(donations)
    },
    {
        id: 'veteran',
        icon: 'award',
        nameKey: 'achievementVeteranName',
        getDescription: ({ translate }) => replaceTokens(translate('achievementVeteranDescription'), {
            donations: getMinimumDonationCount(5)
        }),
        getMessage: ({ translate }) => replaceTokens(translate('achievementVeteranMessage'), {
            donations: getMinimumDonationCount(5)
        }),
        isUnlocked: ({ donations }) => donations.length >= getMinimumDonationCount(5)
    }
];

export const getAchievements = ({ settings, faqItemCount, translate }) => {
    const donations = getSortedDonations(settings.donations || []);
    const patientInfo = settings.patientInfo || {};
    const unlockedAchievementIds = settings.unlockedAchievementIds || [];
    const context = {
        donations,
        faqItemCount,
        faqReadItemIds: settings.faqReadItemIds || [],
        patientInfo,
        totalDonatedMl: getTotalDonatedMl(donations),
        translate
    };

    return ACHIEVEMENT_DEFINITIONS.map((definition) => {
        const isUnlockedByProgress = definition.isUnlocked(context);
        const isUnlocked = isUnlockedByProgress || unlockedAchievementIds.includes(definition.id);

        return {
            id: definition.id,
            icon: definition.icon,
            color: definition.color,
            isUnlocked,
            isUnlockedByProgress,
            name: translate(definition.nameKey),
            description: definition.getDescription
                ? definition.getDescription(context)
                : translate(definition.descriptionKey),
            unlockedMessage: definition.getMessage
                ? definition.getMessage(context)
                : translate(definition.messageKey)
        };
    });
};

export const getNewlyUnlockedAchievements = (achievements, unlockedAchievementIds = []) => (
    achievements.filter((achievement) => (
        achievement.isUnlockedByProgress && !unlockedAchievementIds.includes(achievement.id)
    ))
);
