import { useState } from "react";
import { useEffect } from "react";
import Cards from '../../components/Cards';
import Cookies from 'js-cookie';
import { useSelector} from 'react-redux';

const Home =() => {
    const [postList, setPostList]= useState('');
		const [postCount, setPostCount]= useState('');
		const getCurrentUser = (state) => state;
		const {loggedin, username} = useSelector(getCurrentUser);

    const getPostList = () => {
      fetch(`http://localhost:1337/posts`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json'
				},
			})
				.then((response) => response.json())
				.then ((response) => {
					setPostList(response)
				})
    }

		const getPostCount =() => {
			(Cookies.get('token')) && 
			fetch(`http://localhost:1337/posts/count`, {
				method: 'get',
				headers: {
					'Authorization': `Bearer ${Cookies.get('token')}`,
					'Content-Type': 'application/json'
				},
			})
				.then((response) => response.json())
				.then ((response) => {
					setPostCount(response)
				})
		}

    useEffect(()=>{getPostList()},[]);
		useEffect(()=>{getPostCount()},[postList]);
		
    return(
        <>
					<h1>The Social Network</h1>
					<p>This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
					<section>
						<h2>What's up people?</h2>
							{(Cookies.get('token')) && 
								<small> {postCount} posts are trending</small>
							}
							{(postList) &&
								<ul className="cardlist"> 
									{
										postList.map((article) => (
											<Cards article={article} key={article.id} refreshList={setPostList} postList={postList}/>
										))
									}
								</ul>
							}
					</section>
        </>
    )
}

export default Home;