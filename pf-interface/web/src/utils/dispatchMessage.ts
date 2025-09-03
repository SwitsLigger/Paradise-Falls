type DispatchMessage<T = unknown> = {
    action: string;
    data: T;
}

/**
 * Emulates dispatching an event using SendNuiMessage in the lua scripts.
 * This is used when developing in browser
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 */
export const dispatchMessage = <P>(eventName: string, data?: P): void => {
    window.dispatchEvent(
        new MessageEvent("message", {
            data: {
                action: eventName,
                data: data,
            },
        }),
    );
};