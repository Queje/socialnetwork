import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Cards =({article , refreshList, postList}) => {
	const getCurrentUser = (state) => state;
	const {id, username} = useSelector(getCurrentUser);
	const [likeStatus, setLikeStatus] = useState({
		id: article.id,
		status: false
	});
	const [likeUserList, setLikeUserList] = useState('')

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

	const addLike =(article) => {
		fetch(`http://localhost:1337/posts/${article.id}`, {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${Cookies.get('token')}`,
				'Content-Type': 'application/json'
			},
		})
			.then((response) => response.json())
			.then((response) => {
				const newList = ([...response.like, {id: id, username: username}])

				fetch(`http://localhost:1337/posts/${article.id}`, {
					method: 'put',
					headers: {
						'Authorization': `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({like: newList})
				})
					.then((response) => response.json())
					.then ((response) => {
						setLikeUserList(response.like)
					})
			})
	}

	const removeLike =(article) => {
		fetch(`http://localhost:1337/posts/${article.id}`, {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${Cookies.get('token')}`,
				'Content-Type': 'application/json'
			},
		})
			.then((response) => response.json())
			.then((response) => {
				const newListRemoved = {like: response.like.filter((e) => e.username !== username)}

				fetch(`http://localhost:1337/posts/${article.id}`, {
					method: 'put',
					headers: {
						'Authorization': `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(newListRemoved)
				})
					.then((response) => response.json())
					.then ((response) => {
						setLikeUserList(response.like)
					})
			})
	}

	const getLikesList =(article) => {
		(Cookies.get('token')) &&
		fetch(`http://localhost:1337/posts/${article.id}`, {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${Cookies.get('token')}`,
				'Content-Type': 'application/json'
			},
		})
			.then((response) => response.json())
			.then((response) => {
				setLikeUserList(response.like)
			})
	}

	const handleLike = (article) =>{
		if(likeStatus.status === true){
			removeLike(article)
			setLikeStatus({
				id: article.id,
				status: false
			}) 
		}
		else {
			addLike(article);
			setLikeStatus({
				id: article.id,
				status: true
			})
		}
	}

	useEffect(() => getLikesList(article), [])

	return (
		<li className="card">
			<div className="card-header">
				{(Cookies.get('token')) && 
					<>
						<Link to={`/profile/${article.user.id}`}>{article.user.username}</Link>
						<div className="likebuttons">
							<div className="likecount">{likeUserList.length}</div> 
							{(likeStatus.status===true) ? (
								<button className="btn btn-sm btn-outline-danger" onClick={() => handleLike(article)}>unlike</button>
							):(
								<button className="btn btn-sm btn-outline-success" onClick={() => handleLike(article)}>like</button>
							)}
						</div>
						{ (article.user.id) === (id) &&
							<button className="btn btn-sm btn-outline-warning" onClick={() => handleDelete(article.id)}>
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