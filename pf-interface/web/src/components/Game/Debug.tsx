import { Button } from '@heroui/react';
import { clearAllData, DEFAULT_POSITIONS, type ComponentPositions } from '@/utils/localStorage';
import { pushNotification, toggleVehicle } from '@/mocks/debug';

interface DebugProps {
    componentPositions: ComponentPositions;
    setComponentPositions: (positions: ComponentPositions) => void;
}

export default function Debug({ componentPositions, setComponentPositions }: DebugProps) {
    const resetPositions = () => {
        setComponentPositions(DEFAULT_POSITIONS);
    };

    return (
        <div className="fixed top-4 left-4 z-50 bg-black/80 text-white p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Debug Panel</h3>
            <div className="grid grid-cols-2 gap-2 items-center">
                <Button color="primary" onPress={resetPositions}>
                    Reset Positions
                </Button>
                <Button color="primary" onPress={clearAllData}>
                    Clear All Data
                </Button>
                <Button color="primary" onPress={toggleVehicle}>
                    Toggle Vehicle
                </Button>
                <Button color="primary" onPress={pushNotification}>
                    Push Notification
                </Button>
            </div>
            <div className="mt-4 text-xs">
                <div>HUD: {JSON.stringify(componentPositions.hud)}</div>
                <div>Progress: {JSON.stringify(componentPositions.progress)}</div>
                <div>CarHUD: {JSON.stringify(componentPositions.carHud)}</div>
                <div>Displayer: {JSON.stringify(componentPositions.displayer)}</div>
                <div>Notification: {JSON.stringify(componentPositions.notification)}</div>
            </div>
        </div>
    );
}
