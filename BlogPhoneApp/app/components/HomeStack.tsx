import Home from "./Home"
import FullPost from "./FullPost"
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from "./Card";

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="FullPost" component={FullPost} options={{ title: 'Go back' }} />
        </Stack.Navigator>
    );
}
