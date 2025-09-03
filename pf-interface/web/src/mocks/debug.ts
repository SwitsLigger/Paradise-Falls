import { debugData } from "@/utils/debugData"

let inVehicle = false;
export const toggleVehicle = () => {
    inVehicle = !inVehicle;
    debugData([
        {
            action: 'toggle_vehicle',
            data: {
                visible: inVehicle,
            }
        }
    ], 100)
}

export const pushNotification = () => {
    debugData([
        {
            action: 'add_notification',
            data: {
                icon: 'fas fa-inbox',
                header: 'This is a test notification',
                text: 'This is a test notification',
                time: 5000
            }
        }
    ], 100)
}