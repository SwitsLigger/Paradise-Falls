import classNames from 'classnames'

type InfoProps = {
    title: string;
    value: string;
    size: 'md' | 'xl';
}

export default function Info({ title, value, size = 'md' }: InfoProps) {
    const displayerBSizeClasses = {
        md: 'min-w-[6vw] text-[0.55vw]',
        xl: 'min-w-[9vw] text-[0.8vw]'
    };

    return (
        <div className={classNames({
            'grid grid-cols-2 overflow-hidden bg-radial-gradient border-[1.57px] border-[rgba(52,68,82,1)] rounded-xl items-center': true,
            [displayerBSizeClasses[size]]: true
        })}>
            <div className="p-[0.1vw] uppercase bg-main-color border-[4.33px] border-[var(--main-color)] rounded-[10px] font-poppins font-bold text-center text-white">
                {title}
            </div>
            <div className="pr-4 items-center font-poppins font-medium text-end text-slate-400">
                {value}
            </div>
        </div>
    )
}
