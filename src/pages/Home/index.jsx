import { useState } from "react";
import { useEffect } from "react";
import Cards from '../../components/Cards';

const Home =() => {
    const [postList, setPostList]= useState('');

    const getPostList = () => {
      fetch(`http://localhost:1337/posts`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json'
				},
			})
				.then((response) => response.json())
				.then ((response) => {
					console.log(response)
        	setPostList(response)
				})
    }

		const getPostCount =() => {
			
		}

    useEffect(()=>getPostList(),[]);

    return(
        <>
					<h1>The Social Network</h1>
					<p>This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
					<section>
						<h2>What's up people?</h2>
						<small> posts are trending</small>
								{(postList) &&
									<ul className="cardlist"> 
										{
											postList.map((article) => (
												<Cards article={article} key={article.id}/>
											))
										}
									</ul>
								}
					</section>
        </>
    )
}

export default Home;