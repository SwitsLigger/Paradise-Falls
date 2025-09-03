import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function InfoStep() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleStartWelcome = () => {
        navigate('/welcome/color');
    };

    return (
        <motion.div
            className="w-full h-full flex flex-col p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: -20,
                transition: {
                    duration: 0.3,
                }
            }}
            transition={{
                duration: 0.3,
            }}
        >
            <div className="flex flex-col justify-center items-center w-full h-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.3,
                    }}
                    className="quasar-title">
                    <svg height="100" stroke="#fff" strokeWidth="2" className="text-line" width="100%">
                        <text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%" className="welcome-text" lengthAdjust="spacingAndGlyphs">{t('welcome.welcome_text')}</text>
                    </svg>
                </motion.div>
                <div className="flex white-subtitle !text-5xl gap-2">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.3,
                            delay: 5,
                        }}
                    >
                        to
                    </motion.span>
                    <motion.span
                        className="title !text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.3,
                            delay: 5.3,
                        }}
                    >
                        {t('welcome.server_name')}
                    </motion.span>
                </div>
            </div>
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.3,
                    delay: 6,
                }}
                className="italic text-lg bg-transparent border-none hover:text-white/80 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0"
                onClick={handleStartWelcome}
            >{t('welcome.ready_to_configure')}</motion.button>
        </motion.div>
    );
};
