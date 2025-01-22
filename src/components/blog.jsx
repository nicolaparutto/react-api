import axios from 'axios';
import { useState, useEffect } from 'react'


function Blog() {

   //API default endpoint:
   const endpointApi = "http://localhost:3000";

   //Chiamata API:
   const fetchPosts = () => {
      axios.get(`${endpointApi}/posts`)
         .then(res => {
            setPostsList(res.data)
         })
         .catch(error => {
            console.error("Errore durante la chiamata al server", error)
         })
   }

   //Variabile di stato che contiene l'array dei post dell'API:
   const [postsList, setPostsList] = useState([])

   useEffect(() => {
      fetchPosts()
   }, [])

   return (
      <>
         <section className="container">
            <h1>Lista dei post</h1>
            <div className="card-container">
               <div className="card-row">
                  {postsList.map(post => (
                     <div key={post.id} className="card">
                        <div className='card-content'>
                           <div className="card-img">
                              <img src={post.image} alt="" />
                           </div>
                           <div className="card-text">
                              <h2>{post.title}</h2>
                              <p>{post.content}</p>
                              <hr />
                              <p><strong>Tags: </strong>{post.tags.join(", ")}</p>
                              <div className="card-trash">
                                 <div className="trash">
                                    <i class="fa-solid fa-trash-can"></i>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </>
   )
}

export default Blog