import { DisplayerSettings, NotificationSettings, ProgressSettings, CarHudSettings } from '@/stores/editor';
import { HudSettings, Position } from '@/utils/types';

const DATA_CHANGE_EVENT = 'qs-interface-data-change';

const dispatchDataChangeEvent = () => {
    window.dispatchEvent(new CustomEvent(DATA_CHANGE_EVENT));
};

export const STORAGE_KEYS = {
    HUD_DATA: 'hud_data',
    HUD_DISPLAYER_DATA: 'hud_displayer_data',
    CAR_HUD_DATA: 'hud_car_data',
    COMPONENT_POSITIONS: 'hud_component_positions',
    THEME: 'hud_theme',
    NOTIFICATION_DATA: 'hud_notification_data',
    PROGRESS_DATA: 'hud_progress_data',
} as const;

export type ComponentPositions = {
    hud: Position;
    notification: Position;
    progress: Position;
    carHud: Position;
    displayer: Position;
}

export const DEFAULT_POSITIONS: ComponentPositions = {
    hud: { x: 0, y: 0 },
    notification: { x: 0, y: 0 },
    progress: { x: 0, y: 0 },
    carHud: { x: 0, y: 0 },
    displayer: { x: 0, y: 0 }
};

const saveCache = <T>(key: string, data: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        dispatchDataChangeEvent();
    } catch (error) {
        console.error('Failed to save cache:', error);
    }
};

export const saveHudData = (data: HudSettings): void => {
    saveCache(STORAGE_KEYS.HUD_DATA, data);
};

export const saveHudDisplayerData = (data: DisplayerSettings): void => {
    saveCache(STORAGE_KEYS.HUD_DISPLAYER_DATA, data);
};

export const saveCarHudData = (data: CarHudSettings): void => {
    saveCache(STORAGE_KEYS.CAR_HUD_DATA, data);
};

export const saveTheme = (data: string): void => {
    saveCache(STORAGE_KEYS.THEME, data);
    document.body.style.setProperty('--main-color', data);
};

export const saveComponentPositions = (positions: ComponentPositions): void => {
    saveCache(STORAGE_KEYS.COMPONENT_POSITIONS, positions);
};

export const saveNotificationData = (data: NotificationSettings): void => {
    saveCache(STORAGE_KEYS.NOTIFICATION_DATA, data);
};

export const saveProgressData = (data: ProgressSettings): void => {
    saveCache(STORAGE_KEYS.PROGRESS_DATA, data);
};

const loadCache = <T>(key: string): T | null => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to load cache:', error);
        return null;
    }
};

export const loadHudData = (): HudSettings | null => {
    return loadCache(STORAGE_KEYS.HUD_DATA);
};

export const loadHudDisplayerData = (): DisplayerSettings | null => {
    return loadCache(STORAGE_KEYS.HUD_DISPLAYER_DATA);
};

export const loadCarHudData = (): CarHudSettings | null => {
    return loadCache(STORAGE_KEYS.CAR_HUD_DATA);
};

export const loadComponentPositions = (): ComponentPositions => {
    return loadCache(STORAGE_KEYS.COMPONENT_POSITIONS) || DEFAULT_POSITIONS;
};

export const loadNotificationData = (): NotificationSettings | null => {
    return loadCache(STORAGE_KEYS.NOTIFICATION_DATA);
};

export const loadProgressData = (): ProgressSettings | null => {
    return loadCache(STORAGE_KEYS.PROGRESS_DATA);
};

export const loadTheme = (): string | null => {
    return loadCache(STORAGE_KEYS.THEME);
};

type SaveEditorSettings = {
    colors: string;
    notification: NotificationSettings;
    progress: ProgressSettings;
    displayer: DisplayerSettings;
    carHud: CarHudSettings;
    hud: HudSettings;
    componentPositions: ComponentPositions;
}

export const saveAllData = (data: Partial<SaveEditorSettings>): void => {
    if (data.hud) saveHudData(data.hud)
    if (data.displayer) saveHudDisplayerData(data.displayer)
    if (data.carHud) saveCarHudData(data.carHud)
    if (data.componentPositions) saveComponentPositions(data.componentPositions)
    if (data.notification) saveNotificationData(data.notification)
    if (data.progress) saveProgressData(data.progress)
    if (data.colors) saveTheme(data.colors)

    dispatchDataChangeEvent();
}

export const getStorageValues = () => {
    return {
        hud: loadHudData(),
        displayer: loadHudDisplayerData(),
        carHud: loadCarHudData(),
        componentPositions: loadComponentPositions(),
        notification: loadNotificationData(),
        progress: loadProgressData(),
        theme: loadTheme()
    };
};

export const clearAllData = (): void => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        })
        dispatchDataChangeEvent()
    } catch (error) {
        console.error('Failed to clear data:', error);
    }
}

// clearAllData()

export { DATA_CHANGE_EVENT };
