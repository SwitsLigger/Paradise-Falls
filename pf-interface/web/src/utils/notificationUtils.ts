import { NotificationData } from "@/components/Notification/types";

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationItem {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    duration?: number;
    timestamp: number;
}

const MAX_NOTIFICATIONS = 5;

class NotificationManager {
    private notifications: NotificationItem[] = [];
    private settings: NotificationData;

    constructor(settings: NotificationData) {
        this.settings = settings;
    }

    addNotification(
        type: NotificationType,
        title: string,
        message: string,
        duration?: number
    ): string {
        const id = this.generateId();
        const notification: NotificationItem = {
            id,
            type,
            title,
            message,
            duration,
            timestamp: Date.now()
        };

        this.notifications.push(notification);
        this.enforceMaxNotifications();
        this.autoRemoveNotification(id, notification.duration || 4000);

        return id;
    }

    removeNotification(id: string): void {
        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    getNotifications(): NotificationItem[] {
        return [...this.notifications];
    }

    clearNotifications(): void {
        this.notifications = [];
    }

    updateSettings(settings: NotificationData): void {
        this.settings = settings;
        this.enforceMaxNotifications();
    }

    private generateId(): string {
        return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private enforceMaxNotifications(): void {
        if (this.notifications.length > MAX_NOTIFICATIONS) {
            this.notifications = this.notifications.slice(-MAX_NOTIFICATIONS);
        }
    }

    private autoRemoveNotification(id: string, duration: number): void {
        setTimeout(() => {
            this.removeNotification(id);
        }, duration);
    }
}

let notificationManager: NotificationManager | null = null;

export const initializeNotificationManager = (settings: NotificationData): void => {
    notificationManager = new NotificationManager(settings);
};

export const showNotification = (
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
): string => {
    if (!notificationManager) {
        throw new Error('Notification manager not initialized');
    }
    return notificationManager.addNotification(type, title, message, duration);
};

export const removeNotification = (id: string): void => {
    if (!notificationManager) {
        throw new Error('Notification manager not initialized');
    }
    notificationManager.removeNotification(id);
};

export const getNotifications = (): NotificationItem[] => {
    if (!notificationManager) {
        throw new Error('Notification manager not initialized');
    }
    return notificationManager.getNotifications();
};

export const clearNotifications = (): void => {
    if (!notificationManager) {
        throw new Error('Notification manager not initialized');
    }
    notificationManager.clearNotifications();
};