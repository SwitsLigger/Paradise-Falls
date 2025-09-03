import React from 'react';
import { motion } from 'framer-motion';
import BasicDisplayer from './Basic/BasicDisplayer';
import ModernDisplayer from './Modern/ModernDisplayer';
import SkewDisplayer from './Skew/SkewDisplayer';
import Modern2Displayer from './Modern2/Modern2Displayer';
import ModernSkewDisplayer from './ModernSkew/ModernSkewDisplayer';
import type { BaseDisplayerProps } from './types';
import DraggableWrapper from '../DraggableWrapper';
import classNames from 'classnames';
import type { Position } from '@/utils/types';
import { useAtomValue } from 'jotai';
import { displayerSettingsAtom } from '@/stores/editor';

interface DisplayerFactoryProps extends BaseDisplayerProps {
    children?: React.ReactNode;
    draggable?: boolean;
    defaultPosition?: Position;
    onPositionChange?: (position: Position) => void;
    positionSet?: boolean;
    id?: string;
    style?: React.CSSProperties;
}

export default function DisplayerFactory({
    data,
    size,
    draggable = false,
    defaultPosition = { x: 0, y: 0 },
    positionSet = true,
    onPositionChange,
    id,
    style
}: Omit<DisplayerFactoryProps, 'type'>) {
    const displayerSettings = useAtomValue(displayerSettingsAtom);
    const commonProps = {
        data,
        size
    };

    const displayerComponent = (() => {
        switch (displayerSettings.displayerType) {
            case 'basic':
                return <BasicDisplayer {...commonProps} type={displayerSettings.displayerType} />;
            case 'modern':
                return <ModernDisplayer {...commonProps} type={displayerSettings.displayerType} />;
            case 'skew':
                return <SkewDisplayer {...commonProps} type={displayerSettings.displayerType} />;
            case 'modern2':
                return <Modern2Displayer {...commonProps} type={displayerSettings.displayerType} />;
            case 'modernskew':
                return <ModernSkewDisplayer {...commonProps} type={displayerSettings.displayerType} />;
            default:
                return <BasicDisplayer {...commonProps} type="basic" />;
        }
    })();

    return (
        <DraggableWrapper
            draggable={draggable}
            defaultPosition={defaultPosition}
            className={classNames({
                'absolute right-4 top-4 transform': positionSet
            })}
            id={id}
            style={style}
        >
            <motion.div
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
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
            >

                <div style={{ transform: `scale(${displayerSettings.scale})` }}>
                    {displayerComponent}
                </div>
            </motion.div>
        </DraggableWrapper>
    );
}
