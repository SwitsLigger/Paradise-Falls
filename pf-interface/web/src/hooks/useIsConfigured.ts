import { useState, useEffect, useCallback } from 'react';
import { loadHudData, loadHudDisplayerData, loadCarHudData, DATA_CHANGE_EVENT } from '@/utils/localStorage';
import { fetchNui } from '@/utils/fetchNui';

let configurationCache: boolean | null = null;

export const useIsConfigured = () => {
    const [isConfigured, setIsConfigured] = useState<boolean | null>(configurationCache);

    const checkConfiguration = useCallback(() => {
        if (configurationCache !== null) {
            fetchNui('toggle_is_configured', configurationCache)
            setIsConfigured(configurationCache);
            return;
        }

        try {
            const hudData = loadHudData();
            const hudDisplayerData = loadHudDisplayerData();
            const carHudData = loadCarHudData();

            const configured = hudData !== null &&
                hudDisplayerData !== null &&
                carHudData !== null;

            configurationCache = configured;
            fetchNui('toggle_is_configured', configured)
            setIsConfigured(configured);
        } catch (error) {
            console.error('Error checking configuration:', error);
            configurationCache = false;
            fetchNui('toggle_is_configured', false)
            setIsConfigured(false);
        }
    }, []);

    const refreshConfiguration = useCallback(() => {
        configurationCache = null;
        checkConfiguration();
    }, [checkConfiguration]);

    useEffect(() => {
        checkConfiguration();

        const handleDataChange = () => {
            refreshConfiguration();
        };

        window.addEventListener(DATA_CHANGE_EVENT, handleDataChange);

        return () => {
            window.removeEventListener(DATA_CHANGE_EVENT, handleDataChange);
        };
    }, [checkConfiguration, refreshConfiguration]);

    return {
        isConfigured,
        isLoading: isConfigured === null,
        checkConfiguration,
        refreshConfiguration,
    };
};
