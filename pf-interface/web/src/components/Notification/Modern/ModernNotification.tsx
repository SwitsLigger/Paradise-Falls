import { motion } from 'framer-motion';
import { NotificationProps } from '../types';
import classNames from 'classnames';
import CustomIcon from '@/components/CustomIcon';

export default function ModernNotification({
    data,
    textAlign = 'left',
    className = '',
    style
}: NotificationProps) {
    data.icon = data.icon || 'FaInfoCircle';
    const getAlignClass = () => {
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
                'w-[20vw] flex relative left-0': true,
                'bg-gradient-radial from-[#28343c] to-[rgba(14,21,27,0.8)]': true,
                'border-[1.82px] border-[rgba(52,68,82,1)] rounded-xl items-center': true,
                'p-[0.5vw] pl-[1vw] pr-[1vw]': true,
                'shadow-xl': true,
                [getAlignClass()]: true,
                [className]: true
            })}
            style={{
                ...style,
                position: 'relative',
            }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
        >
            <motion.div
                className="absolute -left-1 w-2 h-16 bg-main-color shadow-[0px_0px_11.85px_0px_var(--main-color)] rounded-lg"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            ></motion.div>

            <motion.div
                className="absolute -right-1 w-2 h-16 bg-main-color shadow-[0px_0px_11.85px_0px_var(--main-color)] rounded-lg"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            ></motion.div>

            <motion.div
                className="text-4xl p-3 text-white bg-main-color rounded-2xl border-main-color shadow-[0px_0px_16.01px_0px_var(--main-color)]"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 15 }}
                whileHover={{ rotate: 360 }}
            >
                <CustomIcon icon={data.icon} />
            </motion.div>
            <motion.div
                className={classNames({
                    'w-full h-full box-border p-4 text-sm text-theme': true,
                    'flex flex-col gap-1 overflow-hidden break-words': true,
                    'items-start whitespace-normal': true,
                    [getAlignClass()]: true
                })}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
            >
                <motion.div
                    className="w-full text-xl font-semibold leading-6 text-white"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                >
                    {data.header}
                </motion.div>
                <motion.div
                    className="w-full whitespace-normal text-sm font-medium text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                >
                    {data.text}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
