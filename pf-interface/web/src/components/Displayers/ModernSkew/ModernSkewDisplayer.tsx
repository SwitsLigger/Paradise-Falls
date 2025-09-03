import Modern2Displayer from '../Modern2/Modern2Displayer';
import type { DisplayerComponentProps } from '../types';

export default function ModernSkewDisplayer(props: DisplayerComponentProps) {
    return (
        <div className='-skew-x-[10deg]'>
            <Modern2Displayer {...props} />
        </div>
    );
}
