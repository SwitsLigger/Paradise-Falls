import BasicHud from './Basic/BasicHud';
import HexagonHud from './Hexagon/HexagonHud';
import ModernHud from './Modern/ModernHud';
import DiamondHud from './Diamond/DiamondHud';
import SkewHud from './Skew/SkewHud';
import CircleHud from './Circle/CircleHud';
import IconPercentHud from './IconPercent/IconPercentHud';
import type { BaseHudProps } from './types';
import type { HudSettings } from '@/utils/types';

interface HudFactoryProps extends BaseHudProps {
    hudType: HudSettings['type'];
    alignment?: 'row' | 'column';
}

export default function HudFactory({
    hudType,
    type,
    value,
    className,
    style,
    size,
    infiniteAnimate,
    alignment = 'row'
}: HudFactoryProps) {
    const commonProps = {
        type,
        value,
        className,
        style,
        size,
        infiniteAnimate,
        alignment
    };

    switch (hudType) {
        case 'basic':
            return <BasicHud {...commonProps} />;
        case 'hexagon':
            return <HexagonHud {...commonProps} />;
        case 'modern':
            return <ModernHud {...commonProps} />;
        case 'diamond':
            return <DiamondHud {...commonProps} />;
        case 'skew':
            return <SkewHud {...commonProps} />;
        case 'circle':
            return <CircleHud {...commonProps} />;
        case 'icon-percent':
            return <IconPercentHud {...commonProps} />;
        default:
            return <HexagonHud {...commonProps} />;
    }
};
