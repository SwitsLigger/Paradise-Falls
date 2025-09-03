
import * as FaIcons from "react-icons/fa";

type IconPack = typeof FaIcons;

const ICON_PACKS: Record<string, IconPack> = {
  Fa: FaIcons
};

function convertIconName(icon: string): string {
  if (icon.includes(' ')) {
    const parts = icon.split(' ');
    if (parts.length >= 2) {
      const prefix = parts[0]; // fas, far, fab
      const iconName = parts[1]; // inbox, user

      const pascalCaseName = iconName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      return pascalCaseName;
    }
  }
  return icon;
}

type CustomIconProps = {
  icon: string;
  size?: number | string;
  color?: string;
  className?: string;
};

export default function CustomIcon({ icon, size = 24, color, className }: CustomIconProps) {
  const convertedIcon = convertIconName(icon);
  const prefix = convertedIcon.slice(0, 2);
  const iconName = convertedIcon;

  const pack = ICON_PACKS[prefix];
  const IconComponent = pack ? (pack as any)[iconName] : null;

  if (!IconComponent) {
    return <span style={{ color: "red" }} title="Icon not found">?</span>;
  }
  return <IconComponent size={size} color={color} className={className} />;
}