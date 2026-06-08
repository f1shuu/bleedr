const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
    || googlePlacesApiKey;

module.exports = ({ config }) => {
    const androidConfig = config.android || {};
    const extraConfig = config.extra || {};

    return {
        ...config,
        android: {
            ...androidConfig,
            ...(googleMapsApiKey ? {
                config: {
                    ...(androidConfig.config || {}),
                    googleMaps: {
                        apiKey: googleMapsApiKey
                    }
                }
            } : {})
        },
        extra: {
            ...extraConfig,
            hasGoogleMapsApiKey: Boolean(googleMapsApiKey),
            hasGooglePlacesApiKey: Boolean(googlePlacesApiKey)
        }
    };
};
