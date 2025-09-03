import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { themeAtom } from '@/stores/editor';
import { Chrome, hexToHsva, hsvaToRgbaString, rgbaStringToHsva } from '@uiw/react-color';
import Header from './Header';
import Container from './Container';
import { useTranslation } from 'react-i18next';
import { saveTheme } from '@/utils/localStorage';

const ColorPage: React.FC = () => {
    const [theme, setTheme] = useAtom(themeAtom);
    const { t } = useTranslation();
    const color = theme.includes('rgba') ? rgbaStringToHsva(theme) : hexToHsva(theme);
    return (
        <Container>
            <Header title={t('welcome.color.title')} description={t('welcome.color.description')} />
            <motion.div
                className="mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex flex-wrap gap-3 justify-center">
                    <Chrome
                        color={color}
                        onChange={(color) => {
                            const colorValue = hsvaToRgbaString(color.hsva);
                            setTheme(colorValue);
                            saveTheme(colorValue);
                        }}
                    />
                </div>
            </motion.div>
        </Container>
    );
};

export default ColorPage;
