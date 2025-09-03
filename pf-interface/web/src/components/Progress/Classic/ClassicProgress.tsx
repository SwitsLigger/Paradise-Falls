import { motion } from 'framer-motion';
import { ProgressProps } from '../types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export default function ClassicProgress({
    data = { text: 'Loading...', time: 5000 },
    className = '',
    style,
    showLabel = true,
    infiniteAnimate = false,
    onComplete
}: ProgressProps) {
    const { text = 'Loading...', time = 5000 } = data;
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(!infiniteAnimate);

    useEffect(() => {
        if (!infiniteAnimate && isAnimating) {
            setCurrentPercentage(100);

            const timer = setTimeout(() => {
                setIsAnimating(false);
                onComplete?.();
            }, time);

            return () => clearTimeout(timer);
        }
    }, [infiniteAnimate, time]);

    const percentage = infiniteAnimate ? Math.min(Math.max((time / 100) * 100, 0), 100) : currentPercentage;

    return (
        <div
            className={classNames({
                'w-[20vw]': true,
                [className]: true
            })}
            style={style}
        >
            {showLabel && (
                <div className="!leading-snug text-center white-title !text-2xl">
                    {text}
                </div>
            )}
            <div className="w-full flex h-8 bg-theme-bg rounded-xl overflow-hidden">
                <motion.div
                    className="bg-main-color rounded-xl"
                    initial={{ width: infiniteAnimate ? '0%' : '0%' }}
                    animate={{
                        width: infiniteAnimate ? ['0%', '100%', '0%'] : `${percentage}%`
                    }}
                    transition={{
                        duration: infiniteAnimate ? 3 : time / 1000,
                        ease: infiniteAnimate ? "easeInOut" : "linear",
                        repeat: infiniteAnimate ? Infinity : 0,
                    }}
                >
                </motion.div>
            </div>
        </div>
    );
};
