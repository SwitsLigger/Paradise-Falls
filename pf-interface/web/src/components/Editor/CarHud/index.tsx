import { Select, SelectItem } from '@heroui/react';
import RangeInput from '../Components/RangeInput';
import EditorButton from '../Components/EditorButton';
import { Position } from '@/utils/types';
import { DEFAULT_POSITIONS } from '@/utils/localStorage';
import { CarHudSettings } from '@/stores/editor';
import { fetchNui } from '@/utils/fetchNui';
import { useTranslation } from 'react-i18next';

interface CarHudProps {
    carHudScale: number;
    setCarHudScale: (scale: number) => void;
    carHudType: string;
    setCarHudType: (type: CarHudSettings['style']) => void;
    carHudMinimap: CarHudSettings['minimap'];
    setCarHudMinimap: (minimap: CarHudSettings['minimap']) => void;
    setCarHudPosition: (position: Position) => void;
}

export default function CarHud({ carHudScale, setCarHudScale, carHudType, setCarHudType, setCarHudPosition, carHudMinimap, setCarHudMinimap }: CarHudProps) {
    const { t } = useTranslation();
    const carHudTypes = [
        { key: 'basic', label: t('carhud.types.basic') },
        { key: 'advanced', label: t('carhud.types.advanced') },
        { key: 'modern', label: t('carhud.types.modern') },
    ] as { key: CarHudSettings['style'], label: string }[];

    const minimapTypes = [
        { key: 'circle', label: t('editor.carhud.minimap.circle') },
        { key: 'square', label: t('editor.carhud.minimap.square') },
    ] as { key: CarHudSettings['minimap'], label: string }[];

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <RangeInput
                value={carHudScale}
                onChange={setCarHudScale}
                min={0.5}
                max={2}
            />
            <div className="flex items-center gap-1 text-[0.65vw] flex-col-reverse">
                <Select
                    label={t('editor.carhud.select_type')}
                    defaultSelectedKeys={[carHudType]}
                    placeholder={t('editor.carhud.select_type')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setCarHudType(selectedKey as CarHudSettings['style']);
                    }}
                    renderValue={(items) => items.map((item) => item.key)}
                    size="sm"
                    className='min-w-[16vw] w-full'
                >
                    {carHudTypes.map((type) => (
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
                    label={t('editor.carhud.select_minimap')}
                    defaultSelectedKeys={[carHudMinimap]}
                    placeholder={t('editor.carhud.select_minimap')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setCarHudMinimap(selectedKey as CarHudSettings['minimap']);
                        fetchNui('update_minimap', selectedKey);
                    }}
                    renderValue={(items) => items.map((item) => item.key)}
                    size="sm"
                    className='min-w-[16vw] w-full'
                    classNames={{
                        base: 'min-w-[100%] w-full',
                        mainWrapper: 'min-w-[100%] w-full'
                    }}
                >
                    {minimapTypes.map((type) => (
                        <SelectItem key={type.key}>
                            <div className="flex flex-col">
                                <span className="!text-small subtitle font-medium">{type.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="w-full flex flex-col gap-1 mt-auto">
                <EditorButton onClick={() => setCarHudScale(1)}>{t('editor.reset_scale')}</EditorButton>
                <EditorButton onClick={() => setCarHudPosition(DEFAULT_POSITIONS.carHud)}>{t('editor.reset_position')}</EditorButton>
            </div>
        </div>
    );
}
