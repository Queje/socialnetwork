import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Cards =({article , refreshList, postList}) => {
	const getCurrentUser = (state) => state;
	const {loggedin, id} = useSelector(getCurrentUser);

	const handleDelete =(articleID) => {
		fetch(`http://localhost:1337/posts/${articleID}`, {
			method: 'delete',
			headers: {
				'Authorization': `Bearer ${Cookies.get('token')}`, 
				'Content-Type': 'application/json'
			},
		})
		.then((response) => response.json())
		.then ((response) => {
			console.log(response);
			const newList = postList.filter((e) => e.id !== response.id);
			refreshList(newList);
    })
	}

	return (
		<li className="card">
			<div className="card-header">
				{(loggedin===true) && 
					<>
						<Link to={`/profile/${article.user.id}`}>{article.user.username}</Link>
						<div>like</div>
						{ (article.user.id) === (id) &&
							<button className="btn btn-sm btn-outline-warning" onClick={() => handleDelete(article.id)}>delete</button>
						}
					</>
				}
			</div>
			<div className="card-body">{article.text}</div>
		</li>
	)
}

export default Cards;