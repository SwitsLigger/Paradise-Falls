import { motion } from 'framer-motion'

type HeaderProps = {
    title: string;
    description: string;
}

export default function Header({ title, description }: HeaderProps) {
    return (
        <>
            <motion.div
                className="text-7xl font-bold text-white mb-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {title}
            </motion.div>

            <motion.div
                className="text-white text-2xl italic text-center mb-8"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {description}
            </motion.div>
        </>
    )
}
