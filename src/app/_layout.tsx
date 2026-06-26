import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {

    const {top, bottom} = useSafeAreaInsets();

    return (
        <Stack>
            <Stack.Screen name="index" options={{ contentStyle: { paddingTop: top, paddingBottom: bottom }, headerTitle: '' }} />
        </Stack>
    );
}