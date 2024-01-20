import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import SignUp from './containers/SignUp';
import ResetPasswordConfirmation from './containers/ResetPasswordConfirmation';
import ProfilePage from './containers/ProfilePage';
import ProfileDetails from './containers/ProfileDetails'
import ProfileAboutScreen from './containers/ProfileAboutScreen';
import HomeScreen from './containers/HomeScreen';
// import IntroScreen from './containers/IntroScreen';
import AddNoteScreen from './containers/AddNoteScreen';
import ViewNoteScreen from './containers/ViewNoteScreen';
import EditNoteScreen from './containers/EditNoteScreen';



const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

// const customTransition = ({ current }) => {
//   return {
//     cardStyle: {
//       opacity: current.progress,
//       transform: [
//         {
//           translateX: current.progress.interpolate({
//             inputRange: [0, 1],
//             outputRange: [60, 0],
//           }),
//         },
//       ],
//     },
//   };
// };

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        // initialRouteName="Intro"
        // screenOptions={{
        //   cardStyleInterpolator: customTransition,
        //   headerShown: false,
        // }}
      >
        {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: true, title: 'Go Back' }}/>
        <Stack.Screen name="ResetPasswordConfirmation" component={ResetPasswordConfirmation} options={{ headerShown: true, title: 'Go Back'  }}/>
        <Stack.Screen name="SignUp" component={SignUp}  options={{ headerShown: true, title: 'Go Back'  }} />
        
        <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerShown: false, }}/>

        <Stack.Screen name="ProfilePage" component={ProfilePage}  options={{ headerShown: false, }}/>
        <Stack.Screen name="ProfileDetails" component={ProfileDetails}  options={{ headerShown: false, }}/>
        <Stack.Screen name="ProfileAboutScreen" component={ProfileAboutScreen}  options={{ headerShown: false, }}/>
        
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen}  options={{ headerShown: false, }}/>
        <Stack.Screen name="ViewNoteScreen" component={ViewNoteScreen}  options={{ headerShown: false, }}/>
        <Stack.Screen name="EditNoteScreen" component={EditNoteScreen}  options={{ headerShown: false, }}/>

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
