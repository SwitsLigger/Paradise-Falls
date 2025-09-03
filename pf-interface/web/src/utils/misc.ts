import { ToastProps } from "@heroui/react";
import { useEffect, useState } from "react";

export const isEnvBrowser = (): boolean => !(window as any).invokeNative;
export const noop = () => { }
export const formatNumber = (amount: string | number) => new Intl.NumberFormat().format(+amount);
export const defaultNumber = (value: string | number) => String(value).split(",").join("");
export const isEmpty = (value: any) => {
    if (value === undefined || value === null) return true;
    if (value == '') return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
}

export const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    const formattedSecond = secondLeft < 10 ? `0${secondLeft}` : secondLeft;
    return `${minute}:${formattedSecond}`;
}

// https://usehooks-ts.com/react-hook/use-debounce
export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export const DEFAULT_TOAST_PROPS = {
    timeout: 3000,
    shadow: 'lg',
    shouldShowTimeoutProgress: true,
    variant: 'flat',
    radius: 'sm',
} as ToastProps

export let imagepath = 'images/'

export function getImageUrl(image: string): string {
    return imagepath + image
}

export function setImagePath(path: string) {
    imagepath = path
}

const Wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))