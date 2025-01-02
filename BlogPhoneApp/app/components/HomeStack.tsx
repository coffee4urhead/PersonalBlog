import Home from "./Home"
import FullPost from "./FullPost"
import LoginForm from "./LoginForm";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from "./Card";
import RegisterForm from "./RegisterForm"

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="FullPost" component={FullPost} options={{ title: 'Go back' }} />
            <Stack.Screen name="RegisterScreen" component={RegisterForm} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginForm} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}
