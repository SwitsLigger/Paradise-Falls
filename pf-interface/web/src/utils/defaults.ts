import { SlotsToClasses } from "@heroui/react";

export const SELECT_CLASS_NAMES = {
    popoverContent: 'bg-slate-800/90 backdrop-blur-sm border border-slate-700',
} as SlotsToClasses<"popoverContent" | "base" | "label" | "value" | "description" | "errorMessage" | "listbox" | "spinner" | "trigger" | "selectorIcon" | "mainWrapper" | "innerWrapper" | "listboxWrapper" | "helperWrapper"> | undefined

export const AUTO_COMPLETE_CLASS_NAMES = {
    popoverContent: 'bg-slate-800/90 backdrop-blur-sm border border-slate-700 scrollbar-show',
} as SlotsToClasses<"base" | "listbox" | "popoverContent" | "listboxWrapper" | "endContentWrapper" | "clearButton" | "selectorButton"> | undefined

export const CHIP_CLASS_NAMES = {
    base: 'bg-slate-600/40 text-white hover:bg-slate-600 focus:bg-slate-600, rounded-md'
} as SlotsToClasses<"base" | "closeButton" | "content" | "avatar" | "dot"> | undefined

export const DEFAULT_MIN_DISTANCE = 5