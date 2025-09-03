import { useAtom, useAtomValue } from 'jotai';
import { Select, SelectItem } from '@heroui/react';
import { displayerSettingsAtom } from '@/stores/editor';
import type { DisplayerType } from '@/components/Displayers/types';
import Header from './Header';
import Container from './Container';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import DisplayerFactory from '@/components/Displayers/DisplayerFactory';
import { hudDisplayerDataAtom } from '@/stores';
import { useTranslation } from 'react-i18next';

export default function DisplayPage() {
    const [informationSettings, setInformationSettings] = useAtom(displayerSettingsAtom);
    const displayerData = useAtomValue(hudDisplayerDataAtom);
    const { t } = useTranslation();

    const displayerTypes = [
        { key: 'basic', label: t('display.types.basic'), description: t('display.types.basic_description') },
        { key: 'modern', label: t('display.types.modern'), description: t('display.types.modern_description') },
        { key: 'skew', label: t('display.types.skew'), description: t('display.types.skew_description') },
        { key: 'modern2', label: t('display.types.modern2'), description: t('display.types.modern2_description') },
        { key: 'modernskew', label: t('display.types.modernskew'), description: t('display.types.modernskew_description') },
    ];

    const updateDisplayerType = (type: DisplayerType) => {
        setInformationSettings({ ...informationSettings, displayerType: type });
    };

    return (
        <Container>
            <Header title={t('welcome.display.title')} description={t('welcome.display.description')} />
            <motion.div className="grid grid-cols-2 gap-96 mt-24"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Select
                            label={t('welcome.display.select_displayer_type')}
                            defaultSelectedKeys={[informationSettings.displayerType || 'basic']}
                            placeholder={t('welcome.display.select_displayer_type')}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as DisplayerType;
                                updateDisplayerType(selectedKey);
                            }}
                            renderValue={(items) => items.map((item) => item.key)}
                            size="lg"
                            className='w-[16vw]'
                            isRequired
                        >
                            {displayerTypes.map((displayerType) => (
                                <SelectItem key={displayerType.key}>
                                    <div className="flex flex-col">
                                        <span className="!text-small subtitle font-medium">{displayerType.label}</span>
                                        <span className="text-tiny">{displayerType.description}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <AnimatedSection key={informationSettings.displayerType}>
                    <div style={{ transform: `scale(${informationSettings.scale})` }}>
                        <DisplayerFactory
                            data={displayerData}
                            size="xl"
                            positionSet={false}
                        />
                    </div>
                </AnimatedSection>
            </motion.div>
        </Container>
    );
};


