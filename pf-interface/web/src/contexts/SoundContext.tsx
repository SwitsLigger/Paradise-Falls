import React, { createContext, useContext, ReactNode } from 'react';
import { useSound } from '../hooks/useSound';

type SoundName = 'welcome' | 'whoosh' | 'enter' | 'sheesh' | 'click' | 'preset' | 'selector' | 'error' | 'notification' | 'progressbar' | 'seatbeltOff' | 'seatbeltOn' | 'actionStylish' | 'metalDark' | 'powerfulEpic' | 'steelBars';

interface SoundContextType {
    play: (soundName: SoundName, volume?: number, onEnd?: () => void) => void;
    stop: (soundName: SoundName) => void;
    stopAll: () => void;
    setVolume: (volume: number) => void;
    toggle: () => void;
    isEnabled: boolean;
    globalVolume: number;
    startMusicCycle: () => void;
    stopCurrentMusic: () => void;
    effects: {
        welcome: () => void;
        whoosh: () => void;
        enter: () => void;
        sheesh: () => void;
        click: () => void;
        preset: () => void;
        selector: () => void;
        error: () => void;
        notification: () => void;
        progressbar: () => void;
        seatbeltOff: () => void;
        seatbeltOn: () => void;
        toggleSeatbelt: (isOn: boolean) => void;
    };
    music: {
        actionStylish: () => void;
        metalDark: () => void;
        powerfulEpic: () => void;
        steelBars: () => void;
    };
    availableSounds: SoundName[];
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
    children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
    const soundHook = useSound();

    return (
        <SoundContext.Provider value={soundHook}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSoundContext = (): SoundContextType => {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSoundContext must be used within a SoundProvider');
    }
    return context;
};
