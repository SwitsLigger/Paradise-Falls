import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedSection({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotateY: -15,
                    filter: 'blur(4px)'
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    filter: 'blur(0px)'
                }}
                exit={{
                    opacity: 0,
                    scale: 0.8,
                    rotateY: 15,
                    filter: 'blur(4px)'
                }}
                transition={{
                    duration: 0.6,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
                className="flex flex-col gap-4"
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                        rotateX: -10
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0
                    }}
                    exit={{
                        opacity: 0,
                        y: -20,
                        rotateX: 10
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1]
                    }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
