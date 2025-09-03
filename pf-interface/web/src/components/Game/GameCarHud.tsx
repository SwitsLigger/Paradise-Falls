import { AnimatePresence } from 'framer-motion';
import { CarHudData, Position } from '@/utils/types';
import CarHudFactory from '../CarHud/CarHudFactory';
import { useAtomValue } from 'jotai';
import { configAtom } from '@/stores/config';

interface GameCarHudProps {
    carHudVisible: boolean;
    carHudData?: CarHudData;
    position: Position;
    streetLabel: string;
    seatbelt: boolean;
}

export default function GameCarHud({ carHudVisible, carHudData, position, streetLabel, seatbelt }: GameCarHudProps) {
    const config = useAtomValue(configAtom);
    return (
        <AnimatePresence mode="wait">
            {carHudVisible && carHudData && (
                <CarHudFactory
                    id='carHud'
                    defaultPosition={position}
                    draggable
                    speed={carHudData.speed}
                    fuel={carHudData.fuel}
                    rpm={carHudData.rpm}
                    streetLabel={streetLabel}
                    seatbelt={seatbelt}
                    topSpeed={carHudData.topSpeed}
                    units={config?.units}
                />
            )}
        </AnimatePresence>
    );
}
