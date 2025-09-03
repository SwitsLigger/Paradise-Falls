import type { DisplayerComponentProps } from '../types';
import { FaDollarSign, FaPiggyBank, FaBriefcase } from 'react-icons/fa';
import classNames from 'classnames';
import Info from './Info';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { configAtom } from '@/stores/config';

export default function ModernDisplayer({ data, size = 'md' }: DisplayerComponentProps) {
    const config = useAtomValue(configAtom);

    const displayerSizeClasses = {
        md: 'w-[8vw]',
        xl: 'w-[14vw]'
    };

    const iconSizeClasses = {
        md: 'text-[0.65vw] p-[0.5vw]',
        xl: 'text-[1.3vw] p-[0.7vw]'
    };

    const textSizeClasses = {
        md: 'text-[0.55vw]',
        xl: 'text-[0.8vw]'
    };

    return (
        <div className='flex justify-center items-center relative left-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.213)] pointer-events-none flex-shrink-0'>
            <div className='flex flex-col items-end flex-shrink-0'>
                <div className='flex flex-col items-end flex-shrink-0 gap-2'>
                    <motion.div
                        className={classNames({
                            'text-white pr-0 flex overflow-hidden rounded-xl relative bg-theme-bg': true,
                            [displayerSizeClasses[size]]: true
                        })}
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <div className={classNames({
                            'text-center h-full bg-main-color rounded-xl shadow-[0px_0px_15px_0px_var(--main-color)]': true,
                            [iconSizeClasses[size]]: true
                        })}>
                            <FaBriefcase />
                        </div>
                        <div className={`w-full ${textSizeClasses[size]} flex justify-end items-center font-semibold text-center text-white pr-3`}>
                            {data.job}
                        </div>
                    </motion.div>
                    <motion.div
                        className={`${displayerSizeClasses[size]} text-white flex overflow-hidden rounded-xl relative bg-theme-bg`}
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <div className={`${iconSizeClasses[size]} text-center h-full bg-main-color rounded-xl shadow-[0px_0px_15px_0px_var(--main-color)]`}>
                            <FaDollarSign />
                        </div>
                        <div className={`w-full ${textSizeClasses[size]} flex justify-end items-center font-semibold text-center text-white pr-3`}>
                            {new Intl.NumberFormat(config?.intl?.locales, config?.intl?.options).format(data.cash)}
                        </div>
                    </motion.div>
                    <motion.div
                        className={`${displayerSizeClasses[size]} text-white pr-0 flex overflow-hidden rounded-xl relative bg-theme-bg`}
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <div className={`${iconSizeClasses[size]} text-center h-full bg-main-color rounded-[10px] opacity-100 shadow-[0px_0px_15px_0px_var(--main-color)]`}>
                            <FaPiggyBank />
                        </div>
                        <div className={`w-full ${textSizeClasses[size]} flex justify-end items-center font-semibold text-center text-white pr-3`}>
                            {new Intl.NumberFormat(config?.intl?.locales, config?.intl?.options).format(data.bank)}
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex flex-col justify-end"
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <Info title='ID' value={data.identifier} size={size} />
                        <Info title='ONLINE' value={`${data.online}/${data.maxOnline}`} size={size} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
