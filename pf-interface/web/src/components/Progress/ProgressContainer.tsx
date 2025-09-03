import ProgressFactory from './ProgressFactory';
import { ProgressData } from './types';
import { useTranslation } from 'react-i18next';
import type { Position } from '@/utils/types';

interface ProgressContainerProps {
    className?: string;
    style?: React.CSSProperties;
    showMultiple?: boolean;
    infiniteAnimate?: boolean;
    draggable?: boolean;
    defaultPosition?: Position;
    onPositionChange?: (position: Position) => void;
    positionSet?: boolean;
    id?: string;
    onComplete?: () => void;
}


export default function ProgressContainer({
    className = '',
    style = {},
    showMultiple = false,
    infiniteAnimate = false,
    draggable = false,
    defaultPosition = { x: 0, y: 0 },
    onPositionChange,
    positionSet = true,
    id,
    onComplete
}: ProgressContainerProps) {
    const { t } = useTranslation();

    const sampleProgressData: ProgressData[] = [
        {
            text: t('welcome.progress.default.text'),
            time: 5000
        }
    ]

    const progressToShow = showMultiple ? sampleProgressData : [sampleProgressData[0]];

    return (
        <>
            {progressToShow.map((progressData, index) => (
                <ProgressFactory
                    key={`${index}`}
                    data={progressData}
                    infiniteAnimate={infiniteAnimate}
                    onComplete={onComplete}
                    positionSet={positionSet}
                />
            ))}
        </>
    );
};
