import { HudComponentType } from '@/utils/types';
import { FaBrain, FaHeart, FaHamburger, FaGlassMartini, FaRunning, FaLungs } from 'react-icons/fa';
import { FaMicrophone, FaShield } from 'react-icons/fa6';

export const ICON_MAP = {
    health: FaHeart,
    armour: FaShield,
    hunger: FaHamburger,
    thirst: FaGlassMartini,
    stress: FaBrain,
    voice: FaMicrophone,
    oxygen: FaLungs,
    stamina: FaRunning
} as { [key in HudComponentType]: React.ElementType }