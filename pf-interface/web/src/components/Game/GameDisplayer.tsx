import { useAtomValue } from 'jotai';
import { displayerSettingsAtom } from '@/stores/editor';
import DisplayerFactory from '@/components/Displayers/DisplayerFactory';
import { DEFAULT_DISPLAYER_DATA } from '@/stores';
import type { HudDisplayerData, Position } from '@/utils/types';
import { motion } from 'framer-motion';

interface GameDisplayerProps {
    displayerData: HudDisplayerData | null;
    position: Position;
    onPositionChange: (position: Position) => void;
}

export default function GameDisplayer({ displayerData, position, onPositionChange }: GameDisplayerProps) {
    const displayerSettings = useAtomValue(displayerSettingsAtom);

    return (
        <motion.div
            key={displayerSettings.displayerType}
            className="relative z-20"
            initial={{
                opacity: 0,
                scale: 0.8,
                rotateY: -15,
                filter: 'blur(4px)'
            }}
            animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                filter: 'blur(0px)'
            }}
            transition={{
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1]
            }}
        >
            <DisplayerFactory
                id='displayer'
                data={displayerData || DEFAULT_DISPLAYER_DATA}
                draggable
                defaultPosition={position}
                onPositionChange={onPositionChange}
            />
        </motion.div>
    );
}
