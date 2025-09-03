import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import NotificationFactory from '@/components/Notification/NotificationFactory';
import CarHudFactory from '@/components/CarHud/CarHudFactory';
import DisplayerFactory from '@/components/Displayers/DisplayerFactory';
import HudContainer from '@/components/Hud/HudContainer';
import { NotificationData } from '@/components/Notification/types';
import { hudDisplayerDataAtom } from '@/stores';
import { useAtom, useAtomValue } from 'jotai';
import PreviewEndModal from '@/pages/Preview/PreviewEndModal';
import { saveAllData, ComponentPositions, DEFAULT_POSITIONS, saveComponentPositions } from '@/utils/localStorage';
import { displayerSettingsAtom, notificationSettingsAtom, progressSettingsAtom, hudSettingsAtom, carHudSettingsAtom, themeAtom, componentPositionsAtom } from '@/stores/editor';
import { isEnvBrowser } from '@/utils/misc';
import Debug from '@/components/Game/Debug';
import { useTranslation } from 'react-i18next';
import LogoScreenProvider from '@/components/LogoScreen/Provider';
import { Position } from '@/utils/types';
import { useGameDrag } from '@/components/Game/hooks/useGameDrag';
import ProgressFactory from '@/components/Progress/ProgressFactory';
import { configAtom } from '@/stores/config';
import { fetchNui } from '@/utils/fetchNui';

export default function PreviewPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [openLogo, setOpenLogo] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
    const [componentPositions, setComponentPositions] = useAtom(componentPositionsAtom)

    const displayerData = useAtomValue(hudDisplayerDataAtom);
    const notificationSettings = useAtomValue(notificationSettingsAtom);
    const informationSettings = useAtomValue(displayerSettingsAtom);
    const progressSettings = useAtomValue(progressSettingsAtom);
    const hudSettings = useAtomValue(hudSettingsAtom);
    const carHudSettings = useAtomValue(carHudSettingsAtom);
    const theme = useAtomValue(themeAtom);
    const config = useAtomValue(configAtom);

    const notification: NotificationData = {
        icon: 'fas fa-inbox',
        header: t('welcome.notification.default.header'),
        text: t('welcome.notification.default.text'),
        time: 5000
    }

    const { isDragging, handleDragStart, handleDragMove, handleDragEnd } = useGameDrag(componentPositions, handlePositionChange)

    const onCloseModal = () => {
        setShowEndModal(false);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isDragging) return;

            if (event.key === 'Escape') {
                navigate('/welcome/carhud');
            } else if (event.key === 'Enter') {
                if (document.activeElement) {
                    (document.activeElement as HTMLElement).blur();
                }
                setShowEndModal(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate, isDragging]);

    const handleConfirmEnd = () => {
        setShowEndModal(false);
        setOpenLogo(true);
        fetchNui('game_screen_preparing')

        setTimeout(() => {
            fetchNui('toggle_is_configured', true)
        }, 1000);

        setTimeout(() => {
            navigate('/');
            saveAllData({
                hud: hudSettings,
                displayer: informationSettings,
                carHud: carHudSettings,
                componentPositions: componentPositions,
                notification: notificationSettings,
                progress: progressSettings,
                colors: theme
            });
        }, 5000);
    };

    function handlePositionChange(component: keyof ComponentPositions, position: Position) {
        const newPositions = {
            ...componentPositions,
            [component]: position
        };
        setComponentPositions(newPositions);
        saveComponentPositions(newPositions);
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
        >
            {openLogo && (
                <LogoScreenProvider title={t('welcome.game.logo.title')} description={t('welcome.game.logo.description')} />
            )}
            <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${config?.previewBackground || 'https://i.ibb.co/392hB0xf/Screenshot-35.png'})`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute top-0 left-0 right-0 h-16 border-b border-white/10 z-50">
                    <div className="flex items-center justify-between h-full px-6">
                        <h1 className="text-white text-xl font-semibold">{t('welcome.preview.title')}</h1>
                        <div className="flex items-center gap-4">
                            <span className={`text-sm ${isDragging ? 'text-white/30' : 'text-white/70'}`}>
                                {t('welcome.preview.return_esc')}
                            </span>
                            <span className={`text-sm ${isDragging ? 'text-white/30' : 'text-white/70'}`}>
                                {t('welcome.preview.enter_to_finish')}
                            </span>
                            {isDragging && (
                                <span className="text-yellow-400 text-sm font-medium">
                                    {t('welcome.preview.dragging_mode')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {isEnvBrowser() && (
                    <Debug componentPositions={componentPositions} setComponentPositions={setComponentPositions} />
                )}

                <motion.div
                    className="relative w-full h-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <HudContainer
                        infiniteAnimate
                        draggable
                        defaultPosition={componentPositions.hud}
                        onPositionChange={(pos) => handlePositionChange('hud', pos)}
                        id="hud"
                    />

                    <NotificationFactory
                        type={notificationSettings.type}
                        data={notification}
                        draggable
                        defaultPosition={componentPositions.notification}
                        onPositionChange={(pos) => handlePositionChange('notification', pos)}
                        id="notification"
                    />

                    <ProgressFactory
                        infiniteAnimate
                        draggable
                        defaultPosition={componentPositions.progress}
                        onPositionChange={(pos) => handlePositionChange('progress', pos)}
                        id="progress"
                    />

                    <CarHudFactory
                        infiniteAnimate
                        draggable
                        defaultPosition={componentPositions.carHud}
                        onPositionChange={(pos) => handlePositionChange('carHud', pos)}
                        id="carHud"
                    />

                    <DisplayerFactory
                        data={displayerData}
                        draggable
                        defaultPosition={componentPositions.displayer}
                        onPositionChange={(pos) => handlePositionChange('displayer', pos)}
                        id="displayer"
                    />
                </motion.div>

                <PreviewEndModal
                    isOpen={showEndModal}
                    onClose={onCloseModal}
                    onConfirm={handleConfirmEnd}
                />
            </motion.div>
        </DndContext>
    );
}
