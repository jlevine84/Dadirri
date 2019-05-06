import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from "./components/Nav";
import AUTH from './utils/AUTH';
import LandingPage from './pages/Landing/LandingPage';
import { throws } from 'assert';
import Dashboard from './pages/Dashboard/Dashboard';
import About from './pages/About/About';
import { Redirect, Link } from 'react-router-dom';

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			username: null,
			loggedIn: false,
			user: null,
			showLogin:false,
			showSignUp: false,
			redirectTo: null
    };
	}
	
	toggleModal1 = () => this.setState({
		showLogin: !this.state.showLogin
	})
	toggleModal2 = () => this.setState({
		showSignUp: !this.state.showSignUp
	})
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data,
					redirectTo: "/dashboard"
				});
				console.log("logged in from previous login")
				console.log(this.state.user)
			} else {
				console.log("no user")
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null,
					redirectTo: "/"
				});
				"logged out from button click"
			}
		});
	}

	login = (username, password) => {
		
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
					user: response.data,
					redirectTo: "/dashboard"
				});
				console.log("logged in")
				console.log(this.state.user.user.email)
			}
			else{
				console.log("login failed")
			}
			
    }).catch(error=>{
			console.log(error)
		})
	}

	SignUp = (email, password)=>{
		AUTH.signup({
      email: email,
      password: password
    }).then(response => {
      console.log(response);
      if (!response.data.errmsg) {
        console.log(response.data);
        this.setState({
          loggedIn: true,
					user: response.data,
					redirectTo: "/dashboard"
        });
      } else {
        console.log('duplicate');
      }
    });

	}

	
	render() {	
		return (
			<div className="App">
				{/* User is logged in */}
        { this.state.loggedIn && (
          <div>
						<Nav user={this.state.user} logout={this.logout}/>
              <Switch>
                <Route exact path="/" component={() => <Dashboard username={this.state.user.user.email}/>} />
								<Route exact path="/about" component={() => <About user={this.state.user}/>} />
								<Route exact path="/dashboard" component={() => <Dashboard username={this.state.user.user.email}/>} />
              </Switch>
          </div>
				)}
				{/*No User logged in*/}
        { !this.state.loggedIn && (
					<div>
						
				<Switch>

				<Route exact path="/" component={() => 
				<LandingPage user={this.state.user} toggle1 = {this.toggleModal1} toggle2={this.toggleModal2}
				showSignInModal={this.state.showLogin} login={this.login}
				showSignUpModal={this.state.showSignUp}/>} SignUp={this.SignUp} />
				<Route exact path="/about" component={() => <About user={this.state.user}/>} />
			</Switch>
			</div>


				)} 
			</div>
		)
	}
}

export default App;
