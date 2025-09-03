import type { DisplayerType } from '@/components/Displayers/types';
import type { CarHudUnit, HudSettings } from '@/utils/types';
import { atom } from 'jotai';
import { ComponentPositions, DEFAULT_POSITIONS, getStorageValues } from '@/utils/localStorage';

const savedSettings = getStorageValues();

export const themeAtom = atom<string>(savedSettings?.theme || '#00b2ff');
document.body.style.setProperty('--main-color', savedSettings?.theme || '#00b2ff')

export type NotificationSettings = {
    type: 'basic' | 'classic' | 'modern';
    textAlign: 'left' | 'center' | 'right';
    scale: number;
}

export const notificationSettingsAtom = atom<NotificationSettings>(savedSettings?.notification || {
    type: 'modern',
    textAlign: 'left',
    scale: 1
})

export type ProgressSettings = {
    style: 'basic' | 'classic' | 'skew';
    scale: number;
}

export const progressSettingsAtom = atom<ProgressSettings>(savedSettings?.progress || {
    style: 'skew',
    scale: 1
});

export interface DisplayerSettings {
    displayerType: DisplayerType;
    scale: number;
}

export const displayerSettingsAtom = atom<DisplayerSettings>(savedSettings?.displayer || {
    displayerType: 'basic',
    scale: 1
});

export type CarHudSettings = {
    style: 'basic' | 'modern' | 'advanced';
    unit: CarHudUnit;
    scale: number;
    minimap: 'circle' | 'square';
}

export const carHudSettingsAtom = atom<CarHudSettings>(savedSettings?.carHud || {
    style: 'basic',
    unit: 'kmh',
    scale: 1,
    minimap: 'square'
});

export const hudSettingsAtom = atom<HudSettings>(savedSettings?.hud || {
    type: 'hexagon',
    alignment: 'row',
    scale: 1,
    disabledComponents: []
});

export const componentPositionsAtom = atom<ComponentPositions>(savedSettings?.componentPositions || DEFAULT_POSITIONS);