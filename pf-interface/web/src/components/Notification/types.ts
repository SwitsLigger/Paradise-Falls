export type NotificationType = 'basic' | 'classic' | 'modern';
export type TextAlign = 'left' | 'center' | 'right';

export type NotificationData = {
    icon: string;
    header: string;
    text: string;
    time?: number;
}

export type NotificationProps = {
    type: NotificationType;
    data: NotificationData;
    textAlign?: TextAlign;
    className?: string;
    style?: React.CSSProperties;
}

export interface NotificationComponentProps extends NotificationProps {
    children?: React.ReactNode;
}
