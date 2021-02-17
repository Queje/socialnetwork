import {Link, useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector, useDispatch} from 'react-redux';
import CurrentUser from '../../stores/CurrentUser';

const Navbar =() => {
	const history = useHistory();
	const getCurrentUser = (state) => state;
	const {loggedin} = useSelector(getCurrentUser);
	const dispatch = useDispatch();

	const handleLogout=(e)=>{
		e.preventDefault();
		Cookies.remove('token');
		history.push('/');
		dispatch(CurrentUser({
			id: "not logged in",
			username: "not logged in",
			email: "not logged in",
			loggedin: false
		}))
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-dark">
			<Link className="navbar-brand" to="/">Home</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
					<Link className="nav-link" to="/register">Register</Link>
				</div>
                <div className="navbar-nav">
					<Link className="nav-link" to="/Protected">Profile</Link>
				</div>
			</div>
			<div className="navbar-nav">
				{(loggedin===true) ? (
					<button className="btn btn-outline-secondary" onClick={handleLogout}>Log out</button>
				) : ( 
					<Link className="btn btn-outline-secondary" to="/login">Log in</Link>
				)}		
			</div>
		</nav>
	)
}

export default Navbar;