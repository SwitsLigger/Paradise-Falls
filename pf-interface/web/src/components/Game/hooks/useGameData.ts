import { useAtom } from 'jotai';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { hudDataAtom, hudDisplayerDataAtom, carHudDataAtom } from '@/stores';
import { CarHudData, HudData, HudDisplayerData } from '@/utils/types';

export function useGameData() {
    const [currentHudData, setCurrentHudData] = useAtom(hudDataAtom);
    const [currentCarHudData, setCurrentCarHudData] = useAtom(carHudDataAtom);
    const [displayerData, setDisplayerData] = useAtom(hudDisplayerDataAtom);

    useNuiEvent('update_car_hud', (data: Partial<CarHudData>) => {
        setCurrentCarHudData(prev => ({ ...prev, ...data }));
    });

    useNuiEvent('update_hud_values', (data: Partial<HudData>) => {
        setCurrentHudData(prev => ({ ...prev, ...data }));
    });

    useNuiEvent('update_displayer_data', (data: Partial<HudDisplayerData>) => {
        setDisplayerData(prev => ({ ...prev, ...data }));
    });

    return {
        currentHudData,
        currentCarHudData,
        displayerData
    };
}
