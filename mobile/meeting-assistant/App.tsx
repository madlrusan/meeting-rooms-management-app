
import { Login } from './pages/Login/Login';
import React from 'react';
import { View , StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const  App = () => {
  return (

    <View style={styles.body}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen  
                    name=" "
                    component={Login}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
    body: { 
        flex: 1,
        backgroundColor: "gainsboro",
    }
});