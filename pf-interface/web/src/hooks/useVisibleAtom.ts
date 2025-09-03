// Purpose: This hook is used to manage visible state with atoms
// This hook should be called only once in the app to avoid multiple event listeners

import { useSetAtom } from "jotai"
import { WritableAtom } from "jotai"
import useNuiEvent from "./useNuiEvent"
import { fetchNui } from "@/utils/fetchNui"

type VisibleData = {
    visible: boolean;
}

export default function useVisibleAtom<T extends VisibleData>(
    eventName: string,
    atom: WritableAtom<any, [any], void>,
    handler?: (data: T) => void
) {
    const setAtom = useSetAtom(atom)

    useNuiEvent(eventName, (data: T) => {
        setAtom(data)

        handler?.(data)

        fetchNui('play_sound', data.visible ? 'item_down' : 'hover_up')
    })
}
