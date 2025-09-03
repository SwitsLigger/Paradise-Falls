import type { CarHudProps } from './types';
import BasicCarHud from './Basic/BasicCarHud';
import ModernCarHud from './Modern/ModernCarHud';
import AdvancedCarHud from './Advanced/AdvancedCarHud';
import DraggableWrapper from '../DraggableWrapper';
import classNames from 'classnames';
import { Position } from '@/utils/types';
import { useAtomValue } from 'jotai';
import { carHudSettingsAtom } from '@/stores/editor';
import { motion } from 'framer-motion';

interface CarHudFactoryProps extends CarHudProps {
    draggable?: boolean;
    defaultPosition?: Position;
    onPositionChange?: (position: Position) => void;
    positionSet?: boolean;
    id?: string;
}

export default function CarHudFactory({
    className = '',
    style = {},
    draggable = false,
    defaultPosition,
    onPositionChange,
    positionSet = true,
    id,
    ...props
}: CarHudFactoryProps) {
    const carHudSettings = useAtomValue(carHudSettingsAtom);
    const carHudComponent = (() => {
        switch (carHudSettings.style) {
            case 'basic':
                return <BasicCarHud {...props} />;
            case 'modern':
                return <ModernCarHud {...props} />;
            case 'advanced':
                return <AdvancedCarHud {...props} />;
            default:
                return <BasicCarHud {...props} />;
        }
    })();

    return (
        <DraggableWrapper
            draggable={draggable}
            defaultPosition={defaultPosition}
            className={classNames({
                'absolute bottom-0 right-4': positionSet,
                [className]: true
            })}
            style={style}
            onPositionChange={onPositionChange}
            id={id}
        >
            <motion.div
                key={carHudSettings.style}
                initial={{
                    opacity: 0,
                    y: 20,
                    rotateX: -10
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0
                }}
                exit={{
                    opacity: 0,
                    y: 20,
                    rotateX: -10
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
            >
                <div style={{ transform: `scale(${carHudSettings.scale})` }}>
                    {carHudComponent}
                </div>
            </motion.div>
        </DraggableWrapper>
    );
};
