import { motion } from 'framer-motion';
import { NotificationProps } from '../types';
import classNames from 'classnames';
import CustomIcon from '@/components/CustomIcon';

export default function BasicNotification({
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
                'flex flex-col flex-wrap text-theme gap-[0.5vw] relative opacity-100': true,
                'pointer-events-none flex-shrink-0': true,
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
                className={classNames({
                    'flex w-full': true,
                    'text-center items-center justify-center': textAlign === 'center',
                    'text-right items-end justify-end': textAlign === 'right',
                    'text-left items-start justify-start': textAlign === 'left',
                })}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                <motion.div
                    className="size-[1.5vw] text-sm flex flex-col justify-center text-white bg-main-color items-center rounded-md shadow-[0px_0px_4.16px_0px_var(--main-color)]"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                >
                    <CustomIcon icon={data.icon} />
                </motion.div>
                <motion.div
                    className="font-bold text-xl px-2 leading-6 text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                >
                    {data.header}
                </motion.div>
            </motion.div>
            <motion.div
                className="max-w-[30vw] overflow-hidden whitespace-normal font-medium text-sm pl-9 text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
            >
                {data.text}
            </motion.div>
        </motion.div>
    );
};
