import { useState } from 'react';
import { DragEndEvent, DragMoveEvent, DragStartEvent } from '@dnd-kit/core';
import { ComponentPositions } from '@/utils/localStorage';
import type { Position } from '@/utils/types';

export function useGameDrag(
    componentPositions: ComponentPositions,
    handlePositionChange: (component: keyof ComponentPositions, position: Position) => void
) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (event: DragStartEvent) => {
        setIsDragging(true);
    };

    const handleDragMove = (event: DragMoveEvent) => { };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;
        const componentId = active.id as keyof ComponentPositions;

        if (componentPositions[componentId]) {
            const currentPosition = componentPositions[componentId];
            const currentX = typeof currentPosition.x === 'string' ? 0 : currentPosition.x;
            const currentY = typeof currentPosition.y === 'string' ? 0 : currentPosition.y;

            const newPosition = {
                x: currentX + delta.x,
                y: currentY + delta.y
            };

            handlePositionChange(componentId, newPosition);
        } else {
            console.log('componentId not found', componentId);
        }

        setIsDragging(false);
    };

    return {
        isDragging,
        handleDragStart,
        handleDragMove,
        handleDragEnd
    };
}
