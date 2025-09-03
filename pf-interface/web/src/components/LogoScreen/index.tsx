import { Spinner } from '@heroui/react';
import { motion } from 'framer-motion';

export default function LogoScreen({ title, description }: { title: string, description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="text-box"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <div className="text-white !text-7xl font-bold uppercase text-center">{title}</div>
            </motion.div>
            <motion.div
                className="white-subtitle !text-4xl text-center uppercase mt-4 animate-pulse"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                {description}
            </motion.div>
            <Spinner
                className="absolute bottom-5 right-5"
                size="lg"
                color="white"
            />
        </motion.div>
    )
}
