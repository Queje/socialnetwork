import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import CurrentUser from '../../stores/CurrentUser';

const Login =() => {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleLogin=(e) => {
		e.preventDefault();
		
		const userInput = {
			identifier: e.target[0].value,
			password: e.target[1].value
		}

		fetch('http://localhost:1337/auth/local', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInput)
		})
		.then ((response) => response.json())
		.then ((response) => {
			if (response.user && response.user.confirmed) {
				Cookies.set('token', response.jwt)
				console.log("cookie:"+Cookies.get('token'))
				history.push('/')
				dispatch(CurrentUser({
					id: response.user.id,
					username: response.user.username,
					email: response.user.email,
				}))
			} else {
				alert(response.data[0].messages[0].message)
				history.push('/login')
			}
		})
	}

	return(
		<section>
			<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<div className="form-group">
						<label>Username / Email</label>
						<input type="text" className="form-control" id="username" aria-describedby="username" required/>
					</div>
					<div className="form-group">
						<label >Password</label>
						<input type="password" className="form-control" id="userPassword" required/>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
		</section>
	)
}

export default Login;