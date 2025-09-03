import BasicNotification from './Basic/BasicNotification';
import ClassicNotification from './Classic/ClassicNotification';
import ModernNotification from './Modern/ModernNotification';
import { NotificationData, NotificationProps } from './types';
import DraggableWrapper from '../DraggableWrapper';
import classNames from 'classnames';
import { notificationSettingsAtom } from '@/stores/editor';
import { useAtom } from 'jotai';
import { Position } from '@/utils/types';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationFactoryProps extends Omit<NotificationProps, 'data'> {
    draggable?: boolean;
    defaultPosition?: Position;
    onPositionChange?: (position: Position) => void;
    positionSet?: boolean;
    id?: string;
    data: NotificationData | NotificationData[];
}

export default function NotificationFactory({
    draggable = false,
    defaultPosition = { x: 0, y: 0 },
    onPositionChange,
    positionSet = true,
    id,
    ...props
}: NotificationFactoryProps) {
    const [notificationSettings] = useAtom(notificationSettingsAtom);
    const notificationComponent = (props: NotificationProps) => {
        switch (props.type) {
            case 'basic':
                return <BasicNotification {...props} />;
            case 'classic':
                return <ClassicNotification {...props} />;
            case 'modern':
                return <ModernNotification {...props} />;
            default:
                return <BasicNotification {...props} />;
        }
    };

    return (
        <DraggableWrapper
            draggable={draggable}
            defaultPosition={defaultPosition}
            className={classNames({
                'absolute left-1/2 transform -translate-x-1/2': positionSet
            })}
            onPositionChange={onPositionChange}
            id={id}
        >
            <div className="transform" style={{ transform: `scale(${notificationSettings.scale})` }}>
                {Array.isArray(props.data) ? (
                    <AnimatePresence mode="popLayout">
                        {props.data.map((notification, index) => (
                            <motion.div
                                key={`${notification.header}-${index}`}
                                initial={{
                                    opacity: 0,
                                    y: -20,
                                    scale: 0.8,
                                    x: index * 10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    x: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 20,
                                    scale: 0.8,
                                    x: index * -10
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut"
                                }}
                                className='flex flex-col gap-4'
                                layout
                            >
                                {notificationComponent({ ...props, data: notification })}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {notificationComponent(props as NotificationProps)}
                    </motion.div>
                )}
            </div>
        </DraggableWrapper>
    );
};
