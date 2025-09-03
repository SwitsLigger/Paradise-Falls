import type { BaseHudProps } from '../types';
import BasicHud from '../Basic/BasicHud';

export default function SkewHud(props: BaseHudProps) {
    return (
        <div className='-skew-x-[10deg]'>
            <BasicHud {...props} />
        </div>
    );
};
