import { useSelector, useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';
import CurrentUser from '../../stores/CurrentUser';

const Profile =() => {
	const history = useHistory();
	const dispatch = useDispatch();
	const getCurrentUser = (state) => state;
	const {id, username, email} = useSelector(getCurrentUser);

	const handleUpdate=(e)=>{
		e.preventDefault();
		
		const userInput = {
			username: e.target[0].value,
			email: e.target[1].value,
			password: e.target[2].value
		}
		
		fetch(`http://localhost:1337/users/${id}`, {
			method: 'put',
			headers: {
				'Authorization': `Bearer ${Cookies.get('token')}`, 
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInput)
		})
		.then((response) => response.json())
		.then ((response) => {
			console.log(response)
			history.push('/')
			alert("profile updated")
			dispatch(CurrentUser({
				id: response.id,
				username: response.username,
				email: response.email,
				loggedin: true
			}))
		});
	}

	return(
		<>
			<div className="card">
				<h2>Profile</h2>
				<p>{username}</p>
				<p>{email}</p>
			</div>
			<div>
				<h3>Modifier votre profile?</h3>
				<form onSubmit={handleUpdate}>
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
			</div>
		</>
	)
}

export default Profile;