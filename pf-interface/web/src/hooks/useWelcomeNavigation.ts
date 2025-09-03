import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isActiveAtom, getNextStep, getPreviousStep, isValidStep, WelcomeStep } from '@/stores/welcome';

export const useWelcomeNavigation = () => {
    const navigate = useNavigate();
    const { step } = useParams<{ step: string }>();
    const isActive = useAtomValue(isActiveAtom);

    // Get current step from URL params, default to 'logo'
    const currentStep: WelcomeStep = (step && isValidStep(step)) ? step : 'logo';

    const navigateToStep = (step: string) => {
        if (isValidStep(step)) {
            navigate(`/welcome/${step}`);
        }
    };

    const navigateToNext = () => {
        const nextStep = getNextStep(currentStep);
        if (nextStep) {
            navigate(`/welcome/${nextStep}`);
        }
    };

    const navigateToPrevious = () => {
        const previousStep = getPreviousStep(currentStep);
        if (previousStep) {
            navigate(`/welcome/${previousStep}`);
        }
    };

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToPreview = () => {
        navigate('/preview');
    };

    const reset = () => {
        navigate('/welcome/logo');
    };

    return {
        currentStep,
        isActive,
        navigateToStep,
        navigateToNext,
        navigateToPrevious,
        navigateToHome,
        navigateToPreview,
        reset
    };
};
