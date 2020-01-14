import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PickCohort from './PickCohort';
import PickStudent from './PickStudent';

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannerOn: false,
      scanData: '',
      scanned: false,
      hasPermission: null,
      cohorts: [],
      cohort: '',
      students: [],
      student: '',
      fetchedCohorts: false
    };
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
    this.checkPermissions = this.checkPermissions.bind(this);
    this.turnScannerOn = this.turnScannerOn.bind(this);
    this.setStudent = this.setStudent.bind(this);
    this.setCohort = this.setCohort.bind(this);
  }
  static navigationOptions = {
    title: 'Student Sign-In',
  };
  handleBarCodeScanned({ data }) {
    const {navigate} = this.props.navigation;
    let timestamp = (new Date()).toLocaleString();
    this.setState({ scanData: data, scanned: true, scannerOn: false });
    const signInInfo = {
      "student": this.state.student,
      "cohort": this.state.cohort,
      "keyword": data,
      "phone_id": "phoneidtest",
      "timest": timestamp
    }
    fetch('http://13.52.48.73:3001/api/signin', {
      method: 'POST',
      body: JSON.stringify(signInInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if(response.status === 200) {
          alert('Signed In');
          navigate('Home');
        } else {
          alert('Already signed in or wrong code'); //change to be more specific in server
          navigate('Home');
        }
      })
      .catch(err => {
        console.error('Error signing in: ', err);
      })
  }
  checkPermissions() {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const permission = (status === 'granted');
      this.setState({ hasPermission: permission });
    })();
  }
  turnScannerOn() {
    this.setState({ scannerOn: true });
  }
  returnScanner() {
    if (this.state.scannerOn) {
      return (
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )
    } else if (this.state.cohort.length > 0 && this.state.student.length > 0) {
      return (
        <Button title='Press to Scan and Sign In' onPress={this.turnScannerOn} />
      )
    } else {
      return null;
    }
  }
  componentDidMount() {
    if (!this.state.fetchedCohorts) {
      fetch('http://13.52.48.73:3001/api/cohorts', {
        method: 'GET'
      })
        .then(response => response.json())
        .then((data) => {
          const cohortslist = data.map(element => element.cohort);
          this.setState({ cohorts: cohortslist.slice(), fetchedCohorts: true });
        })
        .catch(err => {
          console.error('Error fetching cohorts: ', err);
        });
    }
  }
  setStudent(student) {
    this.setState({ student });
  }
  setCohort(cohort) {
    fetch(`http://13.52.48.73:3001/api/users/?cohort=${cohort}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data) => {
        const studentslist = data.map(element => element.student);
        this.setState({ students: studentslist.slice(), cohort: cohort })
      })
  }
  returnPickStudent() {
    if (this.state.students.length > 0 && this.state.student.length === 0) {
      return (<PickStudent students={this.state.students} fn={this.setStudent} />);
    } else {
      return null;
    }
  }
  returnPickCohort() {
    if (this.state.fetchedCohorts && this.state.cohort.length === 0) {
      return (<PickCohort cohorts={this.state.cohorts} fn={this.setCohort} />);
    } else {
      return null;
    }
  }
  render() {
    if (this.state.hasPermission === null) {
      this.checkPermissions();
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasPermission === false) {
      this.checkPermissions();
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {this.returnPickCohort()}
        {this.returnPickStudent()}
        {this.returnScanner()}
      </View>
    );
  }
}
