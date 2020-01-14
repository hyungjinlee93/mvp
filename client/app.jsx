import React from 'react';
import ReactDOM from 'react-dom';
import SignInForm from './signinform.jsx';
import SignedInStudents from './signedinstudents.jsx';
import Cohorts from './cohorts.jsx';
import CreateCohort from './createcohort.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      token: '',
      students: [],
      cohorts: [],
      cohort: ''
    };
    this.signIn = this.signIn.bind(this);
    this.selectCohort = this.selectCohort.bind(this);
    this.createCohort = this.createCohort.bind(this);
    this.signInAgain = this.signInAgain.bind(this);
    this.refreshCohorts = this.refreshCohorts.bind(this);
  }
  refreshCohorts() {
    fetch('http://13.52.48.73:3001/api/cohorts', {
          method: 'GET'
        })
          .then(response => response.json())
          .then((data) => {
            const cohortslist = data.map(element => element.cohort);
            this.setState({ cohorts: cohortslist.slice() });
          })
          .catch(err => {
            console.error('Error fetching cohorts: ', err);
          });
  }
  signIn(e) {
    e.preventDefault();
    const user = e.target[0].value;
    const password = e.target[1].value;
    const attempt = { user, password };
    fetch('http://13.52.48.73:3001/api/adminsignin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attempt),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw "Error";
        }
      })
      .then(data => {
        this.setState({ token: data.token, signedIn: true });
        fetch('http://13.52.48.73:3001/api/cohorts', {
          method: 'GET'
        })
          .then(response => response.json())
          .then((data) => {
            const cohortslist = data.map(element => element.cohort);
            this.setState({ cohorts: cohortslist.slice() });
          })
          .catch(err => {
            console.error('Error fetching cohorts: ', err);
          });
      })
      .catch(err => console.error('Error signing in: ', err));
  }
  signInAgain() {
    this.setState({
      signedIn: false,
      token: '',
      students: [],
      cohorts: [],
      cohort: ''
    });
  }
  selectCohort(e) {
    e.preventDefault();
    const requestbody = {
      token: this.state.token,
      cohort: e.target[0].value,
      date: e.target[1].value
    }
    fetch('http://13.52.48.73:3001/api/getDay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestbody)
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw "Error";
        }
      })
      .then(data => {
        this.setState({ students: data.slice() });
      })
      .catch(err => {
        console.error('Sign In Again');
        this.signInAgain();
      });
  }
  createCohort(e) {
    e.preventDefault();
    const requestbody = {
      cohort: e.target[0].value,
      token: this.state.token
    }
    fetch('http://13.52.48.73:3001/api/cohorts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestbody)
    })
    .then(response => {
      if(response.status === 200) {
        document.getElementById('CreateCohort').value = '';
        this.refreshCohorts();
      } else {
        throw "error";
      }
    })
    .catch(err => {
      console.error('Sign In Again', err);
      this.signInAgain();
    });
  }
  returnSignInForm() {
    if (!this.state.signedIn) {
      return <SignInForm fn={this.signIn} />
    }
  }
  returnSignedInStudents() {
    if (this.state.signedIn && this.state.students.length > 0) {
      return <SignedInStudents students={this.state.students} />
    }
  }
  returnCohorts() {
    if (this.state.signedIn && this.state.cohorts.length > 0) {
      return <Cohorts cohorts={this.state.cohorts} fn={this.selectCohort} />
    }
  }
  returnCreateCohort() {
    if(this.state.signedIn) {
      return <CreateCohort fn={this.createCohort} />
    }
  }
  render() {
    return (
      <div>
        {this.returnSignInForm()}
        {this.returnCohorts()}
        {this.returnSignedInStudents()}
        {this.returnCreateCohort()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('AttendanceModule'));