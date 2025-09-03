import { motion } from 'framer-motion';
import type { BaseHudProps } from '../types';
import { ICON_MAP } from '../data';
import classNames from 'classnames';

export default function HexagonHud({
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
    const gradientId = `hud-${type}-hexagon`;

    const sizeValue = size === 'xl' ? 8 : 2.9;

    return (
        <div
            className={classNames({
                'relative flex justify-center items-center': true,
                [className]: true
            })}
            style={{
                width: `${sizeValue}vw`,
                height: `${sizeValue}vw`,
                ...style
            }}
        >
            <svg
                viewBox="0 0 830 830"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain overflow-visible absolute left-0 top-0"
                style={{
                    filter: 'drop-shadow(0px 0px 10.01px var(--main-color))'
                }}
            >
                <defs>
                    <linearGradient id={gradientId} gradientTransform="rotate(90)">
                        <motion.stop
                            stopColor="rgba(0,0,0,0.4)"
                            initial={{ offset: infiniteAnimate ? "100%" : `${100 - percentage}%` }}
                            animate={{
                                offset: infiniteAnimate ? ["100%", "0%", "100%"] : `${100 - percentage}%`
                            }}
                            transition={{
                                duration: infiniteAnimate ? 3 : 0.5,
                                ease: "easeInOut",
                                repeat: infiniteAnimate ? Infinity : 0,
                            }}
                        />
                        <stop offset="0%" stopColor="var(--main-color)" />
                    </linearGradient>
                </defs>
                <path
                    d="M143.3 577.8L141.8 249L428.1 83.7L715.6 249.9L713.8 578.7L427.5 744L143.3 577.8Z"
                    fill={`url(#${gradientId})`}
                />
                <path
                    d="M192.4 549.5L191.1 277.2L428.3 140.3L666.3 278L664.9 550.2L427.8 687.1L192.4 549.5Z"
                    fill="rgba(0,0,0,0.7)"
                />
            </svg>
            <div className={classNames({
                'relative flex items-center justify-center text-white w-full h-full': true,
                'w-full h-full text-4xl': size === 'xl',
                'p-5': size === 'md',
            })}>
                <IconComponent />
            </div>
        </div>
    );
};
