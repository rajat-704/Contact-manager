import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home';
import AddNewContact from "./src/screens/addNewContact";
import EditContact from "./src/screens/editContact";
import ViewContact from "./src/screens/viewContact";

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddNewContact" component={AddNewContact} />
          <Stack.Screen name="EditContact" component={EditContact} />
          <Stack.Screen name="ViewContact" component={ViewContact} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}