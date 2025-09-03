import { atom } from 'jotai';

export type WelcomeStep = 'logo' | 'header' | 'content' | 'info';

export const stepOrder: WelcomeStep[] = ['info', 'logo', 'header', 'content'];

export const isActiveAtom = atom<boolean>(false);

export const activateAtom = atom(
    null,
    (get, set) => {
        set(isActiveAtom, true);
    }
);

export const deactivateAtom = atom(
    null,
    (get, set) => {
        set(isActiveAtom, false);
    }
);

export const getNextStep = (currentStep: WelcomeStep): WelcomeStep | null => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
        return stepOrder[currentIndex + 1];
    }
    return null;
};

export const getPreviousStep = (currentStep: WelcomeStep): WelcomeStep | null => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
        return stepOrder[currentIndex - 1];
    }
    return null;
};

export const isValidStep = (step: string): step is WelcomeStep => {
    return stepOrder.includes(step as WelcomeStep);
};
