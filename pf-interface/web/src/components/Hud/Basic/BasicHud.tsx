import { motion } from 'framer-motion';
import type { BaseHudProps } from '../types';
import classNames from 'classnames';
import { ICON_MAP } from '../data';

export default function BasicHud({
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
                'box-border p-0.5 flex flex-col justify-end relative overflow-hidden pointer-events-none flex-shrink-0 border-[2.56px] border-[var(--main-color)] rounded-lg shadow-[0px_0px_10px_0px_var(--main-color)]': true,
                [className]: true
            })}
            style={{
                width: `${sizeValue}vw`,
                height: `${sizeValue}vw`,
                ...style
            }}
        >
            <div className="overflow-hidden w-full h-full rounded-lg flex flex-col justify-end">
                <motion.div
                    className="w-full bg-main-color"
                    style={{
                        backgroundColor: 'var(--main-color)'
                    }}
                    initial={{ height: infiniteAnimate ? '0%' : `${percentage}%` }}
                    animate={{
                        height: infiniteAnimate ? ['0%', '100%', '0%'] : `${percentage}%`
                    }}
                    transition={{
                        duration: infiniteAnimate ? 3 : 0.5,
                        ease: "easeInOut",
                        repeat: infiniteAnimate ? Infinity : 0,
                        repeatType: "reverse"
                    }}
                />
                <div className={classNames({
                    'absolute inset-0 flex justify-center items-center text-white': true,
                    'w-full h-full text-6xl': size === 'xl',
                })}>
                    <IconComponent className='text-white' />
                </div>
            </div>
        </div>
    );
};
