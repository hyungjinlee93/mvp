import React from 'react';
import { View, Button } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button
          title="Student Log In"
          onPress={() => navigate('Student')}
        />
        <Button
          title="Administration"
          onPress={() => navigate('Admin')}
        />
      </View>
    );
  }
}

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

export default HomeScreen;