import { Chrome, hexToHsva, hsvaToRgbaString, rgbaStringToHsva } from "@uiw/react-color";
import { useAtom } from "jotai";
import { themeAtom } from "@/stores/editor";

export default function Theme() {
    const [theme, setTheme] = useAtom(themeAtom);

    const color = theme.includes('rgba') ? rgbaStringToHsva(theme) : hexToHsva(theme);
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Chrome
                color={color}
                onChange={(color) => {
                    const colorValue = hsvaToRgbaString(color.hsva);
                    setTheme(colorValue);
                    document.body.style.setProperty('--main-color', colorValue);
                }}
            />
        </div>
    );
}
