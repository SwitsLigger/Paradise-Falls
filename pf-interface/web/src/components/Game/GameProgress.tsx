import { motion, AnimatePresence } from 'framer-motion';
import ProgressFactory from '@/components/Progress/ProgressFactory';
import { ProgressData } from '@/components/Progress/types';
import { fetchNui } from '@/utils/fetchNui';
import { Position } from '@/utils/types';

interface GameProgressProps {
    progressBarVisible: boolean;
    progressBarData: ProgressData & { visible: boolean } | null;
    setProgressBarData: (data: ProgressData & { visible: boolean } | null) => void;
    position: Position;
}

export default function GameProgress({ progressBarVisible, progressBarData, setProgressBarData, position }: GameProgressProps) {
    const handleComplete = () => {
        fetchNui('progress_complete');
        setProgressBarData(null);
    };

    return (
        <AnimatePresence mode="wait">
            {progressBarVisible && progressBarData && (
                <ProgressFactory
                    id='progress'
                    data={progressBarData}
                    onComplete={handleComplete}
                    defaultPosition={position}
                    draggable
                />
            )}
        </AnimatePresence>
    );
}
