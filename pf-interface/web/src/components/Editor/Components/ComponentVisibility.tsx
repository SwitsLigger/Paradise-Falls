import { Button, Switch } from '@heroui/react';
import { useAtom } from 'jotai';
import { hudSettingsAtom } from '@/stores/editor';
import { HUD_COMPONENTS, type HudComponentType } from '@/utils/types';
import { FaHeart, FaShieldAlt, FaUtensils, FaTint, FaBrain, FaMicrophone, FaLungs, FaRunning } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const componentIcons = {
    health: FaHeart,
    armour: FaShieldAlt,
    hunger: FaUtensils,
    thirst: FaTint,
    stress: FaBrain,
    voice: FaMicrophone,
    oxygen: FaLungs,
    stamina: FaRunning
};

export default function ComponentVisibility() {
    const [hudSettings, setHudSettings] = useAtom(hudSettingsAtom);
    const { t } = useTranslation();
    const toggleComponent = (component: HudComponentType) => {
        const isDisabled = hudSettings?.disabledComponents?.includes?.(component);
        if (isDisabled) {
            setHudSettings(prev => ({
                ...prev,
                disabledComponents: prev.disabledComponents?.filter(c => c !== component)
            }));
        } else {
            setHudSettings(prev => ({
                ...prev,
                disabledComponents: [...(prev.disabledComponents || []), component]
            }));
        }
    };

    const isComponentVisible = (component: HudComponentType) => {
        return !hudSettings?.disabledComponents?.includes?.(component);
    };

    const componentLabels = {
        health: t('editor.health'),
        armour: t('editor.armour'),
        hunger: t('editor.hunger'),
        thirst: t('editor.thirst'),
        stress: t('editor.stress'),
        voice: t('editor.voice'),
        oxygen: t('editor.oxygen'),
        stamina: t('editor.stamina')
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="grid grid-cols-2 gap-2">
                {HUD_COMPONENTS.map((component) => {
                    const Icon = componentIcons[component];
                    const label = componentLabels[component];
                    const isVisible = isComponentVisible(component);

                    return (
                        <div
                            key={component}
                            className="flex items-center justify-between p-2 bg-[rgba(13,13,13,0.8)] rounded-lg border border-[rgba(70,70,70,0.29)]"
                        >
                            <div className="flex items-center gap-2">
                                <div className={`p-1 rounded ${isVisible ? 'bg-main-color' : 'bg-gray-600'}`}>
                                    <Icon className="text-white text-sm" />
                                </div>
                                <span className="text-white font-medium text-xs">{label}</span>
                            </div>

                            <Switch
                                isSelected={isVisible}
                                onValueChange={() => toggleComponent(component)}
                                size="sm"
                                color="primary"
                                classNames={{
                                    wrapper: "group-data-[selected=true]:bg-main-color"
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(70,70,70,0.29)]">
                <Button
                    onPress={() => setHudSettings(prev => ({ ...prev, disabledComponents: [] }))}
                    className="px-3 py-1 bg-main-color text-white rounded text-xs font-medium hover:bg-opacity-80 transition-all"
                >
                    {t('editor.show_all')}
                </Button>
                <Button
                    onPress={() => setHudSettings(prev => ({ ...prev, disabledComponents: HUD_COMPONENTS }))}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-xs font-medium hover:bg-gray-500 transition-all"
                >
                    {t('editor.hide_all')}
                </Button>
            </div>
        </div>
    );
}
