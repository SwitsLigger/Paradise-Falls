import { Select, SelectItem } from '@heroui/react';
import RangeInput from '../Components/RangeInput';
import EditorButton from '../Components/EditorButton';
import { DEFAULT_POSITIONS } from '@/utils/localStorage';
import { Position } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import { DisplayerType } from '@/components/Displayers/types';

interface DisplayersProps {
    displayersScale: number;
    setDisplayersScale: (scale: number) => void;
    displayersType: string;
    setDisplayersType: (type: string) => void;
    setDisplayersPosition: (position: Position) => void;
}

export default function Displayers({ displayersScale, setDisplayersScale, displayersType, setDisplayersType, setDisplayersPosition }: DisplayersProps) {
    const { t } = useTranslation();
    const displayerTypes = [
        { key: 'basic', label: t('display.types.basic') },
        { key: 'skew', label: t('display.types.skew') },
        { key: 'modern', label: t('display.types.modern') },
        { key: 'modern2', label: t('display.types.modern2') },
        { key: 'modernskew', label: t('display.types.modernskew') },
    ] as { key: DisplayerType, label: string }[];

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <RangeInput
                value={displayersScale}
                onChange={setDisplayersScale}
                min={0.5}
                max={2}
            />
            <div className="flex items-center gap-1 text-[0.65vw] flex-col-reverse">
                <Select
                    label={t('editor.displayers.displayer_type')}
                    defaultSelectedKeys={[displayersType]}
                    placeholder={t('editor.displayers.select_displayer_type')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setDisplayersType(selectedKey);
                    }}
                    renderValue={(items) => items.map((item) => item.key)}
                    size="sm"
                    className='min-w-[16vw] w-full'
                    classNames={{
                        base: 'min-w-[100%] w-full',
                        mainWrapper: 'min-w-[100%] w-full'
                    }}
                >
                    {displayerTypes.map((type) => (
                        <SelectItem key={type.key}>
                            <div className="flex flex-col">
                                <span className="!text-small subtitle font-medium">{type.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="w-full flex flex-col gap-1 mt-auto">
                <EditorButton onClick={() => setDisplayersScale(1)}>
                    {t('editor.reset_scale')}
                </EditorButton>
                <EditorButton onClick={() => setDisplayersPosition(DEFAULT_POSITIONS.displayer)}>
                    {t('editor.reset_position')}
                </EditorButton>
            </div>
        </div>
    );
}
