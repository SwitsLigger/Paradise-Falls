import { motion } from 'framer-motion';

type RpmProps = {
    infiniteAnimate: boolean;
    rpmPercentage: number;
}

const rpmConfigs = [
    { id: 'rpm-1', path: 'M77.9044 15H0V0H77.9044V15Z', threshold: 17 },
    { id: 'rpm-2', path: 'M254.488 15H98.679V0H254.488V15Z', threshold: 33 },
    { id: 'rpm-3', path: 'M431.071 15H275.262V0H431.071V15Z', threshold: 50 },
    { id: 'rpm-4', path: 'M607.655 15H451.846V0H607.655V15Z', threshold: 67 },
    { id: 'rpm-5', path: 'M784.238 15H628.429V0H784.238V15Z', threshold: 83 },
    { id: 'rpm-6', path: 'M960.821 15H805.012V0H960.821V15Z', threshold: 100 },
];

export default function Rpm({ infiniteAnimate, rpmPercentage }: RpmProps) {
    return (
        rpmConfigs.map(config => (
            <motion.div
                key={config.id}
                id={config.id}
                className="absolute top-[76px] left-[38px]"
                animate={{
                    opacity: infiniteAnimate ? [0.3, 1, 0.3] : (rpmPercentage >= config.threshold ? 1 : 0.3)
                }}
                transition={{
                    duration: infiniteAnimate ? 2 : 0.3,
                    ease: "easeInOut",
                    repeat: infiniteAnimate ? Infinity : 0,
                    repeatType: "reverse"
                }}
            >
                <svg width="512" height="512" viewBox="0 0 1060 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={config.path} fill="var(--main-color)" />
                </svg>
            </motion.div>
        ))
    )
}
