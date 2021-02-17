import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Cards from '../../components/Cards';

const OtherProfile =() => {
    const {authorID} = useParams();
    const [authorInfo, setAuthorInfo]= useState('');
    const [authorPostList, setAuthorPostList]=useState('');

    const getAuthorInfo = () => {
        fetch(`http://localhost:1337/users/${authorID}`, {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${Cookies.get('token')}`, 
				'Content-Type': 'application/json'
			},
		})
		.then((response) => response.json())
		.then ((response) => {
			console.log(response)
            setAuthorInfo(response)
        })
    }

    const getAuthorPostList = () => {
        fetch(`http://localhost:1337/posts?user.id=${authorID}`, {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${Cookies.get('token')}`, 
				'Content-Type': 'application/json'
			},
		})
		.then((response) => response.json())
		.then ((response) => {
			console.log(response)
            setAuthorPostList(response)
        })
    }

    useEffect(()=>getAuthorInfo(), []);
    useEffect(()=>getAuthorPostList(), []);

    return (
        <section>
            <div className="card">
                <h2>Profile de l'auteur:</h2>
                <p>{authorInfo.username}</p>
                <p>{authorInfo.email}</p>
            </div>
            {(authorPostList) &&
							<ul className="cardlist"> 
								{
									authorPostList.map((article) => (
										<Cards article={article} key={article.id}/>
									))
								}
							</ul>
            }
        </section>
    )
}

export default OtherProfile;