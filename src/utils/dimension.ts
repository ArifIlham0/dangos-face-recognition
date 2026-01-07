import { Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Dimension = {
    statusBarHeight: Platform.OS === 'android' ? StatusBar.currentHeight : 55,
}

const DimensionInsets = () => {
    const insets = useSafeAreaInsets();
    return { ...Dimension, insets };
}

export { Dimension, DimensionInsets };