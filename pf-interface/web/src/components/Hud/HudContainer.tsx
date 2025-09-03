import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import { hudSettingsAtom } from '@/stores/editor';
import HudFactory from './HudFactory';
import { HUD_COMPONENTS } from '@/utils/types';
import type { HudComponentType, HudData, Position } from '@/utils/types';
import type { HudSize } from './types';
import DraggableWrapper from '../DraggableWrapper';
import classNames from 'classnames';

type HudContainerProps = {
    components?: HudComponentType[];
    size?: HudSize;
    infiniteAnimate?: boolean; // Enable infinite animation from 0 to 100 and back
    draggable?: boolean;
    defaultPosition?: Position;
    onPositionChange?: (position: Position) => void;
    value?: number;
    hudData?: HudData;
    id?: string;
}

export default function HudContainer({
    components = HUD_COMPONENTS,
    size,
    infiniteAnimate = false,
    draggable = false,
    defaultPosition = { x: 0, y: 0 },
    onPositionChange,
    hudData,
    id
}: HudContainerProps) {
    const hudTypeSettings = useAtomValue(hudSettingsAtom);

    return (
        <DraggableWrapper
            key={hudTypeSettings.type}
            draggable={draggable}
            defaultPosition={defaultPosition}
            className='absolute bottom-20 z-20 transform left-4'
            onPositionChange={onPositionChange}
            id={id}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={hudTypeSettings.type}
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
                    exit={{
                        opacity: 0,
                        scale: 0.8,
                        rotateY: 15,
                        filter: 'blur(4px)'
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.4, 0.0, 0.2, 1],
                        staggerChildren: 0.1
                    }}
                    className={classNames({
                        'flex gap-4': true,
                        'flex-col': hudTypeSettings.alignment === 'column',
                        'flex-row': hudTypeSettings.alignment === 'row'
                    })}
                >
                    <div
                        className={classNames({
                            'flex gap-4': true,
                            'flex-col': hudTypeSettings.alignment === 'column',
                            'flex-row': hudTypeSettings.alignment === 'row'
                        })}
                        style={{
                            transform: `scale(${hudTypeSettings.scale})`
                        }}>
                        {components?.filter?.(componentType => !hudTypeSettings.disabledComponents?.includes?.(componentType))?.map((componentType, index) => (
                            <motion.div
                                key={`${hudTypeSettings.type}-${componentType}`}
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
                                    y: -20,
                                    rotateX: 10
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: [0.4, 0.0, 0.2, 1]
                                }}
                            >
                                <HudFactory
                                    hudType={hudTypeSettings.type}
                                    type={componentType}
                                    value={hudData?.[componentType as keyof HudData] as number}
                                    size={size}
                                    infiniteAnimate={infiniteAnimate}
                                    alignment={hudTypeSettings.alignment}
                                />
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </AnimatePresence>
        </DraggableWrapper>

    );
};