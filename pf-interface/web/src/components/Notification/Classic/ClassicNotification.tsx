import { motion } from 'framer-motion';
import { NotificationProps } from '../types';
import classNames from 'classnames';
import CustomIcon from '@/components/CustomIcon';

export default function ClassicNotification({
    data,
    textAlign = 'left',
    className = '',
    style
}: NotificationProps) {
    data.icon = data.icon || 'FaInfoCircle';
    const getTextAlignClass = () => {
        switch (textAlign) {
            case 'center':
                return 'text-center justify-center';
            case 'right':
                return 'text-right justify-end';
            default:
                return 'text-left justify-start';
        }
    };

    return (
        <motion.div
            className={classNames({
                'w-[20vw] p-[0.8vw] overflow-hidden max-w-[20vw]': true,
                'flex gap-[0.5vw] text-theme relative left-0 pointer-events-none': true,
                'opacity-100 flex-shrink-0': true,
                'bg-gradient-radial from-[#28343c] to-[rgba(14,21,27,0.8)]': true,
                'border-[1.82px] border-[rgba(52,68,82,1)] rounded-[10px]': true,
                'shadow-lg': true,
                [getTextAlignClass()]: true,
                [className]: true
            })}
            style={style}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
        >
            <motion.div
                className="w-12 h-12 flex justify-center items-center bg-main-color rounded-lg border-2 border-main-color shadow-[0px_0px_16.01px_0px_var(--main-color)] flex-shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 15 }}
                whileHover={{
                    rotate: 360,
                    scale: 1.1
                }}
            >
                <CustomIcon icon={data.icon} />
            </motion.div>
            <motion.div
                className="flex flex-col justify-center gap-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                <motion.div
                    className="w-full font-semibold text-xl leading-[25px] text-[rgba(255,255,255,1)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                >
                    {data.header}
                </motion.div>
                <motion.div
                    className="w-full max-w-[30vw] overflow-hidden whitespace-normal text-sm text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                >
                    {data.text}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
