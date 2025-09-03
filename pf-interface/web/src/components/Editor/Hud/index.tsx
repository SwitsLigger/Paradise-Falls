import { Select, SelectItem } from '@heroui/react';
import EditorButton from '../Components/EditorButton';
import type { HudSettings, Position } from '@/utils/types';
import { DEFAULT_POSITIONS } from '@/utils/localStorage';
import { useTranslation } from 'react-i18next';

type HudProps = {
    hudScale: number;
    setHudScale: (scale: number) => void;
    hudType: string;
    setHudType: (type: HudSettings['type']) => void;
    hudAlign: string;
    setHudAlign: (align: HudSettings['alignment']) => void;
    setHudPosition: (position: Position) => void;
}

export default function Hud({ hudScale, setHudScale, hudType, setHudType, hudAlign, setHudAlign, setHudPosition }: HudProps) {
    const { t } = useTranslation();
    const hudTypes = [
        { key: 'basic', label: t('hud.types.basic') },
        { key: 'hexagon', label: t('hud.types.hexagon') },
        { key: 'diamond', label: t('hud.types.diamond') },
        { key: 'skew', label: t('hud.types.skew') },
        { key: 'circle', label: t('hud.types.circle') },
        { key: 'icon-percent', label: t('hud.types.icon_percent') },
    ] as { key: HudSettings['type'], label: string }[];

    const alignTypes = [
        { key: 'row', label: t('hud.alignments.row') },
        { key: 'column', label: t('hud.alignments.column') },
    ];

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex flex-col items-start gap-1 mb-4">
                <div className="p-1 rounded text-white text-sm leading-6 text-left">{t('editor.scale')}</div>
                <input
                    type="range"
                    value={hudScale}
                    onChange={(e) => setHudScale(parseFloat(e.target.value))}
                    min="0.5"
                    max="2"
                    step="any"
                    className="h-3 appearance-none w-full bg-[rgba(13,13,13,1)] rounded-lg border-2 border-[rgba(70,70,70,0.29)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[1vw] [&::-webkit-slider-thumb]:h-[1vw] [&::-webkit-slider-thumb]:rounded-[0.1vw] [&::-webkit-slider-thumb]:bg-main-color [&:focus]:outline-none"
                />
            </div>
            <div className="flex items-center gap-1 text-[0.65vw] flex-col-reverse">
                <Select
                    label={t('editor.hud.type')}
                    defaultSelectedKeys={[hudType]}
                    placeholder={t('editor.hud.select_type')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setHudType(selectedKey as HudSettings['type']);
                    }}
                    renderValue={(items) => items.map((item) => item.key)}
                    size="sm"
                    className='min-w-[16vw] w-full'
                    classNames={{
                        base: 'min-w-[100%] w-full',
                        mainWrapper: 'min-w-[100%] w-full'
                    }}
                >
                    {hudTypes.map((type) => (
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
                    label={t('editor.hud.alignment')}
                    defaultSelectedKeys={[hudAlign]}
                    placeholder={t('editor.hud.select_alignment')}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setHudAlign(selectedKey as HudSettings['alignment']);
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
                <EditorButton onClick={() => setHudScale(1)}>{t('editor.reset_scale')}</EditorButton>
                <EditorButton onClick={() => setHudPosition(DEFAULT_POSITIONS.hud)}>{t('editor.reset_position')}</EditorButton>
            </div>
        </div>
    );
}
