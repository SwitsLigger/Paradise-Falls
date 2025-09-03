import { Select, SelectItem } from '@heroui/react';
import RangeInput from '../Components/RangeInput';
import EditorButton from '../Components/EditorButton';
import { Position } from '@/utils/types';
import { DEFAULT_POSITIONS } from '@/utils/localStorage';
import { NotificationSettings } from '@/stores/editor';
import { useTranslation } from 'react-i18next';

interface NotifyProps {
    notifyScale: number;
    setNotifyScale: (scale: number) => void;
    notifyType: string;
    setNotifyType: (type: string) => void;
    notifyAlign: string;
    setNotifyAlign: (align: string) => void;
    setNotifyPosition: (position: Position) => void;
}

export default function Notify({ notifyScale, setNotifyScale, notifyType, setNotifyType, notifyAlign, setNotifyAlign, setNotifyPosition }: NotifyProps) {
    const { t } = useTranslation();
    const notifyTypes = [
        { key: 'basic', label: t('notify.types.basic') },
        { key: 'modern', label: t('notify.types.modern') },
        { key: 'classic', label: t('notify.types.classic') },
    ];

    const alignTypes: Array<{ key: NotificationSettings['textAlign']; label: string }> = [
        { key: 'left', label: t('notify.text_alignment.left') },
        { key: 'center', label: t('notify.text_alignment.center') },
        { key: 'right', label: t('notify.text_alignment.right') },
    ];

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <RangeInput
                value={notifyScale}
                onChange={setNotifyScale}
                min={0.5}
                max={2}
            />
            <div className="flex items-center gap-1 text-[0.65vw] flex-col-reverse">
                <Select
                    label={t('editor.notify.type')}
                    defaultSelectedKeys={[notifyType]}
                    placeholder={t('editor.notify.select_type')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setNotifyType(selectedKey);
                    }}
                    renderValue={(items) => items.map((item) => item.key)}
                    size="sm"
                    className='min-w-[16vw] w-full'
                    classNames={{
                        base: 'min-w-[100%] w-full',
                        mainWrapper: 'min-w-[100%] w-full'
                    }}
                >
                    {notifyTypes.map((type) => (
                        <SelectItem key={type.key}>
                            <div className="flex flex-col">
                                <span className="!text-small subtitle font-medium">{type.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex items-center gap-1 text-[0.65vw] flex-col-reverse">
                <Select
                    label={t('editor.notify.text_alignment')}
                    defaultSelectedKeys={[notifyAlign]}
                    placeholder={t('editor.notify.select_text_alignment')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as NotificationSettings['textAlign'];
                        setNotifyAlign(selectedKey);
                    }}
                    renderValue={(items) => items.map((item) => item.key)}
                    size="sm"
                    className='min-w-[16vw] w-full'
                    classNames={{
                        base: 'min-w-[100%] w-full',
                        mainWrapper: 'min-w-[100%] w-full'
                    }}
                >
                    {alignTypes.map((type) => (
                        <SelectItem key={type.key}>
                            <div className="flex flex-col">
                                <span className="!text-small subtitle font-medium">{type.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="w-full flex flex-col gap-1 mt-auto">
                <EditorButton onClick={() => setNotifyScale(1)}>{t('editor.reset_scale')}</EditorButton>
                <EditorButton onClick={() => setNotifyPosition(DEFAULT_POSITIONS.notification)}>{t('editor.reset_position')}</EditorButton>
            </div>
        </div>
    );
}
