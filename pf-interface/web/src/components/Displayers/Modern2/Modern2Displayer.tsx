import classNames from 'classnames';
import type { DisplayerComponentProps } from '../types';
import Info from './Info';
import { FaIdCard, FaDollarSign, FaUser, FaPiggyBank, FaBriefcase } from 'react-icons/fa';
import { useAtomValue } from 'jotai';
import { configAtom } from '@/stores/config';

export default function Modern2Displayer({ data, size = 'md' }: DisplayerComponentProps) {
    const config = useAtomValue(configAtom);

    const sizeClasses = {
        md: 'gap-[0.5vw]',
        xl: 'gap-[1vw]'
    };

    const colGapClasses = {
        md: 'gap-[0.3vw]',
        xl: 'gap-[0.6vw]'
    };

    return (
        <div className={classNames({
            'flex justify-end flex-shrink-0': true,
            [sizeClasses[size]]: true,
        })}>
            <div className={classNames({
                'flex flex-col items-end flex-shrink-0': true,
                [colGapClasses[size]]: true,
            })}>
                <Info title='ID' value={data.identifier} size={size} icon={<FaIdCard />} />
            </div>

            <div className={classNames({
                'flex flex-col items-end flex-shrink-0': true,
                [colGapClasses[size]]: true,
            })}>
                <Info title='CASH' value={new Intl.NumberFormat(config?.intl?.locales, config?.intl?.options).format(data.cash)} size={size} icon={<FaDollarSign />} />
                <Info title='ONLINE' value={`${data.online}/${data.maxOnline}`} size={size} icon={<FaUser />} />
            </div>

            <div className={classNames({
                'flex flex-col items-end flex-shrink-0': true,
                [colGapClasses[size]]: true,
            })}>
                <Info title='BANK' value={new Intl.NumberFormat(config?.intl?.locales, config?.intl?.options).format(data.bank)} size={size} icon={<FaPiggyBank />} />
                <Info title='JOB' value={data.job} size={size} icon={<FaBriefcase />} />
            </div>
        </div>
    );
};
