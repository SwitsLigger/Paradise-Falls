import type { CarHudUnit } from "@/utils/types";

export interface CarHudProps {
    speed?: number;
    fuel?: number;
    rpm?: number;
    streetLabel?: string;
    units?: CarHudUnit;
    seatbelt?: boolean;
    className?: string;
    style?: React.CSSProperties;
    size?: 'md' | 'xl';
    infiniteAnimate?: boolean;
    topSpeed?: number;
}