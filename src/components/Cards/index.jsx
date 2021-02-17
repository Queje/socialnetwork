import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';

const Cards =({article , refreshList, postList}) => {
	const getCurrentUser = (state) => state;
	const {loggedin, id} = useSelector(getCurrentUser);
	const [likeStatus, setLikeStatus] = useState({
		id: article.id,
		status: false
	});

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
			const newList = postList.filter((e) => e.id !== response.id);
			refreshList(newList);
    })
	}

	const handleLike = (article) =>{
		if(likeStatus.status === true)(
			setLikeStatus({
				id: article.id,
				status: false
			})) 
		else (
			setLikeStatus({
				id: article.id,
				status: true
			})
		)
	}

	return (
		<li className="card">
			<div className="card-header">
				{(loggedin===true) && 
					<>
						<Link to={`/profile/${article.user.id}`}>{article.user.username}</Link>
						<div className="likebuttons">
							<div className="likecount">{article.like}</div> 
							{(likeStatus.status===true) ? (
								<button className="btn btn-sm btn-outline-danger" onClick={() => handleLike(article)}>unlike</button>
							):(
								<button className="btn btn-sm btn-outline-success" onClick={() => handleLike(article)}>like</button>
							)}
						</div>
						{ (article.user.id) === (id) &&
							<button className="btn btn-sm btn-outline-warning" 
											onClick={() => handleDelete(article.id)}>
								delete
							</button>
						}
					</>
				}
			</div>
			<div className="card-body">{article.text}</div>
		</li>
	)
}

export default Cards;