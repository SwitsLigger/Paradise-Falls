import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import ColorPage from './ColorPage';
import InterfacePage from './InterfacePage';
import NotificationPage from './NotificationPage';
import ProgressPage from './ProgressPage';
import CarHudPage from './CarHudPage';
import DisplayPage from './DisplayPage';
import LogoScreenProvider from '@/components/LogoScreen/Provider';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSoundContext } from '@/contexts/SoundContext';

export type WelcomeStep = 'color' | 'interface' | 'notification' | 'progress' | 'display' | 'carhud';

const welcomeSteps: WelcomeStep[] = ['color', 'interface', 'notification', 'progress', 'display', 'carhud'];

export default function Welcome() {
    const { t } = useTranslation();
    const { step } = useParams<{ step: string }>();
    const navigate = useNavigate();
    const { effects, startMusicCycle } = useSoundContext();
    const [currentStep, setCurrentStep] = useState<WelcomeStep>('color');
    const [logoData, setLogoData] = useState<{ title: string, description: string, visible: boolean }>({
        title: t('welcome.server_name'),
        description: t('welcome.loading_editor'),
        visible: true
    });

    const stepNames = {
        color: t('welcome.steps.color'),
        interface: t('welcome.steps.interface'),
        notification: t('welcome.steps.notification'),
        progress: t('welcome.steps.progress'),
        display: t('welcome.steps.display'),
        carhud: t('welcome.steps.carhud')
    };

    useEffect(() => {
        effects.welcome();

        const logoTimer = setTimeout(() => {
            setLogoData({
                ...logoData,
                visible: false
            });
            startMusicCycle();
        }, 4000);

        return () => {
            clearTimeout(logoTimer);
        };
    }, [effects]);

    useEffect(() => {
        if (step && welcomeSteps.includes(step as WelcomeStep)) {
            setCurrentStep(step as WelcomeStep);
        }
    }, [step]);

    const getNextStep = (current: WelcomeStep): WelcomeStep | null => {
        const currentIndex = welcomeSteps.indexOf(current);
        if (currentIndex < welcomeSteps.length - 1) {
            return welcomeSteps[currentIndex + 1];
        }
        return null;
    };

    const getPreviousStep = (current: WelcomeStep): WelcomeStep | null => {
        const currentIndex = welcomeSteps.indexOf(current);
        if (currentIndex > 0) {
            return welcomeSteps[currentIndex - 1];
        }
        return null;
    };

    const navigateToStep = (step: WelcomeStep) => {
        effects.whoosh();
        setCurrentStep(step);
        navigate(`/welcome/${step}`);
    };

    const navigateToNext = () => {
        const nextStep = getNextStep(currentStep);
        if (nextStep) {
            navigateToStep(nextStep);
        } else {
            effects.sheesh()
            setLogoData({
                title: t('welcome.server_name'),
                description: t('welcome.loading_preview'),
                visible: true
            });
            setTimeout(() => {
                navigate('/preview');
            }, 2000);
        }
    };

    const navigateToPrevious = () => {
        const previousStep = getPreviousStep(currentStep);
        if (previousStep) {
            effects.whoosh()
            navigateToStep(previousStep);
        }
    };

    const renderCurrentPage = () => {
        switch (currentStep) {
            case 'color':
                return <ColorPage />;
            case 'interface':
                return <InterfacePage />;
            case 'notification':
                return <NotificationPage />;
            case 'progress':
                return <ProgressPage />;
            case 'display':
                return <DisplayPage />;
            case 'carhud':
                return <CarHudPage />;
            default:
                return <ColorPage />;
        }
    };

    if (logoData?.visible) {
        return (
            <LogoScreenProvider title={logoData.title} description={logoData.description} />
        );
    }

    return (
        <motion.div
            className="absolute inset-0 w-full h-full bg-radial-gradient"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <header className="absolute top-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center justify-between h-full px-6">
                    <h1 className="text-white text-xl font-semibold">Interface Editor</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-white/70 text-sm">
                            {stepNames[currentStep]}
                        </span>
                        <div className="flex items-center gap-2">
                            {welcomeSteps.map((step, index) => (
                                <div
                                    key={step}
                                    className={classNames({
                                        'w-2 h-2 rounded-full transition-colors': true,
                                        'bg-white': step === currentStep,
                                        'bg-white/30': step !== currentStep
                                    })}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <div className="pt-16 h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        className="h-full"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderCurrentPage()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-16 flex items-center w-full gap-4 px-36">
                <button
                    onClick={navigateToPrevious}
                    disabled={!getPreviousStep(currentStep)}
                    className="relative flex items-center justify-start w-full px-3 py-2 text-white font-poppins text-[35px] font-medium italic transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed before:content-['\2190'] before:absolute before:left-[-40px] before:text-blue-400 border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 hover:text-main-color"
                >
                    {t('welcome.previous')}
                </button>
                <button
                    onClick={navigateToNext}
                    disabled={false}
                    className="relative flex items-center justify-end w-full px-3 py-2 text-white font-poppins text-[35px] font-medium italic transition-all duration-300 before:content-['\2192'] before:absolute before:right-[-40px] before:text-blue-400 border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 hover:text-main-color"
                >
                    {getNextStep(currentStep) ? t('welcome.next') : t('welcome.go_to_preview')}
                </button>
            </div>
        </motion.div>
    );
};