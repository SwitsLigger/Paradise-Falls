import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaSpinner, FaTasks, FaCar, FaFill, FaHeart, FaEye, FaShieldAlt, FaUtensils, FaTint } from 'react-icons/fa';
import { useAtom, useAtomValue } from 'jotai';
import { hudSettingsAtom, displayerSettingsAtom, notificationSettingsAtom, progressSettingsAtom, carHudSettingsAtom, themeAtom, componentPositionsAtom } from '@/stores/editor';
import Hud from './Hud';
import Notify from './Notify';
import Displayers from './Displayers';
import Progress from './Progress';
import CarHud from './CarHud';
import Theme from './Theme';
import ComponentVisibility from './Components/ComponentVisibility';
import { saveAllData } from '@/utils/localStorage';
import { dispatchMessage } from '@/utils/dispatchMessage';
import { fetchNui } from '@/utils/fetchNui';
import type { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';

interface EditorProps {
    visible: boolean;
    onClose: () => void;
}

type MenuElement = 'hud' | 'notify' | 'displayers' | 'progress' | 'carhud' | 'theme';

const menuItemVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    active: {
        scale: 1.1,
        y: -3,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

const titleVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const subtitleVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, delay: 0.2, ease: "easeOut" }
    }
};

export default function Editor({ visible, onClose }: EditorProps) {
    const { t } = useTranslation();
    const [activeElement, setActiveElement] = useState<MenuElement>('hud');

    const [hudSettings, setHudSettings] = useAtom(hudSettingsAtom);
    const [componentPositions, setComponentPositions] = useAtom(componentPositionsAtom);
    const [informationSettings, setInformationSettings] = useAtom(displayerSettingsAtom);
    const [notificationSettings, setNotificationSettings] = useAtom(notificationSettingsAtom);
    const [progressSettings, setProgressSettings] = useAtom(progressSettingsAtom);
    const [carHudSettings, setCarHudSettings] = useAtom(carHudSettingsAtom);
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && visible) {
                onClose();
                clearActiveElements();
                fetchNui('close_editor')
                saveAllData({
                    hud: hudSettings,
                    displayer: informationSettings,
                    notification: notificationSettings,
                    progress: progressSettings,
                    carHud: carHudSettings,
                    colors: theme
                });
            }
        };

        if (visible) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [visible, hudSettings, informationSettings, notificationSettings, progressSettings, carHudSettings, theme]);

    useEffect(() => {
        if (visible) {
            setActiveElement('hud');
            clearActiveElements()
        }
    }, [visible]);

    const menuItems = [
        { id: 'hud', icon: FaHeart, label: t('editor.items.hud') },
        { id: 'notify', icon: FaBell, label: t('editor.items.notify') },
        { id: 'displayers', icon: FaSpinner, label: t('editor.items.displayers') },
        { id: 'progress', icon: FaTasks, label: t('editor.items.progress') },
        { id: 'carhud', icon: FaCar, label: t('editor.items.carhud') },
        { id: 'theme', icon: FaFill, label: t('editor.items.theme') },
    ] as { id: MenuElement, icon: IconType, label: string }[];

    const renderContent = () => {
        switch (activeElement) {
            case 'hud':
                return (
                    <Hud
                        hudScale={hudSettings.scale}
                        setHudScale={(scale) => setHudSettings(prev => ({ ...prev, scale }))}
                        hudType={hudSettings.type}
                        setHudType={(type) => setHudSettings(prev => ({ ...prev, type: type }))}
                        hudAlign={hudSettings.alignment}
                        setHudAlign={(alignment) => setHudSettings(prev => ({ ...prev, alignment: alignment as any }))}
                        setHudPosition={(position) => setComponentPositions({ ...componentPositions, hud: position })}
                    />
                );
            case 'notify':
                return (
                    <Notify
                        notifyScale={notificationSettings.scale}
                        setNotifyScale={(scale) => setNotificationSettings(prev => ({ ...prev, scale }))}
                        notifyType={notificationSettings.type}
                        setNotifyType={(type) => setNotificationSettings(prev => ({ ...prev, type: type as any }))}
                        notifyAlign={notificationSettings.textAlign}
                        setNotifyAlign={(textAlign) => setNotificationSettings(prev => ({ ...prev, textAlign: textAlign as any }))}
                        setNotifyPosition={(position) => setComponentPositions({ ...componentPositions, notification: position })}
                    />
                );
            case 'displayers':
                return (
                    <Displayers
                        displayersScale={informationSettings.scale}
                        setDisplayersScale={(scale) => setInformationSettings(prev => ({ ...prev, scale }))}
                        displayersType={informationSettings.displayerType}
                        setDisplayersType={(displayerType) => setInformationSettings(prev => ({ ...prev, displayerType: displayerType as any }))}
                        setDisplayersPosition={(position) => setComponentPositions({ ...componentPositions, displayer: position })}
                    />
                );
            case 'progress':
                return (
                    <Progress
                        progressScale={progressSettings.scale}
                        setProgressScale={(scale) => setProgressSettings(prev => ({ ...prev, scale }))}
                        progressType={progressSettings.style}
                        setProgressType={(style) => setProgressSettings(prev => ({ ...prev, style: style as any }))}
                        setProgressPosition={(position) => setComponentPositions({ ...componentPositions, progress: position })}
                    />
                );
            case 'carhud':
                return (
                    <CarHud
                        carHudScale={carHudSettings.scale}
                        setCarHudScale={(scale) => setCarHudSettings(prev => ({ ...prev, scale }))}
                        carHudType={carHudSettings.style}
                        setCarHudType={(style) => setCarHudSettings(prev => ({ ...prev, style: style as any }))}
                        carHudMinimap={carHudSettings.minimap}
                        setCarHudMinimap={(minimap) => setCarHudSettings(prev => ({ ...prev, minimap: minimap as any }))}
                        setCarHudPosition={(position) => setComponentPositions({ ...componentPositions, carHud: position })}
                    />
                );
            case 'theme':
                return <Theme />;
            default:
                return null;
        }
    };

    const clearActiveElements = () => {
        dispatchMessage('remove_notification');
        dispatchMessage('toggle_progress_bar', { visible: false })
        dispatchMessage('toggle_vehicle', { visible: false })
    }

    const changeActiveElement = (id: MenuElement) => {
        setActiveElement(id);
        clearActiveElements();
        if (id === 'notify') {
            dispatchMessage('add_notification', {
                icon: 'FaInfoCircle',
                header: 'Sample Notification',
                text: 'This is a sample notification',
            });
        } else if (id === 'progress') {
            dispatchMessage('toggle_progress_bar', {
                text: 'Sample Progress',
                time: 5000000000,
                visible: true
            });
        } else if (id === 'carhud') {
            dispatchMessage('toggle_vehicle', {
                visible: true
            });
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 flex w-full h-full items-center bg-gradient-to-br gap-12 bg-black/95 scale-100 z-10 p-12"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-auto h-full flex flex-col justify-center items-center gap-4">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={() => changeActiveElement(item.id)}
                                className={`pointer-events-all overflow-hidden box-border p-[0.3vw] transition-all duration-[185ms] ease-in-out w-[80px] h-[87px] border-2 rounded-[10px] flex items-center justify-center cursor-pointer ${activeElement === item.id
                                    ? 'text-white border-main-color shadow-[0px_0px_16.01px_0px_var(--main-color)] bg-gradient-radial bg-main-color'
                                    : 'text-gray-300 border-[rgba(87,87,87,0.75)] bg-gradient-radial from-[#2a2a2a] to-[#181818] hover:text-white hover:border-main-color hover:shadow-[0px_0px_16.01px_0px_var(--main-color)] hover:bg-gradient-radial hover:bg-main-color'
                                    }`}
                                variants={menuItemVariants}
                                initial="initial"
                                whileHover="hover"
                                animate={activeElement === item.id ? "active" : "initial"}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <motion.div
                                    className="text-[1vw]"
                                    animate={{
                                        rotate: activeElement === item.id ? [0, -10, 10, 0] : 0
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeInOut",
                                        repeat: activeElement === item.id ? Infinity : 0,
                                        repeatDelay: 2
                                    }}
                                >
                                    <item.icon />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="w-[17vw] h-[32.5vw] p-4 text-gray-300 flex flex-col bg-gradient-radial from-[#2a2a2a] to-[rgba(23,23,23,0.8)] border-2 border-[rgba(43,43,43,1)] rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <motion.div
                            className="w-full drop-shadow-[0_0_9px_rgba(0,0,0,0.5)] items-center gap-[0.1vw] justify-between left-0 mb-8 flex-col flex"
                            variants={titleVariants}
                            initial="initial"
                            animate="animate"
                            key={activeElement}
                        >
                            <motion.div
                                className="uppercase italic font-bold text-4xl leading-9 text-center text-white"
                                variants={titleVariants}
                            >
                                {menuItems.find(item => item.id === activeElement)?.label}
                            </motion.div>
                            <motion.div
                                className="transform -skew-x-12 mr-[0.23vw] p-[0.02vw_0.2vw] uppercase italic text-sm leading-6 text-main-color"
                                variants={subtitleVariants}
                                initial="initial"
                                animate="animate"
                            >
                                {activeElement === 'hud' && hudSettings.type}
                                {activeElement === 'notify' && notificationSettings.type}
                                {activeElement === 'displayers' && informationSettings.displayerType}
                                {activeElement === 'progress' && progressSettings.style}
                                {activeElement === 'carhud' && carHudSettings.style}
                                {activeElement === 'theme' && 'Color'}
                            </motion.div>
                        </motion.div>
                        <div className="flex flex-col w-full h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeElement}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="w-full h-full"
                                >
                                    {renderContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {activeElement === 'hud' && (
                        <motion.div
                            className="w-[23vw] h-[25vw] p-4 text-gray-300 flex flex-col bg-gradient-radial from-[#2a2a2a] to-[rgba(23,23,23,0.8)] border-2 border-[rgba(43,43,43,1)] rounded-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <motion.div
                                className="w-full drop-shadow-[0_0_9px_rgba(0,0,0,0.5)] items-center gap-[0.1vw] justify-between left-0 mb-6 flex-col flex"
                                variants={titleVariants}
                                initial="initial"
                                animate="animate"
                            >
                                <motion.div
                                    className="uppercase italic font-bold text-2xl leading-7 text-center text-white"
                                    variants={titleVariants}
                                >
                                    {t('editor.items.component_visibility')}
                                </motion.div>
                                <motion.div
                                    className="transform -skew-x-12 mr-[0.23vw] p-[0.02vw_0.2vw] uppercase italic text-xs leading-4 text-main-color"
                                    variants={subtitleVariants}
                                    initial="initial"
                                    animate="animate"
                                >
                                    {t('editor.items.component_visibility_subtitle')}
                                </motion.div>
                            </motion.div>

                            <div className="flex flex-col w-full h-full">
                                <ComponentVisibility />
                            </div>
                        </motion.div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
    );
}
