import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { ProgressSettings, progressSettingsAtom } from '@/stores/editor';
import Container from './Container';
import Header from './Header';
import { Select, SelectItem } from '@heroui/react';
import ProgressContainer from '@/components/Progress/ProgressContainer';
import AnimatedSection from './AnimatedSection';
import { useTranslation } from 'react-i18next';

export default function ProgressPage() {
    const [progressSettings, setProgressSettings] = useAtom(progressSettingsAtom);
    const { t } = useTranslation();

    const progressStyles = [
        { key: 'basic', label: t('progress.types.basic'), description: t('progress.types.basic_description') },
        { key: 'classic', label: t('progress.types.classic'), description: t('progress.types.classic_description') },
        { key: 'skew', label: t('progress.types.skew'), description: t('progress.types.skew_description') },
    ];

    const updateSetting = (settings: Partial<ProgressSettings>) => {
        setProgressSettings(prev => ({ ...prev, ...settings }));
    };

    return (
        <Container>
            <Header
                title={t('welcome.progress.title')}
                description={t('welcome.progress.description')}
            />
            <motion.div
                className="grid grid-cols-2 gap-96 mt-24"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Select
                            label={t('welcome.progress.progress_style')}
                            defaultSelectedKeys={[progressSettings.style]}
                            placeholder={t('welcome.progress.progress_style')}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as ProgressSettings['style'];
                                updateSetting({ style: selectedKey });
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
                            {progressStyles.map((style) => (
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

                <AnimatedSection key={progressSettings.style}>
                    <div style={{ transform: `scale(${progressSettings.scale})` }}>
                        <ProgressContainer
                            className="flex flex-col gap-4"
                            showMultiple={true}
                            infiniteAnimate={true}
                            positionSet={false}
                        />
                    </div>
                </AnimatedSection>
            </motion.div>
        </Container>
    );
};
