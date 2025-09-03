import { Button } from "@heroui/react";

export default function EditorButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return (
        <Button
            onPress={onClick}
            className="w-full p-2 transition-all duration-[425ms] bg-gradient-radial from-[#2a2a2a] to-[#181818] border-2 border-[rgba(87,87,87,0.75)] rounded-lg text-sm font-semibold text-center text-white hover:text-main-color focus:outline-none focus:ring-0"
        >
            {children}
        </Button>
    )
}
