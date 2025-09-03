import { motion } from 'framer-motion';
import type { BaseHudProps } from '../types';
import { ICON_MAP } from '../data';
import classNames from 'classnames';

export default function CircleHud({
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
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;

    const sizeValue = size === 'xl' ? 8 : 2.3;

    return (
        <div
            className={classNames({
                'flex flex-col justify-center items-center pointer-events-none ml-2 shadow-[0px_0px_10px_0px_var(--main-color)] rounded-full': true,
                [className]: true
            })}
            style={{
                width: `${sizeValue}vw`,
                height: `${sizeValue}vw`,
                ...style
            }}
        >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="fill-theme-bg-2 stroke-[0.16vw] stroke-main-color"
                    strokeDasharray={strokeDasharray}
                    initial={{ strokeDashoffset: infiniteAnimate ? circumference : circumference - (percentage / 100) * circumference }}
                    animate={{
                        strokeDashoffset: infiniteAnimate ? [circumference, 0, circumference] : circumference - (percentage / 100) * circumference
                    }}
                    transition={{
                        duration: infiniteAnimate ? 3 : 0.5,
                        ease: "easeInOut",
                        repeat: infiniteAnimate ? Infinity : 0,
                        repeatType: "reverse"
                    }}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className={classNames("absolute text-white rounded-full flex items-center justify-center", {
                'w-full h-full text-6xl': size === 'xl',
            })}>
                <IconComponent />
            </div>
        </div>
    );
};
