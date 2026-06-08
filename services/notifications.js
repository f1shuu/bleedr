import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import {
    addDays,
    calculateNextDonationDate,
    formatDonationDate,
    getSortedDonations
} from '../utils/donations';

const NOTIFICATION_CHANNELS = {
    reminders: 'bleedr-donation-reminders',
    achievements: 'bleedr-achievements'
};
const REMINDER_IDENTIFIER_PREFIX = 'bleedr-donation-reminder';
const NOTIFICATION_COLOR = '#DA2F47';
const DATE_TRIGGER_TYPE = Notifications.SchedulableTriggerInputTypes?.DATE || 'date';

const REMINDER_RULES = [
    {
        key: 'weekBefore',
        daysBefore: 7,
        bodyKey: 'notificationReminderWeekBody'
    },
    {
        key: 'dayBefore',
        daysBefore: 1,
        bodyKey: 'notificationReminderDayBody'
    },
    {
        key: 'onDate',
        daysBefore: 0,
        bodyKey: 'notificationReminderTodayBody'
    }
];

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true
    })
});

const replaceTokens = (text, tokens) => (
    Object.entries(tokens).reduce((result, [key, value]) => (
        result.replace(new RegExp(`{${key}}`, 'g'), value)
    ), text)
);

const configureNotificationChannels = async () => {
    if (Platform.OS !== 'android') return;

    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.reminders, {
        name: 'Bleedr - przypomnienia',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: NOTIFICATION_COLOR
    });

    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.achievements, {
        name: 'Bleedr - osiągnięcia',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: NOTIFICATION_COLOR
    });
};

const ensureNotificationPermissions = async () => {
    const currentPermissions = await Notifications.getPermissionsAsync();

    if (currentPermissions.granted) return true;

    const requestedPermissions = await Notifications.requestPermissionsAsync();
    return requestedPermissions.granted;
};

const cancelScheduledDonationReminders = async () => {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const reminderNotifications = scheduledNotifications.filter((notification) => (
        notification.identifier.startsWith(REMINDER_IDENTIFIER_PREFIX)
        || notification.content?.data?.type === 'donation-reminder'
    ));

    await Promise.all(reminderNotifications.map((notification) => (
        Notifications.cancelScheduledNotificationAsync(notification.identifier)
    )));
};

const getReminderDate = (nextDonationDate, daysBefore) => {
    const reminderDate = addDays(nextDonationDate, -daysBefore);
    reminderDate.setHours(8, 0, 0, 0);

    return reminderDate;
};

export const syncDonationReminderNotifications = async ({ settings, translate }) => {
    const preferences = settings.notificationPreferences || {};
    const sortedDonations = getSortedDonations(settings.donations || []);
    const nextDonationDate = calculateNextDonationDate(sortedDonations, settings.patientInfo?.sex);
    const enabledRules = REMINDER_RULES.filter((rule) => preferences[rule.key] !== false);

    await configureNotificationChannels();
    await cancelScheduledDonationReminders();

    if (!nextDonationDate || enabledRules.length === 0) return;

    const reminderDates = enabledRules
        .map((rule) => ({
            ...rule,
            date: getReminderDate(nextDonationDate, rule.daysBefore)
        }))
        .filter((rule) => rule.date > new Date());

    if (reminderDates.length === 0) return;

    const hasPermissions = await ensureNotificationPermissions();
    if (!hasPermissions) return;

    await Promise.all(reminderDates.map((rule) => (
        Notifications.scheduleNotificationAsync({
            identifier: `${REMINDER_IDENTIFIER_PREFIX}-${rule.key}`,
            content: {
                title: translate('notificationReminderTitle'),
                body: replaceTokens(translate(rule.bodyKey), {
                    date: formatDonationDate(nextDonationDate, settings.language)
                }),
                sound: 'default',
                color: NOTIFICATION_COLOR,
                data: {
                    type: 'donation-reminder',
                    reminder: rule.key
                }
            },
            trigger: {
                type: DATE_TRIGGER_TYPE,
                date: rule.date,
                channelId: NOTIFICATION_CHANNELS.reminders
            }
        })
    )));
};

export const notifyAchievementUnlocked = async (achievement) => {
    await configureNotificationChannels();

    const hasPermissions = await ensureNotificationPermissions();
    if (!hasPermissions) return;

    await Notifications.scheduleNotificationAsync({
        content: {
            title: achievement.name,
            body: achievement.unlockedMessage,
            sound: 'default',
            color: achievement.color || NOTIFICATION_COLOR,
            data: {
                type: 'achievement',
                achievementId: achievement.id
            }
        },
        trigger: Platform.OS === 'android'
            ? { channelId: NOTIFICATION_CHANNELS.achievements }
            : null
    });
};
