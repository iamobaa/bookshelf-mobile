import * as React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/Index'
import BookScreen from './src/screens/BookScreen/Index'
import AddBookScreen from './src/screens/BookScreen/AddBook'
import UpdateBookScreen from './src/screens/BookScreen/UpdateBook'

const Stack = createNativeStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

const App = () => {
  return (
    <PaperProvider theme={theme}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'MyBookShelf'}}
                />
                <Stack.Screen 
                    name="AddBook" 
                    component={AddBookScreen} 
                    options={{title: 'Add Book'}}
                />
                <Stack.Screen 
                    name="UpdateBook" 
                    component={UpdateBookScreen} 
                    options={{title: 'Update Book'}}
                />
                <Stack.Screen 
                    name="Book" 
                    component={BookScreen}
                    options={({ route }) => ({ title: route.params.book.title })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
};

export default App;