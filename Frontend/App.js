import Home from './src/screens/Home';
import ObjectList from './src/screens/ObjectList';
import TagList from './src/screens/TagList';
import Details from './src/screens/Details';
import Profile from './src/screens/Profile';


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
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;