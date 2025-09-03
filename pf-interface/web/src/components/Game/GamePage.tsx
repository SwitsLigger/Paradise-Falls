import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext } from '@dnd-kit/core';
import { ComponentPositions, saveComponentPositions } from '@/utils/localStorage';
import { isEnvBrowser } from '@/utils/misc';
import { fetchNui } from '@/utils/fetchNui';
import useVisible from '@/hooks/useVisible';
import useNuiEvent from '@/hooks/useNuiEvent';
import { ProgressData } from '../Progress/types';
import { useSoundContext } from '@/contexts/SoundContext';

import { useGameNotifications } from './hooks/useGameNotifications';
import { useGameData } from './hooks/useGameData';
import { useGameDrag } from './hooks/useGameDrag';
import { useAtom, useAtomValue } from 'jotai';

import Debug from './Debug';
import GameNotifications from './GameNotifications';
import GameProgress from './GameProgress';
import GameDisplayer from './GameDisplayer';
import { Position } from '@/utils/types';
import { carHudSettingsAtom, componentPositionsAtom } from '@/stores/editor';
import HudContainer from '../Hud/HudContainer';
import GameCarHud from './GameCarHud';

export default function GamePage() {
    const [hudActive, setHudActive] = useState(isEnvBrowser());
    const carHudSettings = useAtomValue(carHudSettingsAtom);
    const [componentPositions, setComponentPositions] = useAtom(componentPositionsAtom);
    const [streetLabel, setStreetLabel] = useState('');
    const [progressBarVisible, progressBarData, setProgressBarData] = useVisible<ProgressData & { visible: boolean }>('toggle_progress_bar');
    const [isInVehicle] = useVisible('toggle_vehicle');
    const [seatbelt] = useVisible('toggle_seatbelt');
    const { stopCurrentMusic } = useSoundContext();

    const { activeNotifications } = useGameNotifications()
    const { currentHudData, currentCarHudData, displayerData } = useGameData()
    const { handleDragStart, handleDragMove, handleDragEnd } = useGameDrag(componentPositions, handlePositionChange)

    useNuiEvent('update_street_label', (street: string) => {
        setStreetLabel(street);
    });

    useNuiEvent('toggle_hud', (state: boolean) => {
        setHudActive(state);
    });

    useEffect(() => {
        fetchNui('game_screen_ready', {
            map: carHudSettings.minimap
        });

        stopCurrentMusic();
    }, [stopCurrentMusic]);

    function handlePositionChange(component: keyof ComponentPositions, position: Position) {
        const newPositions = {
            ...componentPositions,
            [component]: position
        };
        setComponentPositions(newPositions);
        saveComponentPositions(newPositions);
    }

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <DndContext
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                {isEnvBrowser() && (
                    <Debug componentPositions={componentPositions} setComponentPositions={setComponentPositions} />
                )}

                <div className="relative w-full h-full overflow-hidden">
                    {hudActive && (
                        <HudContainer
                            id='hud'
                            draggable
                            defaultPosition={componentPositions.hud}
                            onPositionChange={(pos) => handlePositionChange('hud', pos)}
                            hudData={currentHudData}
                        />
                    )}

                    <GameNotifications
                        activeNotifications={activeNotifications}
                        position={componentPositions.notification}
                    />

                    <GameProgress
                        progressBarVisible={progressBarVisible || false}
                        progressBarData={progressBarData}
                        setProgressBarData={setProgressBarData}
                        position={componentPositions.progress}
                    />

                    {hudActive && (
                        <GameCarHud
                            carHudVisible={isInVehicle || false}
                            carHudData={currentCarHudData}
                            position={componentPositions.carHud}
                            streetLabel={streetLabel}
                            seatbelt={seatbelt || false}
                        />
                    )}

                    {hudActive && (
                        <GameDisplayer
                            displayerData={displayerData}
                            position={componentPositions.displayer}
                            onPositionChange={(pos) => handlePositionChange('displayer', pos)}
                        />
                    )}
                </div>
            </DndContext>
        </motion.div>
    );
}
