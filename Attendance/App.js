// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannerOn: false,
      scanData: '',
      scanned: false,
      hasPermission: null
    };
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
    this.checkPermissions = this.checkPermissions.bind(this);
    this.turnScannerOn = this.turnScannerOn.bind(this);
  }
  handleBarCodeScanned({data}) {
    this.setState({ scanData: data, scanned: true, scannerOn: false });
    alert(data);
  }
  checkPermissions() {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const permission = (status === 'granted');
      this.setState({ hasPermission: permission });
    })();
  }
  turnScannerOn() {
    this.setState({scannerOn: true});
  }
  returnScanner() {
    if (this.state.scannerOn){
      return (
          <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )
    } else {
      return (
        <Button title='Press to Scan' onPress={this.turnScannerOn} />
      )
    }
  }
  render() {
    this.checkPermissions();
    if (this.state.hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        {this.returnScanner()}
      </View>
    );
  }
}
