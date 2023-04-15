import { Login } from "./src/pages/Login/Login";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./src/pages/MainScreen/MainScreen";
import { QueryClient, QueryClientProvider } from "react-query";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();
const App = () => {
	return (
		<View style={styles.body}>
			<NavigationContainer>
				<QueryClientProvider client={queryClient}>
					<Stack.Navigator>
						<Stack.Screen
							name="Login"
							component={Login}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Dashboard"
							component={MainScreen}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</QueryClientProvider>
			</NavigationContainer>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: "gainsboro",
	},
});
