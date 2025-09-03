import { motion, AnimatePresence } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { notificationSettingsAtom } from '@/stores/editor';
import NotificationFactory from '@/components/Notification/NotificationFactory';
import { NotificationData } from '@/components/Notification/types';
import { Position } from '@/utils/types';

interface NotificationItem {
    id: string;
    data: NotificationData;
    timestamp: number;
}

interface GameNotificationsProps {
    activeNotifications: NotificationItem[];
    position: Position;
}

export default function GameNotifications({ activeNotifications, position }: GameNotificationsProps) {
    const notificationSettings = useAtomValue(notificationSettingsAtom);

    return (
        <AnimatePresence mode="popLayout">
            <NotificationFactory
                id='notification'
                type={notificationSettings.type}
                defaultPosition={position}
                data={activeNotifications.map((notification) => notification.data)}
                textAlign={notificationSettings.textAlign}
                draggable
            />
        </AnimatePresence>
    );
}
