import Constants from 'expo-constants';

const GOOGLE_PLACES_TEXT_SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const GOOGLE_PLACES_FIELD_MASK = [
    'places.id',
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.googleMapsUri'
].join(',');

export const getPlacesApiKey = () => process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

export const hasPlacesApiKey = () => Boolean(getPlacesApiKey());

const getExpoConfigExtra = () => (
    Constants.expoConfig?.extra
    || Constants.manifest?.extra
    || Constants.manifest2?.extra?.expoClient?.extra
    || {}
);

const getNativeMapsApiKey = () => (
    Constants.expoConfig?.android?.config?.googleMaps?.apiKey
    || Constants.manifest?.android?.config?.googleMaps?.apiKey
    || Constants.manifest2?.extra?.expoClient?.android?.config?.googleMaps?.apiKey
);

const hasConfiguredMapsApiKey = () => Boolean(
    getExpoConfigExtra().hasGoogleMapsApiKey
    || getNativeMapsApiKey()
);

export const getMapsApiKey = () => process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
    || process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
    || getNativeMapsApiKey();

export const hasMapsApiKey = () => Boolean(getMapsApiKey()) || hasConfiguredMapsApiKey();

const normalizePlace = (place) => ({
    id: place.id || place.name,
    name: place.displayName?.text || '',
    address: place.formattedAddress || '',
    latitude: place.location?.latitude,
    longitude: place.location?.longitude,
    googleMapsUri: place.googleMapsUri
});

export const searchNearbyDonationCenters = async ({ latitude, longitude, languageCode }) => {
    const apiKey = getPlacesApiKey();

    if (!apiKey) {
        return {
            places: [],
            status: 'missing-api-key'
        };
    }

    const response = await fetch(GOOGLE_PLACES_TEXT_SEARCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': GOOGLE_PLACES_FIELD_MASK
        },
        body: JSON.stringify({
            textQuery: languageCode === 'pl'
                ? 'centrum krwiodawstwa'
                : 'blood donation center',
            pageSize: 8,
            languageCode,
            locationBias: {
                circle: {
                    center: {
                        latitude,
                        longitude
                    },
                    radius: 30000
                }
            }
        })
    });

    if (!response.ok) {
        return {
            places: [],
            status: 'error'
        };
    }

    const data = await response.json();
    const places = (data.places || [])
        .map(normalizePlace)
        .filter((place) => place.name && place.latitude && place.longitude);

    return {
        places,
        status: 'ready'
    };
};

export const searchDonationCentersByText = async ({ city, languageCode }) => {
    const apiKey = getPlacesApiKey();

    if (!apiKey) {
        return {
            places: [],
            status: 'missing-api-key'
        };
    }

    const query = languageCode === 'pl'
        ? `centrum krwiodawstwa ${city || ''}`.trim()
        : `blood donation center ${city || ''}`.trim();

    const response = await fetch(GOOGLE_PLACES_TEXT_SEARCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': GOOGLE_PLACES_FIELD_MASK
        },
        body: JSON.stringify({
            textQuery: query,
            pageSize: 6,
            languageCode
        })
    });

    if (!response.ok) {
        return {
            places: [],
            status: 'error'
        };
    }

    const data = await response.json();
    const places = (data.places || [])
        .map(normalizePlace)
        .filter((place) => place.name);

    return {
        places,
        status: 'ready'
    };
};
