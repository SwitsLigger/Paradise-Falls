import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Select, SelectItem } from '@heroui/react';
import { carHudSettingsAtom, CarHudSettings } from '@/stores/editor';
import Container from './Container';
import Header from './Header';
import CarHudFactory from '@/components/CarHud/CarHudFactory';
import AnimatedSection from './AnimatedSection';
import { useTranslation } from 'react-i18next';

export default function CarHudPage() {
    const [carHudSettings, setCarHudSettings] = useAtom(carHudSettingsAtom);
    const { t } = useTranslation();

    const carHudStyles = [
        { key: 'basic', label: t('carhud.types.basic'), description: t('carhud.types.basic_description') },
        { key: 'modern', label: t('carhud.types.modern'), description: t('carhud.types.modern_description') },
        { key: 'advanced', label: t('carhud.types.advanced'), description: t('carhud.types.advanced_description') },
    ];

    const updateSetting = (settings: CarHudSettings) => {
        setCarHudSettings(settings);
    };

    return (
        <Container>
            <Header
                title={t('welcome.carhud.title')}
                description={t('welcome.carhud.description')}
            />
            <motion.div className="grid grid-cols-2 gap-96 mt-24"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Select
                            label={t('welcome.carhud.speedometer_style')}
                            defaultSelectedKeys={[carHudSettings.style || 'basic']}
                            placeholder={t('welcome.carhud.speedometer_style')}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as string;
                                updateSetting({ ...carHudSettings, style: selectedKey as any });
                            }}
                            renderValue={(items) => items.map((item) => item.key)}
                            size="lg"
                            className='w-[16vw]'
                            isRequired
                        >
                            {carHudStyles.map((style) => (
                                <SelectItem key={style.key}>
                                    <div className="flex flex-col">
                                        <span className="!text-small subtitle font-medium">{style.label}</span>
                                        <span className="text-tiny">{style.description}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <AnimatedSection key={carHudSettings.style}>
                    <div style={{ transform: `scale(${carHudSettings.scale})` }}>
                        <CarHudFactory
                            speed={123}
                            fuel={75}
                            rpm={4000}
                            streetLabel="Strawberry Ave"
                            units={carHudSettings.unit}
                            seatbelt={false}
                            size="xl"
                            infiniteAnimate={true}
                            positionSet={false}
                        />
                    </div>
                </AnimatedSection>
            </motion.div>
        </Container>
    );
};
