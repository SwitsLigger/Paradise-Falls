import { motion } from 'framer-motion';
import type { BaseHudProps } from '../types';
import classNames from 'classnames';
import { ICON_MAP } from '../data';

export default function DiamondHud({
    type,
    value = 100,
    maxValue = 100,
    className = '',
    style = {},
    size = 'md',
    infiniteAnimate = false
}: BaseHudProps) {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const IconComponent = ICON_MAP[type];

    const sizeValue = size === 'xl' ? 8 : 2.3;

    return (
        <div
            className={classNames({
                'bg-theme-bg p-1 flex flex-col overflow-hidden transform rotate-45 ml-4 flex-shrink-0 border-2 border-main-color rounded-lg shadow-[0px_0px_10px_0px_var(--main-color)]': true,
                [className]: true
            })}
            style={{
                width: `${sizeValue}vw`,
                height: `${sizeValue}vw`,
                ...style
            }}
        >
            <div className="overflow-hidden w-full h-full rounded-lg relative flex flex-col justify-end">
                <motion.div
                    className="h-full w-full bg-main-color self-start"
                    initial={{ height: infiniteAnimate ? '0%' : `${percentage}%` }}
                    animate={{
                        height: infiniteAnimate ? ['0%', '100%', '0%'] : `${percentage}%`
                    }}
                    transition={{
                        duration: infiniteAnimate ? 3 : 0.5,
                        ease: "easeInOut",
                        repeat: infiniteAnimate ? Infinity : 0,
                    }}
                />
                <div className={classNames({
                    'absolute w-full h-full inset-0 flex justify-center items-center text-white transform -rotate-45': true,
                })}>
                    <IconComponent
                        className={classNames({
                            'w-[5vw] h-[5vw]': size === 'xl',
                            'size-5': size == 'md'
                        })}
                    />
                </div>
            </div>
        </div>
    );
};
