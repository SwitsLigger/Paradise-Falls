import { motion } from "framer-motion";

type SpeedProps = {
    topSpeed: number;
    infiniteAnimate: boolean;
    speed: number;
}

export default function Speed({ topSpeed, infiniteAnimate, speed }: SpeedProps) {
    const calculateThreshold = (percentage: number) => {
        return Math.round((topSpeed * percentage) / 100);
    }

    const calculateSegmentProgress = (currentThreshold: number, nextThreshold: number, speed: number) => {
        if (speed <= currentThreshold) return 0;
        if (speed >= nextThreshold) return 1;

        const segmentRange = nextThreshold - currentThreshold;
        const progressInSegment = speed - currentThreshold;
        return progressInSegment / segmentRange;
    }

    const speedConfigs = [
        { id: 'speed-0', path: 'M67.1665 265.5C67.1665 265.5 67.1666 265.5 33.5827 234.066C-0.00109863 202.631 0 202.63 0 202.63L0.52404 202.071C0.864384 201.707 1.36661 201.172 2.02034 200.475C3.32776 199.082 5.24145 197.044 7.67846 194.455C12.552 189.277 19.5212 181.888 27.9222 173.026C44.7122 155.316 67.2753 131.666 90.2815 108L156.248 172.128C133.604 195.421 111.326 218.772 94.6879 236.322C86.3746 245.091 79.4827 252.398 74.6736 257.508C72.2694 260.062 70.3864 262.067 69.1075 263.43C68.468 264.111 67.9797 264.632 67.6527 264.981L67.1674 265.499L67.1665 265.5Z', threshold: calculateThreshold(0) },
        { id: 'speed-1', path: 'M218.991 106.69C202.29 122.603 180.754 144.265 158.881 166.705L93 102.488C115.084 79.8326 137.569 57.196 155.527 40.0849C164.418 31.6123 172.779 23.9393 179.689 18.176C183.045 15.3765 186.914 12.3063 190.82 9.69921C192.727 8.42576 195.582 6.62696 199.028 4.98311L199.064 4.96575C201.24 3.92732 209.47 -9.91803e-05 220.487 0L303.002 0.000385286L303.002 92.0004L234.917 92.0001C230.718 95.6845 225.372 100.61 218.991 106.69Z', threshold: calculateThreshold(17) },
        { id: 'speed-2', path: 'M473.225 92L308.002 92L308.002 3.05176e-05L473.225 0L473.225 92Z', threshold: calculateThreshold(33) },
        { id: 'speed-3', path: 'M643.427 92L478.225 92.0003L478.225 0.000274658L643.427 0L643.427 92Z', threshold: calculateThreshold(50) },
        { id: 'speed-4', path: 'M813.202 92L648 92.0003L648 0.000274658L813.202 0L813.202 92Z', threshold: calculateThreshold(67) },
        { id: 'speed-5', path: 'M983.202 92L818 92.0003L818 0.000274658L983.202 0L983.202 92Z', threshold: calculateThreshold(83) },
        { id: 'speed-6', path: 'M1153.2 92L988 92.0003L988 0.000274658L1153.2 0L1153.2 92Z', threshold: calculateThreshold(100) }
    ]

    return speedConfigs.map((config, index) => {
        const currentThreshold = config.threshold;
        const nextThreshold = index < speedConfigs.length - 1 ? speedConfigs[index + 1].threshold : topSpeed;
        const segmentProgress = calculateSegmentProgress(currentThreshold, nextThreshold, speed);
        const baseOpacity = 0.3;
        const maxOpacity = 1.0;
        const opacityRange = maxOpacity - baseOpacity;
        const currentOpacity = baseOpacity + (segmentProgress * opacityRange);

        return (
            <motion.div
                key={config.id}
                id={config.id}
                className="absolute top-0 left-0"
                animate={{
                    opacity: infiniteAnimate ? [0.3, 1, 0.3] : currentOpacity
                }}
                transition={{
                    duration: infiniteAnimate ? 2 : 0.3,
                    ease: "easeInOut",
                    repeat: infiniteAnimate ? Infinity : 0,
                    repeatType: "reverse"
                }}
            >
                <svg width="512" height="512" viewBox="0 0 1154 376" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d={config.path} fill="var(--main-color)" />
                </svg>
            </motion.div>
        );
    });
}
