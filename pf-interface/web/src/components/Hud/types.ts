import type { HudComponentType } from '@/utils/types';

export type HudSize = 'md' | 'xl';

export interface BaseHudProps {
    type: HudComponentType;
    value?: number;
    maxValue?: number;
    className?: string;
    style?: React.CSSProperties;
    size?: HudSize; // Size options: 'md' (2.3vw) or 'xl' (8vw), defaults to 'md'
    infiniteAnimate?: boolean; // Enable infinite animation from 0 to 100 and back
    alignment?: 'row' | 'column'; // Alignment options: 'row' or 'column', defaults to 'row'
}

export interface HudComponentProps extends BaseHudProps {
    children?: React.ReactNode;
}
