import axios from 'axios';
import { useState, useEffect } from 'react'


function Blog() {

   //API default endpoint:
   const endpointApi = "http://localhost:3000";

   //Variabile di stato che contiene l'array dei post dell'API:
   const [postsList, setPostsList] = useState([])

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

   //Funzione di elliminazione di un post:
   const handlerRemove = (id) => {
      axios.delete(`${endpointApi}/posts/${id}`)
         .then(res => {
            fetchPosts() //Richiamo la funzione che mi effettua la chiamata all'api. E quindi la lista dei post, mi viene sovrascritta con la lista aggiornata.
         })
         .catch(error => {
            console.error("Errore durante l'elliminazione di un post", error)
         })
   }

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
                                 <div className="trash" onClick={() => handlerRemove(post.id)}>
                                    <i className="fa-solid fa-trash-can"></i>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>


            <div className="form-container">
               <h1>Aggiungi un post</h1>
               <form action="">
                  <div>
                     <h4>Titolo del post</h4>
                     <input type="text" name="" id="" placeholder='Inserisci il titolo' />
                  </div>
                  <div>
                     <h4>Immagine del post</h4>
                     <input type="text" name="" id="" placeholder="Inserisci il link dell'immagine" />
                  </div>
                  <div>
                     <h4>Testo del post</h4>
                     <input type="text" name="" id="" placeholder='Inserisci il testo' />
                  </div>
                  <div>
                     <h4>Tags del post</h4>
                     <input type="text" name="" id="" placeholder='Inserisci i tags (separati da una virgola)' />
                  </div>
                  <button className='btn'>Crea</button>
               </form>
            </div>
         </section>
      </>
   )
}

export default Blog