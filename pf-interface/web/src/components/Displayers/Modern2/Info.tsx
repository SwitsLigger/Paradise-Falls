import classNames from "classnames";

type InfoProps = {
    title: string;
    value: string | number;
    size?: 'md' | 'xl';
    icon?: React.ReactNode;
}

export default function Info({ title, value, size = 'md', icon }: InfoProps) {
    const displayerWidthClasses = {
        md: 'w-[8vw]',
        xl: 'w-[10vw]'
    };
    const iconTextSizeClasses = {
        md: 'text-[1vw]',
        xl: 'text-[1.3vw]'
    };

    const textSizeClasses = {
        md: 'text-[1.15vw]',
        xl: 'text-[1.5vw]'
    };

    return (
        <div className={classNames({
            'overflow-hidden relative flex flex-col items-end text-white': true,
            [displayerWidthClasses[size]]: true,
        })}>
            <div className={classNames({
                'rounded-[10px] opacity-100 h-full flex uppercase items-center text-[var(--main-color)] font-semibold gap-1': true,
                [iconTextSizeClasses[size]]: true,
            })}>
                {title}
                {icon}
            </div>
            <div className={classNames({
                'flex justify-end items-center white-subtitle': true,
                [textSizeClasses[size]]: true,
            })}>
                {value}
            </div>
        </div>
    )
}
