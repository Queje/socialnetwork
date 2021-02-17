import { useSelector} from 'react-redux';

const Profile =() => {
	const getCurrentUser = (state) => state;
	const { username, email} = useSelector(getCurrentUser);

	const handleUpdate=()=>{

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
				<form onSubmit={()=>handleUpdate}>
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