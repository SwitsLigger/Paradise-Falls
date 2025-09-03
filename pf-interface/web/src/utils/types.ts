export type ReadyListener = {
    languageName: string;
    resources: Record<string, Record<string, string>>;
    config: Config;
}

export type OptionalDisplay = {
    id: boolean,
    online: boolean,
    job: boolean,
    cash: boolean,
    bank: boolean
}

export type Config = {
    previewBackground?: string;
    intl: {
        locales: Intl.LocalesArgument;
        options: Intl.NumberFormatOptions;
    }
    optional: {
        display: OptionalDisplay
    }
    units: CarHudUnit
}

export type HudSettings = {
    type: 'basic' | 'diamond' | 'skew' | 'circle' | 'icon-percent' | 'hexagon' | 'modern';
    alignment: 'row' | 'column';
    scale: number;
    disabledComponents?: HudComponentType[];
}

export type HudComponentType = 'health' | 'armour' | 'hunger' | 'thirst' | 'stress' | 'voice' | 'oxygen' | 'stamina';

export const HUD_COMPONENTS: HudComponentType[] = ['health', 'armour', 'hunger', 'thirst', 'voice', 'stress', 'oxygen', 'stamina'];

export type HudData = {
    health: number,
    armour: number,
    hunger: number,
    thirst: number,
    stress: number,
    oxygen: number,
    stamina: number,
    isTalking: boolean,
    voice: number
}

export type HudDisplayerData = {
    cash: number,
    bank: number,
    identifier: string,
    job: string,
    maxOnline: number,
    online: number,
}

export type CarHudData = {
    speed: number,
    fuel: number,
    rpm: number,
    gear: number,
    topSpeed: number,
}

export type Position = {
    x: number | string;
    y: number | string;
}

export type CarHudUnit = 'kmh' | 'mph'