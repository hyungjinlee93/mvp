import React, { Component } from 'react';
import { View, Button, Text, Picker, StyleSheet } from 'react-native';

class PickStudent extends Component {
  state = { user: '' };
  updateUser = (user) => {
    this.setState({ user: user });
  }
  selectUser = () => {
    this.props.fn(this.state.user);
  }
  render() {
    let list = this.props.students.map(element => <Picker.Item key={element} label={element} value={element} />);
    return (
      <View>
        <Text style={styles.text}>Select Student:</Text>
        <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
          {list}
        </Picker>
        <Button style={styles.text} title={'Tap to select: ' + this.state.user} onPress={this.selectUser} />
      </View>
    )
  }
}
export default PickStudent;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  }
})