export type ProgressType = 'basic' | 'classic' | 'skew';

export type ProgressData = {
    text: string;
    time: number;
}

export interface ProgressProps {
    type: ProgressType;
    data?: ProgressData;
    className?: string;
    style?: React.CSSProperties;
    showPercentage?: boolean;
    showLabel?: boolean;
    animation?: boolean;
    infiniteAnimate?: boolean; // Enable infinite animation from 0 to 100 and back
    onComplete?: () => void; // Callback function when progress reaches 100%
}

export interface ProgressComponentProps extends ProgressProps {
    children?: React.ReactNode;
}
