type RangeInputProps = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
}

export default function RangeInput({ value, onChange, min, max, step }: RangeInputProps) {
    return (
        <div className="flex flex-col items-start gap-1 mb-4">
            <div className="p-1 rounded text-white text-sm leading-6">Scale</div>
            <input
                type="range"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                min={min}
                max={max}
                step={step || 'any'}
                className="h-3 appearance-none w-full bg-black/80 rounded-lg border-2 border-[rgba(70,70,70,0.29)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[1vw] [&::-webkit-slider-thumb]:h-[1vw] [&::-webkit-slider-thumb]:rounded-[0.1vw] [&::-webkit-slider-thumb]:bg-main-color [&:focus]:outline-none"
            />
        </div>
    )
}
