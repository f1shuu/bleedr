const GOOGLE_PLACES_TEXT_SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const GOOGLE_PLACES_FIELD_MASK = [
    'places.id',
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.googleMapsUri'
].join(',');

const getPlacesApiKey = () => process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

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
