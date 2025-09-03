import type { BaseHudProps } from '../types';
import classNames from 'classnames';
import { ICON_MAP } from '../data';

export default function IconPercentHud({
    type,
    value = 100,
    maxValue = 100,
    className = '',
    style = {},
    size = 'md',
}: BaseHudProps) {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const IconComponent = ICON_MAP[type];

    const sizeValue = size === 'xl' ? 8 : 2.3;

    return (
        <div
            className={classNames({
                'flex flex-col justify-center items-center': true,
                [className]: true
            })}
            style={{
                width: `${sizeValue}vw`,
                height: `${sizeValue}vw`,
                ...style
            }}
        >
            <div className={classNames({
                'text-white w-full h-full rounded-full bg-main-color flex justify-center items-center border-3 border-[var(--theme-bg)] shadow-[0px_0px_16.01px_0px_var(--main-color)]': true,
                'p-12': size === 'xl',
                'p-3': size === 'md',
            })}>
                <IconComponent className='w-full h-full' />
            </div>
            <div className="text-sm font-semibold w-full text-center text-white">
                {Math.round(percentage)}%
            </div>
        </div>
    );
};
