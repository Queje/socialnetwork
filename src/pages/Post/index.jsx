import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';

const Post=()=>{
	const history = useHistory();
	const getCurrentUser = (state) => state;
	const {id} = useSelector(getCurrentUser);

	const handlePost=(e)=>{
		e.preventDefault();

		const userInput = {
			text: e.target[0].value,
			user: id
		}

		console.log(userInput);
		
		fetch(`http://localhost:1337/posts`, {
			method: 'post',
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
		})
	}

	return(
		<section>
			<h2>New Post:</h2>
			<form onSubmit={handlePost}>
				<div className="form-group">
					<textarea className="form-control" id="post" rows="3"></textarea>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</section>
	)
}

export default Post;