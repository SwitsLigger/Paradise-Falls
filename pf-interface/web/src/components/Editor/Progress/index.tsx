import { Select, SelectItem } from '@heroui/react';
import RangeInput from '../Components/RangeInput';
import EditorButton from '../Components/EditorButton';
import { Position } from '@/utils/types';
import { DEFAULT_POSITIONS } from '@/utils/localStorage';
import { useTranslation } from 'react-i18next';

interface ProgressProps {
    progressScale: number;
    setProgressScale: (scale: number) => void;
    progressType: string;
    setProgressType: (type: string) => void;
    setProgressPosition: (position: Position) => void;
}
export default function Progress({ progressScale, setProgressScale, progressType, setProgressType, setProgressPosition }: ProgressProps) {
    const { t } = useTranslation();
    const progressTypes = [
        { key: 'basic', label: t('progress.types.basic') },
        { key: 'skew', label: t('progress.types.skew') },
        { key: 'classic', label: t('progress.types.classic') },
    ];

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <RangeInput
                value={progressScale}
                onChange={setProgressScale}
                min={0.5}
                max={2}
            />
            <div className="flex items-center gap-1 text-[0.65vw] flex-col-reverse">
                <Select
                    label={t('editor.progress.type')}
                    defaultSelectedKeys={[progressType]}
                    placeholder={t('editor.progress.select_type')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setProgressType(selectedKey);
                    }}
                    renderValue={(items) => items.map((item) => item.key)}
                    size="sm"
                    className='min-w-[16vw] w-full'
                    classNames={{
                        base: 'min-w-[100%] w-full',
                        mainWrapper: 'min-w-[100%] w-full'
                    }}
                >
                    {progressTypes.map((type) => (
                        <SelectItem key={type.key}>
                            <div className="flex flex-col">
                                <span className="!text-small subtitle font-medium">{type.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="w-full flex flex-col gap-1 mt-auto">
                <EditorButton onClick={() => setProgressScale(1)}>
                    {t('editor.reset_scale')}
                </EditorButton>
                <EditorButton onClick={() => setProgressPosition(DEFAULT_POSITIONS.progress)}>
                    {t('editor.reset_position')}
                </EditorButton>
            </div>
        </div>
    );
}
