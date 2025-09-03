import { AnimatePresence } from 'framer-motion'
import InfoStep from '.'

export default function WelcomeFirstScreenProvider() {
    return (
        <AnimatePresence mode="wait">
            <div className="w-full h-full absolute inset-0 bg-radial-gradient z-50">
                <InfoStep />
            </div>
        </AnimatePresence >
    )
}
