import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSlash } from 'react-icons/fa';
import type { CarHudProps } from '../types';

const TOTAL_PATH_LENGTH = 2100;

const SIZE_CLASSES = {
    md: {
        container: 'w-[20vw] h-[10vw]',
        speedText: 'text-[5vw]',
        units: 'text-[0.65vw]',
        streetLabel: 'text-[0.65vw]',
        belt: 'text-[1vw]',
        rpmSvg: 'w-[18vw]',
        fuelSvg: 'w-[21vw] left-[17vw]'
    },
    xl: {
        container: 'w-[25vw] h-[12vw]',
        speedText: 'text-[6vw]',
        units: 'text-[0.8vw]',
        streetLabel: 'text-[0.8vw]',
        belt: 'text-[1.2vw]',
        rpmSvg: 'w-[22vw]',
        fuelSvg: 'w-[26vw] left-[21vw] top-[-6vw]'
    }
};

export default function AdvancedCarHud({
    speed = 0,
    fuel = 100,
    rpm = 0,
    streetLabel = 'Strawberry Ave',
    units = 'kmh',
    seatbelt = false,
    style = {},
    size = 'md',
    infiniteAnimate = false
}: CarHudProps) {
    const speedStr = speed.toString().padStart(3, '0');
    const rpmPercentage = Math.min(rpm, 100);

    const fuelPercentage = Math.min((fuel / 100) * 100, 100);

    const rpmStrokeDashoffset = infiniteAnimate
        ? TOTAL_PATH_LENGTH
        : TOTAL_PATH_LENGTH - (TOTAL_PATH_LENGTH * (rpmPercentage / 100)) / 2.2;

    const currentSize = SIZE_CLASSES[size];

    return (
        <div className='flex justify-end pointer-events-none w-[20vw] h-[10vw]' style={style}>
            <div className="relative left-0 flex w-full flex-col justify-end items-end scale-75 font-montserrat">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 510 405"
                    fill="none"
                    className={`w-[18vw] overflow-visible absolute`}
                >
                    <path
                        className='base'
                        d="M56.4 406.5C29 371.7 11.4 330.2 5.3 286.4C-0.7 242.6 5.1 198 22 157.1C39 116.3 66.6 80.6 101.9 53.9C137.2 27.1 179.1 10.2 223.2 4.8C267.2 -0.5 311.9 5.9 352.7 23.4C393.5 40.9 428.8 68.9 455.2 104.5C481.5 140.1 497.9 182 502.6 226C507.3 270 500.2 314.4 482 354.7L481.8 354.7C500 314.4 507.1 270 502.4 226C497.7 182.1 481.3 140.2 455 104.6C428.7 69 393.4 41.1 352.6 23.6C311.9 6.1 267.2 -0.3 223.2 5C179.2 10.4 137.3 27.3 102 54C66.7 80.8 39.2 116.4 22.2 157.2C5.2 198 -0.5 242.6 5.5 286.4C11.6 330.2 29.2 371.6 56.5 406.3L56.4 406.5Z"
                        stroke="#000"
                        strokeWidth="30"
                        strokeDashoffset="1055"
                        strokeOpacity="0.4"
                        strokeDasharray={TOTAL_PATH_LENGTH}
                    />

                    <motion.path
                        d="M56.4 406.5C29 371.7 11.4 330.2 5.3 286.4C-0.7 242.6 5.1 198 22 157.1C39 116.3 66.6 80.6 101.9 53.9C137.2 27.1 179.1 10.2 223.2 4.8C267.2 -0.5 311.9 5.9 352.7 23.4C393.5 40.9 428.8 68.9 455.2 104.5C481.5 140.1 497.9 182 502.6 226C507.3 270 500.2 314.4 482 354.7L481.8 354.7C500 314.4 507.1 270 502.4 226C497.7 182.1 481.3 140.2 455 104.6C428.7 69 393.4 41.1 352.6 23.6C311.9 6.1 267.2 -0.3 223.2 5C179.2 10.4 137.3 27.3 102 54C66.7 80.8 39.2 116.4 22.2 157.2C5.2 198 -0.5 242.6 5.5 286.4C11.6 330.2 29.2 371.6 56.5 406.3L56.4 406.5Z"
                        stroke="rgb(255,255,255)"
                        strokeOpacity="0.5"
                        strokeWidth="30"
                        strokeDashoffset={rpmStrokeDashoffset}
                        strokeDasharray={TOTAL_PATH_LENGTH}
                        initial={{ strokeDashoffset: rpmStrokeDashoffset }}
                        animate={{
                            strokeDashoffset: infiniteAnimate ? [TOTAL_PATH_LENGTH, 0, TOTAL_PATH_LENGTH] : rpmStrokeDashoffset
                        }}
                        transition={{
                            duration: infiniteAnimate ? 1 : 0.1,
                            ease: "linear",
                            repeat: infiniteAnimate ? Infinity : 0,
                            repeatType: "reverse"
                        }}
                    />

                    <motion.path
                        className='scale-105 translate-x-[-2.5%] translate-y-[-3.2%]'
                        d="M56.4 406.5C29 371.7 11.4 330.2 5.3 286.4C-0.7 242.6 5.1 198 22 157.1C39 116.3 66.6 80.6 101.9 53.9C137.2 27.1 179.1 10.2 223.2 4.8C267.2 -0.5 311.9 5.9 352.7 23.4C393.5 40.9 428.8 68.9 455.2 104.5C481.5 140.1 497.9 182 502.6 226C507.3 270 500.2 314.4 482 354.7L481.8 354.7C500 314.4 507.1 270 502.4 226C497.7 182.1 481.3 140.2 455 104.6C428.7 69 393.4 41.1 352.6 23.6C311.9 6.1 267.2 -0.3 223.2 5C179.2 10.4 137.3 27.3 102 54C66.7 80.8 39.2 116.4 22.2 157.2C5.2 198 -0.5 242.6 5.5 286.4C11.6 330.2 29.2 371.6 56.5 406.3L56.4 406.5Z"
                        stroke="var(--main-color)"
                        strokeWidth="10"
                        strokeDashoffset={rpmStrokeDashoffset}
                        strokeDasharray={TOTAL_PATH_LENGTH}
                        initial={{ strokeDashoffset: rpmStrokeDashoffset }}
                        animate={{
                            strokeDashoffset: infiniteAnimate ? [TOTAL_PATH_LENGTH, 0, TOTAL_PATH_LENGTH] : rpmStrokeDashoffset
                        }}
                        transition={{
                            duration: infiniteAnimate ? 1 : 0.1,
                            ease: "linear",
                            repeat: infiniteAnimate ? Infinity : 0,
                            repeatType: "reverse"
                        }}
                    />
                </svg>

                <svg
                    viewBox="0 0 507 410"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-[21vw] left-[17vw] top-[-4.5vw] overflow-visible absolute`}
                >
                    <path
                        d="M107.9 328.8C133.5 271.3 137 206.4 117.6 146.5C98.2 86.6 57.4 36 2.9 4.4"
                        strokeWidth="15"
                        stroke="rgba(0,0,0,0.3)"
                        fill="none"
                    />
                    <motion.path
                        d="M107.9 328.8C133.5 271.3 137 206.4 117.6 146.5C98.2 86.6 57.4 36 2.9 4.4"
                        strokeWidth="15"
                        stroke="var(--main-color)"
                        fill="none"
                        strokeDashoffset={380 - (fuelPercentage * 2.8)}
                        strokeDasharray={TOTAL_PATH_LENGTH}
                        initial={{ strokeDashoffset: 380 - (fuelPercentage * 2.8) }}
                        animate={{
                            strokeDashoffset: infiniteAnimate ? [380, 0, 380] : 380 - (fuelPercentage * 2.8)
                        }}
                        transition={{
                            duration: infiniteAnimate ? 1 : 0.1,
                            ease: "linear",
                            repeat: infiniteAnimate ? Infinity : 0,
                            repeatType: "reverse"
                        }}
                    />
                </svg>

                <div className="absolute left-[0.4vw] top-[-3.5vw] w-[20vw] h-[15vw] flex justify-center text-white items-center">
                    <div className="relative text-[5vw] font-semibold flex justify-center tracking-[0.3vw]">
                        <div className="flex text-white">
                            <motion.div
                                className={`w-[3.3vw] text-right`}
                                animate={{
                                    opacity: speed >= 100 ? 1 : 0.4
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {speedStr[0]}
                            </motion.div>
                            <motion.div
                                className={`w-[3.3vw] text-right`}
                                animate={{
                                    opacity: speed >= 10 ? 1 : 0.4
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {speedStr[1]}
                            </motion.div>
                            <motion.div
                                className={`w-[3.3vw] text-right`}
                                animate={{
                                    opacity: speed >= 1 ? 1 : 0.4
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {speedStr[2]}
                            </motion.div>
                        </div>
                        <div className='text-sm absolute left-full top-[19%] opacity-50 font-bold tracking-tighter italic'>
                            {units}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={streetLabel}
                                className={`absolute text-xl top-[6vw] left-0 w-[10vw] text-center text-white opacity-40 font-semibold tracking-tight`}
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
                        <motion.div
                            className={`${currentSize.belt} absolute left-[-6vw] top-[8.2vw]`}
                            animate={{
                                color: seatbelt ? 'var(--main-color)' : 'white',
                                scale: seatbelt ? 1.1 : 1
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <FaUserSlash />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
