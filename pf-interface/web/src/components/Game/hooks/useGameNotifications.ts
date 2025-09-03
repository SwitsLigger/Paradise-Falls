import { useState } from 'react';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { NotificationData } from '@/components/Notification/types';

interface NotificationItem {
    id: string;
    data: NotificationData;
    timestamp: number;
}

export function useGameNotifications() {
    const [activeNotifications, setActiveNotifications] = useState<NotificationItem[]>([]);

    useNuiEvent('add_notification', (data: NotificationData) => {
        const newNotification: NotificationItem = {
            id: `notification-${Date.now()}-${Math.random()}`,
            data,
            timestamp: Date.now()
        };

        setActiveNotifications(prev => [...prev, newNotification]);

        if (data.time) {
            setTimeout(() => {
                removeNotification(newNotification.id);
            }, data.time);
        } else {
            console.log('No time provided, notification will not be removed');
        }
    });

    useNuiEvent('remove_notification', () => {
        if (activeNotifications.length > 0) {
            removeNotification(activeNotifications[activeNotifications.length - 1].id);
        }
    });

    const removeNotification = (id: string) => {
        setActiveNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    return {
        activeNotifications,
        removeNotification
    };
}
