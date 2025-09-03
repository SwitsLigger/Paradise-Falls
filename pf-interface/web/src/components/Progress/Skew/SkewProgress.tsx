import { ProgressProps } from '../types';
import BasicProgress from '../Basic/BasicProgress';

export default function SkewProgress(props: ProgressProps) {
    return (
        <div className='-skew-x-[10deg]'>
            <BasicProgress {...props} />
        </div>
    );
};
