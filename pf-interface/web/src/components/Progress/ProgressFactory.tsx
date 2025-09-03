import type { Position } from '@/utils/types';
import DraggableWrapper from '../DraggableWrapper';
import BasicProgress from './Basic/BasicProgress';
import ClassicProgress from './Classic/ClassicProgress';
import SkewProgress from './Skew/SkewProgress';
import { ProgressProps } from './types';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { progressSettingsAtom } from '@/stores/editor';
import { motion } from 'framer-motion';

interface ProgressFactoryProps extends ProgressProps {
    draggable?: boolean;
    defaultPosition?: Position;
    onPositionChange?: (position: Position) => void;
    positionSet?: boolean;
    id?: string;
}

export default function ProgressFactory({
    className = '',
    style = {},
    draggable = false,
    defaultPosition,
    onPositionChange,
    positionSet = true,
    id,
    ...props
}: Omit<ProgressFactoryProps, 'type'>) {
    const progressSettings = useAtomValue(progressSettingsAtom);

    const progressComponent = (() => {

        switch (progressSettings.style) {
            case 'basic':
                return <BasicProgress {...props} type={progressSettings.style} />;
            case 'classic':
                return <ClassicProgress {...props} type={progressSettings.style} />;
            case 'skew':
                return <SkewProgress {...props} type={progressSettings.style} />;
            default:
                return <BasicProgress {...props} type={progressSettings.style} />;
        }
    })();

    return (
        <DraggableWrapper
            draggable={draggable}
            defaultPosition={defaultPosition}
            className={classNames({
                'absolute bottom-40 left-1/2': positionSet
            })}
            style={style}
            onPositionChange={onPositionChange}
            id={id}
        >
            <motion.div
                key={progressSettings.style}
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
                exit={{
                    opacity: 0,
                    y: 20,
                    rotateX: -10
                }}
            >
                <div style={{ transform: `scale(${progressSettings.scale})` }}>
                    {progressComponent}
                </div>
            </motion.div>
        </DraggableWrapper>
    );
}
