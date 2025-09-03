import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface PreviewEndModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function PreviewEndModal({ isOpen, onClose, onConfirm }: PreviewEndModalProps) {
    const { t } = useTranslation();
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-radial-gradient"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            y: 20
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0.0, 0.2, 1]
                        }}
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-white text-6xl font-bold font-poppins mb-4">
                                {t('welcome.preview.modal.title')}
                            </h2>
                            <p className="text-gray-300 text-2xl font-poppins">
                                {t('welcome.preview.modal.description')}
                            </p>
                        </div>

                        <div className="flex justify-center gap-8">
                            <motion.button
                                className="px-8 py-3 rounded-xl font-poppins font-medium text-lg text-white border-2 border-transparent"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0px 0px 20px 8px rgba(255, 0, 0, 1)',
                                    background: 'radial-gradient(56.16% 56.16% at 50% 43.84%, rgba(255, 0, 0, 0.9) 0%, rgba(149, 0, 0, 0.9) 98%)',
                                    transition: { duration: 0.1, ease: "easeOut" }
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                            >
                                <div className="flex items-center gap-2">
                                    {t('welcome.preview.modal.no')}
                                </div>
                            </motion.button>

                            <motion.button
                                className="px-8 py-3 rounded-xl font-poppins font-medium text-lg text-white border-2 border-transparent"
                                whileHover={{
                                    scale: 1.05,
                                    background: 'radial-gradient(56.16% 56.16% at 50% 43.84%, rgba(0, 163, 255, 0.9) 0%, rgba(0, 95, 149, 0.9) 98%)',
                                    boxShadow: '0px 0px 20px 8px rgba(0, 163, 255, 1)',
                                    transition: { duration: 0.1, ease: "easeOut" }
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onConfirm}
                            >
                                <div className="flex items-center gap-2">
                                    {t('welcome.preview.modal.yes')}
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
