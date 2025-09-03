import { useDraggable } from '@dnd-kit/core';
import type { Position } from '@/utils/types';

type DraggableWrapperProps = {
    children: React.ReactNode;
    draggable?: boolean;
    defaultPosition?: Position;
    className?: string;
    style?: React.CSSProperties;
    onPositionChange?: (position: Position) => void;
    id?: string;
}

export default function DraggableWrapper({
    children,
    draggable = false,
    defaultPosition = { x: 0, y: 0 },
    className = '',
    style = {},
    id = 'draggable-wrapper',
}: DraggableWrapperProps) {

    let position = defaultPosition;

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    });

    if (isDragging) {
        position = {
            x: typeof defaultPosition.x === 'string' ? 0 : defaultPosition.x + (transform?.x ?? 0),
            y: typeof defaultPosition.y === 'string' ? 0 : defaultPosition.y + (transform?.y ?? 0)
        };
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };


    const styleWithTransform = {
        position: 'absolute' as const,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 20,
        userSelect: 'none' as const,
        ...style
    };

    if (!draggable) {
        return (
            <div
                style={{
                    position: 'absolute',
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    transition: 'transform 0.3s ease-out',
                    ...style
                }}
                className={className}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={styleWithTransform}
            className={className}
            {...listeners}
            {...attributes}
            tabIndex={-1} // Prevent focus
            onKeyDown={handleKeyDown}
            onFocus={(e) => e.target.blur()} // Prevent focus
            data-draggable="true"
        >
            {children}
        </div>
    );
}
