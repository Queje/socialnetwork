import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import CurrentUser from '../../stores/CurrentUser';

const Register =() => {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit =(e) => {
		e.preventDefault();
		
		const userInput = {
			username: e.target[0].value,
			email: e.target[1].value,
			password: e.target[2].value
		}

		fetch('http://localhost:1337/auth/local/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInput)
		})
		.then((response) => response.json())
		.then ((response) => {
			Cookies.set('token', response.jwt);
			history.push('/')
			dispatch(CurrentUser({
				id: response.user.id,
				username: response.user.username,
				email: response.user.email,
				loggedin: true
			}))
		})
	}

	return(
			<section>
					<h2>Register</h2>
					<form onSubmit={handleSubmit}>
							<div className="form-group">
									<label>Username</label>
									<input type="text" className="form-control" id="username" aria-describedby="username"/>
									<small className="form-text text-muted">The one you will be using so choose well.</small>
							</div>
							<div className="form-group">
									<label >Email address</label>
									<input type="email" className="form-control" id="userEmail" aria-describedby="userEmail"/>
									<small className="form-text text-muted">We'll never share your email with anyone else.</small>
							</div>
							<div className="form-group">
									<label >Password</label>
									<input type="password" className="form-control" id="userPassword"/>
							</div>
							<button type="submit" className="btn btn-primary">Submit</button>
					</form>
			</section>
	)
}

export default Register;