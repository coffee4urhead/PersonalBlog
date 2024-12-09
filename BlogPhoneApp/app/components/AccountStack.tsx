import FullPost from "./FullPost"
import Account from "./Account"
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from "./Card";

const Stack = createStackNavigator<HomeStackParamList>();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AccountPostScreen" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="FullPost" component={FullPost} options={{ title: 'Go back' }} />
        </Stack.Navigator>
    );
}
