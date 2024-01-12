import Home from './src/screens/Home';
import ObjectList from './src/screens/ObjectList';
import TagList from './src/screens/TagList';
import Details from './src/screens/Details';
import Manage from './src/screens/Manage';
import Profile from './src/screens/Profile';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{title:"Welcome "}} name="Home" component={Home} />
          <Stack.Screen name="ObjectList" component={ObjectList} />
          <Stack.Screen name="TagList" component={TagList} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Manage" component={Manage} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        


        </Stack.Navigator>


        {/* REMEMBER TO ADD TOAST HERE */}
        <Toast></Toast>
      </NavigationContainer>
  );
}


export default App;