import { useAtom } from 'jotai';
import { Select, SelectItem } from '@heroui/react';
import { hudSettingsAtom } from '@/stores/editor';
import HudFactory from '@/components/Hud/HudFactory';
import Header from './Header';
import Container from './Container';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useTranslation } from 'react-i18next';
import { HudSettings } from '@/utils/types';

export default function InterfacePage() {
    const [hudTypeSettings, setHudTypeSettings] = useAtom(hudSettingsAtom);
    const { t } = useTranslation();

    const hudTypes = [
        { key: 'basic', label: t('hud.types.basic'), description: t('hud.types.basic_description') },
        { key: 'hexagon', label: t('hud.types.hexagon'), description: t('hud.types.hexagon_description') },
        { key: 'modern', label: t('hud.types.modern'), description: t('hud.types.modern_description') },
        { key: 'diamond', label: t('hud.types.diamond'), description: t('hud.types.diamond_description') },
        { key: 'skew', label: t('hud.types.skew'), description: t('hud.types.skew_description') },
        { key: 'circle', label: t('hud.types.circle'), description: t('hud.types.circle_description') },
        { key: 'icon-percent', label: t('hud.types.icon_percent'), description: t('hud.types.icon_percent_description') },
    ];

    const updateHudType = (settings: HudSettings) => {
        setHudTypeSettings(settings);
    };

    return (
        <Container>
            <Header title={t('welcome.interface.title')} description={t('welcome.interface.description')} />
            <motion.div className="grid grid-cols-2 gap-96 mt-24"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Select
                            label={t('welcome.interface.hud_type')}
                            defaultSelectedKeys={[hudTypeSettings.type]}
                            placeholder={t('welcome.interface.hud_type')}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as any;
                                updateHudType({ type: selectedKey, alignment: hudTypeSettings.alignment, scale: hudTypeSettings.scale });
                            }}
                            renderValue={(items) => items.map((item) => item.key)}
                            size="lg"
                            className='min-w-[16vw] w-full'
                            classNames={{
                                base: 'min-w-[100%] w-full',
                                mainWrapper: 'min-w-[100%] w-full'
                            }}
                            isRequired
                        >
                            {hudTypes.map((hudType) => (
                                <SelectItem key={hudType.key}>
                                    <div className="flex flex-col">
                                        <span className="!text-small subtitle font-medium">{hudType.label}</span>
                                        <span className="text-tiny">{hudType.description}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <AnimatedSection key={hudTypeSettings.type}>
                    <div style={{ transform: `scale(${hudTypeSettings.scale})` }}>
                        <HudFactory
                            hudType={hudTypeSettings.type}
                            type="health"
                            value={100}
                            maxValue={100}
                            className="flex flex-col gap-4"
                            size="xl"
                            infiniteAnimate={true}
                        />
                    </div>
                </AnimatedSection>
            </motion.div >
        </Container >
    );
};
