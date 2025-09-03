import type { DisplayerComponentProps } from '../types';
import BasicDisplayer from '../Basic/BasicDisplayer';

export default function SkewDisplayer(props: DisplayerComponentProps) {
    return (
        <div className='-skew-x-[10deg]'>
            <BasicDisplayer {...props} />
        </div>
    );
};
