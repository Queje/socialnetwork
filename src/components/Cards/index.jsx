import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const Cards =({article }) => {
	const getCurrentUser = (state) => state;
	const {loggedin} = useSelector(getCurrentUser);

	return (
		<li className="card">
			<div className="card-header">
				{(loggedin===true) && 
					<>
						<Link to={`/profile/${article.user.id}`}>{article.user.username}</Link>
						<div>like</div>
					</>
				}
			</div>
			<div className="card-body">{article.text}</div>
		</li>
	)
}

export default Cards;