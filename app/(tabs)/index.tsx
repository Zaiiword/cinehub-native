import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListPage from '../pages/MovieListPage';
import MovieDetailPage from '../pages/MovieDetailPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <Stack.Navigator initialRouteName='MovieListPage'>
        <Stack.Screen name="MovieListPage" component={MovieListPage} />
        <Stack.Screen name="MovieDetailPage" component={MovieDetailPage} />
      </Stack.Navigator>
  );
}

export default App;