import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSlash } from 'react-icons/fa';
import type { CarHudProps } from '../types';
import classNames from 'classnames';
import { BsFuelPumpFill } from "react-icons/bs";

const SIZE_CLASSES = {
    md: {
        container: 'w-[20vw]',
        speedBox: 'w-[8vw]',
        speedText: 'text-[3vw]',
        units: 'text-[1vw]',
        streetLabel: 'text-[0.75vw]',
        progress: 'h-[0.8vw]',
        icon: 'w-[1vw] h-[1vw]'
    },
    xl: {
        container: 'w-[20vw]',
        speedBox: 'w-[10vw]',
        speedText: 'text-[3vw]',
        units: 'text-[1.2vw]',
        streetLabel: 'text-[1vw]',
        progress: 'h-[0.8vw]',
        icon: 'w-[1.2vw] h-[1.2vw]'
    }
};

export default function BasicCarHud({
    speed = 0,
    fuel = 100,
    rpm = 0,
    streetLabel = 'Strawberry Ave',
    units = 'kmh',
    seatbelt = false,
    className = '',
    style = {},
    size = 'md',
    infiniteAnimate = false
}: CarHudProps) {
    const speedStr = speed.toString().padStart(3, '0');
    const rpmPercentage = Math.min(rpm, 100);
    const fuelPercentage = Math.min((fuel / 100) * 100, 100);

    const currentSize = SIZE_CLASSES[size];

    return (
        <div
            className={classNames({
                'flex flex-col relative left-0 pointer-events-none': true,
                [currentSize.container]: true,
                [className]: true
            })}
            style={style}
        >
            <div className={classNames({
                'w-full relative mb-[0.5em]': true,
                [currentSize.progress]: true
            })}>
                <figure className="w-full h-full absolute opacity-30 bg-main-color rounded-xl" />
                <motion.div
                    className={`h-full bg-main-color rounded-xl shadow-[0px_0px_15px_0px_var(--main-color)]`}
                    initial={{ width: infiniteAnimate ? '0%' : `${rpmPercentage}%` }}
                    animate={{
                        width: infiniteAnimate ? ['0%', '100%', '0%'] : `${rpmPercentage}%`
                    }}
                    transition={{
                        duration: infiniteAnimate ? 3 : 0.1,
                        ease: "easeInOut",
                        repeat: infiniteAnimate ? Infinity : 0,
                        repeatType: "reverse"
                    }}
                />
            </div>

            <div className="flex w-full justify-between bg-[rgba(12,12,12,1)] rounded-[15px] p-[15px_20px]">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-row justify-start gap-[0.5vw]">
                        <div className={`${currentSize.icon} opacity-100 relative`}>
                            <BsFuelPumpFill
                                size={18}
                                className="absolute inset-0"
                                style={{ color: 'rgba(255,255,255,0.1)' }}
                            />
                            <BsFuelPumpFill
                                size={18}
                                className="absolute inset-0 transition-all duration-300"
                                style={{
                                    color: 'var(--main-color)',
                                    clipPath: `inset(${100 - fuelPercentage}% 0 0 0)`
                                }}
                            />
                        </div>

                        <motion.div
                            className={`${currentSize.icon}`}
                            animate={{
                                color: seatbelt ? 'var(--main-color)' : 'white',
                                scale: seatbelt ? 1.1 : 1,
                                opacity: seatbelt ? 1 : 0.2
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <FaUserSlash className="w-full h-full" />
                        </motion.div>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={streetLabel}
                            className={classNames({
                                'font-poppins text-white opacity-40': true,
                                [currentSize.streetLabel]: true
                            })}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.4, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut"
                            }}
                        >
                            {streetLabel}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className={classNames({
                    'flex justify-end text-white': true,
                    [currentSize.speedBox]: true
                })}>
                    <div className="flex flex-col items-end">
                        <div className="flex">
                            <motion.div
                                className={classNames({
                                    'w-[2vw] font-bold text-right': true,
                                    [currentSize.speedText]: true
                                })}
                                animate={{
                                    opacity: speed >= 100 ? 1 : 0.3
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {speedStr[0]}
                            </motion.div>
                            <motion.div
                                className={classNames({
                                    'w-[2vw] font-bold text-right': true,
                                    [currentSize.speedText]: true
                                })}
                                animate={{
                                    opacity: speed >= 10 ? 1 : 0.3
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {speedStr[1]}
                            </motion.div>
                            <motion.div
                                className={classNames({
                                    'w-[2vw] font-bold text-right': true,
                                    [currentSize.speedText]: true
                                })}
                                animate={{
                                    opacity: speed >= 1 ? 1 : 0.3
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {speedStr[2]}
                            </motion.div>
                        </div>
                        <div className={classNames({
                            'font-poppins font-light italic text-white opacity-50': true,
                            [currentSize.units]: true
                        })}>
                            {units}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
