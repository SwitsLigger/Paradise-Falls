import type { DisplayerComponentProps } from '../types';
import { FaPiggyBank, FaDollarSign, FaBriefcase } from "react-icons/fa";
import Info from './Info';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { configAtom } from '@/stores/config';
import { useTranslation } from 'react-i18next';

export default function BasicDisplayer({ data, size = 'md' }: DisplayerComponentProps) {
    const config = useAtomValue(configAtom);
    const { t } = useTranslation();
    const sizeClasses = {
        md: 'text-[0.55vw] gap-[0.5vw]',
        xl: 'text-[1.1vw] gap-[1vw]'
    };

    const iconSizeClasses = {
        md: 'text-[1.4vw]',
        xl: 'text-[1.9vw]'
    };

    const textSizeClasses = {
        md: 'text-[0.65vw]',
        xl: 'text-[0.9vw]'
    };

    const displayerSizeClasses = {
        md: 'min-w-[6vw] h-[4vw]',
        xl: 'min-w-[8vw] h-[6vw]'
    };

    return (
        <div
            className={classNames({
                'flex flex-col': true,
                [sizeClasses[size]]: true,
            })}
        >
            <div className="flex w-full justify-end gap-2 flex-shrink-0 mb-1">
                {config?.optional?.display?.job && (
                    <motion.div
                        className={classNames({
                            'flex flex-col gap-3 justify-center items-center bg-radial-gradient border-1 border-[rgba(52,68,82,1)] rounded-xl': true,
                            [displayerSizeClasses[size]]: true
                        })}
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <div className={`${iconSizeClasses[size]} text-white`}>
                            <FaBriefcase />
                        </div>
                        <div className={`font-semibold ${textSizeClasses[size]} font-poppins text-center text-white displayer-text-configurator`}>
                            {data.job}
                        </div>
                    </motion.div>
                )}
                {config?.optional?.display?.cash && (
                    <motion.div
                        className={classNames({
                            'flex flex-col gap-3 justify-center items-center bg-radial-gradient border-1 border-[rgba(52,68,82,1)] rounded-xl': true,
                            [displayerSizeClasses[size]]: true
                        })}
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <div className={`${iconSizeClasses[size]} text-white`}>
                            <FaDollarSign />
                        </div>
                        <div className={`font-semibold ${textSizeClasses[size]} font-poppins text-center text-white`}>
                            {new Intl.NumberFormat(config?.intl?.locales, config?.intl?.options).format(data.cash)}
                        </div>
                    </motion.div>
                )}
                {config?.optional?.display?.bank && (
                    <motion.div
                        className={classNames({
                            'flex flex-col gap-3 justify-center items-center bg-radial-gradient border-1 border-[rgba(52,68,82,1)] rounded-xl': true,
                            [displayerSizeClasses[size]]: true
                        })}
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <div className={`${iconSizeClasses[size]} text-white`}>
                            <FaPiggyBank />
                        </div>
                        <div className={`font-semibold ${textSizeClasses[size]} font-poppins text-center text-white`}>
                            {new Intl.NumberFormat(config?.intl?.locales, config?.intl?.options).format(data.bank)}
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="flex w-full justify-end gap-2 flex-shrink-0 mb-[0.25vw]">
                {config?.optional?.display?.id && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <Info title={t('display.id')} value={data.identifier} size={size} />
                    </motion.div>
                )}
                {config?.optional?.display?.online && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                        <Info title={t('display.online')} value={`${data.online}/${data.maxOnline}`} size={size} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};