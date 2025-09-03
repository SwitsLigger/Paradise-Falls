type InfoProps = {
    title: string;
    value: string;
    size: 'md' | 'xl';
}

export default function Info({ title, value, size = 'md' }: InfoProps) {
    const textBoxTextSizeClasses = {
        md: 'text-[0.65vw]',
        xl: 'text-[1.3vw]'
    };

    const mapTextSizeClasses = {
        md: '!text-[0.55vw] w-[2vw]',
        xl: '!text-[1.1vw] w-[4vw]'
    };

    return (
        <div className="flex gap-[0.2vw] flex-col items-end">
            <div className={`h-full flex ${textBoxTextSizeClasses[size]} justify-end p-0 title uppercase items-center rounded-[0.1vw] font-semibold text-right`}>
                {title}
            </div>
            <div className={`h-full rounded-[0.1vw] ${mapTextSizeClasses[size]} m-auto-0 flex justify-end items-center white-subtitle text-right text-shadow-[0px_0px_7px_rgb(255_255_255_/_47%)] text-white`}>
                {value}
            </div>
        </div>
    )
}
