import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import Reducer from './stores/Reducer';
import PrivateRoute from './components/PrivateRoute';
import Post from './pages/Post';
import OtherProfile from './pages/OtherProfile';

const App =() => {

	return (
		<>
			<Provider store={Reducer}>
				<Router>
					<Navbar/>
					<main>
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							<Route path="/register">
								<Register />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<PrivateRoute exact path="/profile/me" component={Profile} />
							<PrivateRoute path="/profile/:authorID" component={OtherProfile} />
							<PrivateRoute path="/post" component={Post} />
						</Switch>
					</main>
				</Router>
			</Provider>
		</>
	)
}

ReactDOM.render(<App />, document.querySelector("#root"));