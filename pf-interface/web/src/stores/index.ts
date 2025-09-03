import { CarHudData, HudData, HudDisplayerData } from "@/utils/types";
import { atom } from "jotai";

export const hudDataAtom = atom<HudData>({
    health: 50,
    armour: 0,
    hunger: 0,
    thirst: 0,
    stress: 0,
    oxygen: 0,
    stamina: 0,
    isTalking: false,
    voice: 0
})

export const updateHudDataAtom = atom(null, (get, set, data: Partial<HudData>) => {
    set(hudDataAtom, { ...get(hudDataAtom), ...data });
})

export const DEFAULT_DISPLAYER_DATA: HudDisplayerData = {
    cash: 1250,
    bank: 1250,
    identifier: '1',
    job: 'Unemployed',
    maxOnline: 32,
    online: 22,
}

export const hudDisplayerDataAtom = atom<HudDisplayerData>(DEFAULT_DISPLAYER_DATA)

export const updateHudDisplayerDataAtom = atom(null, (get, set, data: Partial<HudDisplayerData>) => {
    set(hudDisplayerDataAtom, { ...get(hudDisplayerDataAtom), ...data });
})

export const carHudDataAtom = atom<CarHudData>({
    speed: 8,
    fuel: 0,
    rpm: 0,
    gear: 0,
    topSpeed: 0
})