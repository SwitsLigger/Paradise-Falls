import { HudDisplayerData } from "@/utils/types";

export type DisplayerType = 'basic' | 'modern' | 'skew' | 'modern2' | 'modernskew';

export interface DisplayerData {
    job: string;
    cash: string;
    bank: string;
    identifier: string;
    onlineAmount: string;
    onlineMax: string;
}

export interface BaseDisplayerProps {
    type: DisplayerType;
    data: HudDisplayerData;
    size?: 'md' | 'xl';
}

export interface DisplayerComponentProps extends BaseDisplayerProps {
    children?: React.ReactNode;
}
