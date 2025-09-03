import { motion } from 'framer-motion';
import type { BaseHudProps } from '../types';
import classNames from 'classnames';
import { ICON_MAP } from '../data';

const rectWidth = 90;
const rectHeight = 90;
const PERIMETER = 2 * (rectWidth + rectHeight);

export default function ModernHud({
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

    const strokeLength = PERIMETER * (percentage / 100);
    const gapLength = PERIMETER - strokeLength;

    return (
        <div
            className={classNames({
                'shadow-[0px_0px_10px_0px_var(--main-color)] overflow-hidden rounded-lg transform rotate-45 ml-4': true,
                [className]: true
            })}
            style={{
                width: `${sizeValue}vw`,
                height: `${sizeValue}vw`,
                ...style
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full'>
                <motion.rect
                    x="5%"
                    y="5%"
                    rx="8"
                    ry="8"
                    width="90%"
                    height="90%"
                    className={classNames({
                        'fill-[var(--theme-bg-2)] stroke-[var(--main-color)]': true,
                        'stroke-[0.3vw]': size === 'xl',
                        'stroke-[0.16vw]': size === 'md',
                    })}
                    initial={{
                        strokeDasharray: infiniteAnimate ? `${PERIMETER} 0` : `${strokeLength} ${gapLength}`
                    }}
                    animate={{
                        strokeDasharray: infiniteAnimate ? [`${PERIMETER} 0`, `0 ${PERIMETER}`, `${PERIMETER} 0`] : `${strokeLength} ${gapLength}`
                    }}
                    transition={{
                        duration: infiniteAnimate ? 3 : 0.5,
                        ease: "easeInOut",
                        repeat: infiniteAnimate ? Infinity : 0,
                    }}
                    strokeLinecap="round"
                />
            </svg>
            <div className={classNames({
                'text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-main-color flex items-center justify-center shadow-[0px_0px_5px_0px_var(--main-color)]': true,
                'w-[6vw] h-[6vw] p-6': size === 'xl',
                'w-[1.6vw] h-[1.6vw] p-3': size === 'md',
            })}>
                <IconComponent className='w-full h-full -rotate-45' />
            </div>
        </div>
    );
};
