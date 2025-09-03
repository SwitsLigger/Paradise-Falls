// Purpose: This hook is used to check if the user is visible in the game generally

import { useState } from "react"
import useNuiEvent from "./useNuiEvent"

type VisibleData = {
    visible: boolean;
}

export default function useVisible<T extends VisibleData>(
    eventName: string,
    handler?: (data: T) => void
) {
    const [data, setData] = useState<T | null>(null)

    useNuiEvent(eventName, (data: T) => {
        setData(data)
        handler?.(data)
    })

    return [data?.visible, data, setData] as const
}
