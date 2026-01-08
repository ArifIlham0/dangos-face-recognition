import { Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Dimension = {
    statusBarHeight: Platform.OS === 'android' ? StatusBar.currentHeight : 55,
}

const useDimensionInsets = () => {
    const insets = useSafeAreaInsets();
    return { insets };
};

export { Dimension, useDimensionInsets };