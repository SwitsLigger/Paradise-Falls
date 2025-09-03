import { motion } from 'framer-motion'
import LogoScreen from '.'

export default function LogoScreenProvider({ title, description }: { title: string, description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full bg-radial-gradient flex flex-col items-center justify-center z-[500]"
        >
            <LogoScreen title={title} description={description} />
        </motion.div>
    )
}
