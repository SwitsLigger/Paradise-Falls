import { useCallback, useRef, useState } from 'react';
import { Howl } from 'howler';

import Welcome from '@/assets/sounds/effects/welcome.ogg';
import Whoosh from '@/assets/sounds/effects/whoosh.ogg';
import Enter from '@/assets/sounds/effects/enter.ogg';
import Sheesh from '@/assets/sounds/effects/sheesh.ogg';
import Click from '@/assets/sounds/effects/click.ogg';
import Preset from '@/assets/sounds/effects/preset.ogg';
import Selector from '@/assets/sounds/effects/selector.ogg';
import Error from '@/assets/sounds/effects/error.ogg';
import Notification from '@/assets/sounds/effects/notification.ogg';
import Progressbar from '@/assets/sounds/effects/progressbar.ogg';
import SeatbeltOff from '@/assets/sounds/effects/seatbelt-off.ogg';
import SeatbeltOn from '@/assets/sounds/effects/seatbelt-on.ogg';
import ActionStylish from '@/assets/sounds/music/action-stylish.ogg';
import MetalDark from '@/assets/sounds/music/metal-dark.ogg';
import PowerfulEpic from '@/assets/sounds/music/powerful-epic.ogg';
import SteelBars from '@/assets/sounds/music/steel-bars.ogg';

const SOUND_PATHS = {
    // Effects
    welcome: Welcome,
    whoosh: Whoosh,
    enter: Enter,
    sheesh: Sheesh,
    click: Click,
    preset: Preset,
    selector: Selector,
    error: Error,
    notification: Notification,
    progressbar: Progressbar,
    seatbeltOff: SeatbeltOff,
    seatbeltOn: SeatbeltOn,

    // Music
    actionStylish: ActionStylish,
    metalDark: MetalDark,
    powerfulEpic: PowerfulEpic,
    steelBars: SteelBars
} as const;

type SoundName = keyof typeof SOUND_PATHS;

const DEFAULT_VOLUMES: Record<SoundName, number> = {
    welcome: 0.1,
    whoosh: 0.1,
    enter: 0.5,
    sheesh: 0.2,
    click: 0.35,
    preset: 0.2,
    selector: 0.4,
    error: 0.4,
    notification: 0.4,
    progressbar: 0.4,
    seatbeltOff: 0.4,
    seatbeltOn: 0.4,
    actionStylish: 0.3,
    metalDark: 0.3,
    powerfulEpic: 0.3,
    steelBars: 0.3
};

export const useSound = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [globalVolume, setGlobalVolume] = useState(1);
    const soundsRef = useRef<Map<SoundName, Howl>>(new Map());

    const currentMusicRef = useRef<SoundName | null>(null);
    const musicList: SoundName[] = ['actionStylish', 'metalDark', 'powerfulEpic', 'steelBars'];

    const getSound = useCallback((soundName: SoundName): Howl => {
        if (!soundsRef.current.has(soundName)) {
            const howl = new Howl({
                src: [SOUND_PATHS[soundName]],
                volume: DEFAULT_VOLUMES[soundName] * globalVolume,
                html5: false,
                loop: false
            });
            soundsRef.current.set(soundName, howl);
        }
        return soundsRef.current.get(soundName)!;
    }, [globalVolume]);

    const play = useCallback((soundName: SoundName, volume?: number, onEnd?: () => void) => {
        if (!isEnabled) return;

        try {
            const sound = getSound(soundName);

            if (volume !== undefined) {
                const targetVolume = volume * globalVolume;

                sound.fade(sound.volume(), targetVolume, 1000);
                sound.volume(targetVolume);
            }

            if (onEnd) {
                sound.once('end', onEnd);
            }

            sound.play();
        } catch (error) {
            console.error(`Failed to play sound: ${soundName}`, error);
        }
    }, [isEnabled, getSound, globalVolume]);

    const stop = useCallback((soundName: SoundName) => {
        try {
            const sound = soundsRef.current.get(soundName);
            if (sound) {
                sound.fade(sound.volume(), 0, 2000);
                setTimeout(() => {
                    sound.stop();
                }, 2000);
            }
        } catch (error) {
            console.error(`Failed to stop sound: ${soundName}`, error);
        }
    }, []);

    const stopAll = useCallback(() => {
        try {
            soundsRef.current.forEach((sound) => {
                sound.stop();
            });
        } catch (error) {
            console.error('Failed to stop all sounds', error);
        }
    }, []);

    const setVolume = useCallback((volume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        setGlobalVolume(clampedVolume);

        soundsRef.current.forEach((sound, soundName) => {
            sound.volume(DEFAULT_VOLUMES[soundName] * clampedVolume);
        });
    }, []);

    const toggle = useCallback(() => {
        setIsEnabled(prev => !prev);
    }, []);

    const playRandomMusic = useCallback(() => {
        let randomMusic: SoundName;
        do {
            randomMusic = musicList[Math.floor(Math.random() * musicList.length)];
        } while (randomMusic === currentMusicRef.current && musicList.length > 1);

        currentMusicRef.current = randomMusic;

        play(randomMusic, undefined, () => {
            playRandomMusic();
        });
    }, [play]);

    const startMusicCycle = useCallback(() => {
        playRandomMusic();
    }, [playRandomMusic]);

    const stopCurrentMusic = useCallback(() => {
        if (currentMusicRef.current) {
            stop(currentMusicRef.current);
            currentMusicRef.current = null;
        }
    }, [stop]);

    const effects = {
        welcome: () => play('welcome'),
        whoosh: () => play('whoosh'),
        enter: () => play('enter'),
        sheesh: () => play('sheesh'),
        click: () => play('click'),
        preset: () => play('preset'),
        selector: () => play('selector'),
        error: () => play('error'),
        notification: () => play('notification'),
        progressbar: () => play('progressbar'),
        seatbeltOff: () => play('seatbeltOff'),
        seatbeltOn: () => play('seatbeltOn'),
        toggleSeatbelt: (isOn: boolean) => play(isOn ? 'seatbeltOn' : 'seatbeltOff')
    };

    const music = {
        actionStylish: () => play('actionStylish'),
        metalDark: () => play('metalDark'),
        powerfulEpic: () => play('powerfulEpic'),
        steelBars: () => play('steelBars')
    };

    return {
        play,
        stop,
        stopAll,
        setVolume,
        toggle,
        isEnabled,
        globalVolume,

        startMusicCycle,
        stopCurrentMusic,

        effects,
        music,

        availableSounds: Object.keys(SOUND_PATHS) as SoundName[]
    };
};
