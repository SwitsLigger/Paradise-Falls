import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSlash } from 'react-icons/fa';
import type { CarHudProps } from '../types';
import classNames from 'classnames';
import Rpm from './Rpm';
import Speed from './Speed';
import { BsFuelPumpFill } from 'react-icons/bs';

export default function ModernCarHud({
    speed = 0,
    fuel = 100,
    rpm = 0,
    topSpeed = 0,
    streetLabel = 'Strawberry Ave',
    units = 'kmh',
    seatbelt = false,
    className = '',
    style = {},
    size = 'md',
    infiniteAnimate = false
}: CarHudProps) {
    const animatedSpeed = infiniteAnimate ? 100 : speed;
    const speedStr = animatedSpeed.toString().padStart(3, '0');
    const rpmPercentage = Math.min(rpm, 100);
    const fuelPercentage = Math.min((fuel / 100) * 100, 100);

    const sizeClasses = {
        md: {
            container: 'w-[20vw] h-[10vw]',
            speedText: 'text-[60px]',
            units: 'text-[40px]',
            streetLabel: 'text-[20px]',
            belt: 'text-[32px]',
            fuel: 'text-[32px]'
        },
        xl: {
            container: 'w-[25vw] h-[12vw]',
            speedText: 'text-[70px]',
            units: 'text-[50px]',
            streetLabel: 'text-[25px]',
            belt: 'text-[40px]',
            fuel: 'text-[40px]'
        }
    };

    const currentSize = sizeClasses[size];

    return (
        <div
            className={classNames({
                'flex flex-col pointer-events-none': true,
                [currentSize.container]: true,
                [className]: true
            })}
            style={style}
        >
            <div className="relative left-0 flex w-full flex-col justify-end items-end scale-75 font-montserrat">
                <div id="line-1" className="absolute top-0 left-0">
                    <svg width="512" height="512" viewBox="0 0 1154 376" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M78 282.5L236.106 115.796C240.826 110.819 247.385 108 254.245 108H1153" stroke="var(--main-color)" strokeWidth="10" />
                    </svg>
                </div>

                <Speed topSpeed={topSpeed} infiniteAnimate={infiniteAnimate} speed={speed} />
                <Rpm infiniteAnimate={infiniteAnimate} rpmPercentage={rpmPercentage} />

                <div className="absolute text-[20px] top-[330px] left-[40px]">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={streetLabel}
                            className="text-white whitespace-nowrap opacity-40"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.4, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut"
                            }}
                        >
                            {streetLabel}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="absolute text-[40px] top-[226px] left-[275px]">
                    <p id="unit-1" className="text-white opacity-50">{units}</p>
                </div>

                <div className="absolute text-7xl top-[226px] left-[393px]">
                    <div className="flex text-white">
                        <motion.div
                            className="text-right"
                            animate={{
                                opacity: infiniteAnimate ? [0.4, 1, 0.4] : (speed >= 100 ? 1 : 0.4)
                            }}
                            transition={{
                                duration: infiniteAnimate ? 2 : 0.3,
                                ease: "easeInOut",
                                repeat: infiniteAnimate ? Infinity : 0,
                                repeatType: "reverse"
                            }}
                        >
                            {speedStr[0]}
                        </motion.div>
                        <motion.div
                            className="text-right"
                            animate={{
                                opacity: infiniteAnimate ? [0.4, 1, 0.4] : (speed >= 10 ? 1 : 0.4)
                            }}
                            transition={{
                                duration: infiniteAnimate ? 2 : 0.3,
                                ease: "easeInOut",
                                repeat: infiniteAnimate ? Infinity : 0,
                                repeatType: "reverse"
                            }}
                        >
                            {speedStr[1]}
                        </motion.div>
                        <motion.div
                            className="text-right"
                            animate={{
                                opacity: infiniteAnimate ? [0.4, 1, 0.4] : (speed >= 1 ? 1 : 0.4)
                            }}
                            transition={{
                                duration: infiniteAnimate ? 2 : 0.3,
                                ease: "easeInOut",
                                repeat: infiniteAnimate ? Infinity : 0,
                                repeatType: "reverse"
                            }}
                        >
                            {speedStr[2]}
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-[270px] left-[140px]">
                    <div className="icon fuel">
                        <BsFuelPumpFill
                            size={32}
                            className="absolute inset-0"
                            style={{ color: 'rgba(255,255,255,0.1)' }}
                        />
                        <BsFuelPumpFill
                            size={32}
                            className="absolute inset-0 transition-all duration-300"
                            style={{
                                color: 'var(--main-color)',
                                clipPath: `inset(${100 - fuelPercentage}% 0 0 0)`
                            }}
                        />
                    </div>
                </div>

                <div className="absolute top-[270px] left-[90px]">
                    <div className="icon belt">
                        <motion.div
                            className="w-[32px] h-[32px]"
                            animate={{
                                color: seatbelt ? 'var(--main-color)' : 'white',
                                scale: seatbelt ? 1.1 : 1,
                                opacity: seatbelt ? 1 : 0.4
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <FaUserSlash className="w-full h-full" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
