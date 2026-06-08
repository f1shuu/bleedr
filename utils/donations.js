const WHOLE_BLOOD_DONATION_ML = 450;

const DONATION_LIMITS = {
    female: 4,
    male: 6
};
const DEFAULT_SEX = 'male';
const MIN_DAYS_BETWEEN_WHOLE_BLOOD_DONATIONS = 56;
const ROLLING_YEAR_DAYS = 365;

export const getTodayDateInputValue = () => {
    const today = new Date();

    return formatDateInputValue(today);
};

export const formatDateInputValue = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatDonationDate = (value, language = 'en') => {
    const date = typeof value === 'string' ? parseDateInputValue(value) : value;

    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return language === 'pl'
        ? `${day}.${month}.${year}`
        : `${month}/${day}/${year}`;
};

export const formatDonationVolume = (milliliters, language = 'en') => {
    const safeValue = Number.isFinite(milliliters) ? Math.max(0, Math.round(milliliters)) : 0;
    const separator = language === 'pl' ? ' ' : ',';
    const formattedValue = `${safeValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return `${formattedValue} ml`;
};

export const parseDateInputValue = (date) => {
    if (!date) return null;

    const [year, month, day] = date.split('-').map(Number);
    if (!year || !month || !day) return null;

    return new Date(year, month - 1, day);
};

export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
};

export const getSortedDonations = (donations = []) => (
    [...donations].sort((firstDonation, secondDonation) => (
        parseDateInputValue(secondDonation.date) - parseDateInputValue(firstDonation.date)
    ))
);

export const getTotalDonatedMl = (donations = []) => donations.length * WHOLE_BLOOD_DONATION_ML;

export const calculateNextDonationDate = (donations = [], sex) => {
    const donationDates = getSortedDonations(donations)
        .map((donation) => parseDateInputValue(donation.date))
        .filter(Boolean);

    if (donationDates.length === 0) return null;

    const donationLimit = DONATION_LIMITS[sex] || DONATION_LIMITS[DEFAULT_SEX];
    let candidateDate = addDays(donationDates[0], MIN_DAYS_BETWEEN_WHOLE_BLOOD_DONATIONS);

    while (true) {
        const rollingWindowStart = addDays(candidateDate, -ROLLING_YEAR_DAYS);
        const donationsInWindow = donationDates.filter((donationDate) => (
            donationDate > rollingWindowStart && donationDate <= candidateDate
        ));

        if (donationsInWindow.length < donationLimit) return candidateDate;

        const oldestDonationInWindow = donationsInWindow[donationsInWindow.length - 1];
        const nextDateAfterLimit = addDays(oldestDonationInWindow, ROLLING_YEAR_DAYS + 1);
        candidateDate = nextDateAfterLimit > candidateDate ? nextDateAfterLimit : addDays(candidateDate, 1);
    }
};
