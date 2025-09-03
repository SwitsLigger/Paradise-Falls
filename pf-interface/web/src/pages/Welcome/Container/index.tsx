import { motion } from 'framer-motion'
import React from 'react'

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <motion.div
            className={`h-full p-8 overflow-y-auto flex items-center flex-col ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    )
}
