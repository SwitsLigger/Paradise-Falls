import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { NotificationSettings, notificationSettingsAtom } from '@/stores/editor';
import Container from './Container';
import Header from './Header';
import { Select, SelectItem } from '@heroui/react';
import AnimatedSection from './AnimatedSection';
import NotificationFactory from '@/components/Notification/NotificationFactory';
import { NotificationData } from '@/components/Notification/types';
import { useTranslation } from 'react-i18next';

const NotificationPage: React.FC = () => {
    const [notificationSettings, setNotificationSettings] = useAtom(notificationSettingsAtom);
    const { t } = useTranslation();

    const notificationStyles = [
        { key: 'basic', label: t('notify.types.basic'), description: t('notify.types.basic_description') },
        { key: 'classic', label: t('notify.types.classic'), description: t('notify.types.classic_description') },
        { key: 'modern', label: t('notify.types.modern'), description: t('notify.types.modern_description') },
    ];

    const textAlignments = [
        { key: 'left', label: t('notify.text_alignment.left') },
        { key: 'center', label: t('notify.text_alignment.center') },
        { key: 'right', label: t('notify.text_alignment.right') },
    ];

    const sampleNotifications: NotificationData = {
        icon: 'FaInfoCircle',
        header: t('welcome.notification.default.header'),
        text: t('welcome.notification.default.text'),
        time: 5000
    }

    const updateSetting = (settings: Partial<NotificationSettings>) => {
        setNotificationSettings(prev => ({ ...prev, ...settings }));
    };

    return (
        <Container>
            <Header
                title={t('welcome.notification.title')}
                description={t('welcome.notification.description')}
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
                            label={t('welcome.notification.notification_style')}
                            defaultSelectedKeys={[notificationSettings.type]}
                            placeholder={t('welcome.notification.notification_style')}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as NotificationSettings['type'];
                                updateSetting({ type: selectedKey });
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
                            {notificationStyles.map((style) => (
                                <SelectItem key={style.key}>
                                    <div className="flex flex-col">
                                        <span className="!text-small subtitle font-medium">{style.label}</span>
                                        <span className="text-tiny">{style.description}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Text Alignment"
                            defaultSelectedKeys={[notificationSettings.textAlign]}
                            placeholder="Select text alignment"
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] as NotificationSettings['textAlign'];
                                updateSetting({ textAlign: selectedKey });
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
                            {textAlignments.map((alignment) => (
                                <SelectItem key={alignment.key}>
                                    <div className="flex flex-col">
                                        <span className="!text-small subtitle font-medium">{alignment.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <AnimatedSection key={notificationSettings.type}>
                    <div style={{ transform: `scale(${notificationSettings.scale})` }}>
                        <NotificationFactory
                            type={notificationSettings.type}
                            data={sampleNotifications}
                            textAlign={notificationSettings.textAlign}
                            positionSet={false}
                        />
                    </div>
                </AnimatedSection>
            </motion.div>
        </Container>
    );
};

export default NotificationPage;
