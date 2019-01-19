// import React from 'react';
// import { createStackNavigator, createAppContainer } from 'react-navigation'
// import Main from './components/Main'

// export default class App extends React.Component {
  
//   render() {
//     return (
//       <AppContainer/>
//     );
//   }
// }

// const AppNavigator = createStackNavigator({
//   Main: {
//     screen: Main
//   }
// })

// const AppContainer = createAppContainer(AppNavigator)

import { DrawerNavigator, DrawerItems } from 'react-navigation';
import Main from './components/Main'
import Signup from './components/Signup'
import { Text } from 'react-native';

const App = DrawerNavigator({
  Main: {
    screen: Main
  },
  Signup: {
    screen: Signup
  }
}, {
  contentComponent: (props) => (
    <View>
      <Text>GarangFoodies</Text>
      <DrawerItems {...props} />
    </View>
  )
});

export default App;
