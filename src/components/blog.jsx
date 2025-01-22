import axios from 'axios';
import { useState, useEffect } from 'react'


function Blog() {

   //API default endpoint:
   const endpointApi = "http://localhost:3000";

   const initialFormData = {
      title: "",
      content: "",
      image: "",
      tags: []
   }

   //Variabile di stato che contiene l'array dei post dell'API:
   const [postsList, setPostsList] = useState([])
   //Variabile di stato che contiene lo stato di default dell'oggetto che deve popolarsi all'inivio del form con un nuovo post:
   const [formData, setFormData] = useState(initialFormData)

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
   // Funzione di creazione di un nuovo post:
   const handlerNewPost = (e) => {
      setFormData((prevFormData) => ({
         ...prevFormData,
         [e.target.name]: e.target.value
      }))
      //console.log(formData)
   }

   //Funzione di gestione al click del bottone del form:
   const handlerSendNewPost = (e) => {
      e.preventDefault()
      //conversione della stringa dei tag, in un array:
      const tagsConversion = formData.tags.split(",").map(tag => tag.trim());

      const updatedPost = {
         ...formData,
         tags: tagsConversion
      }
      //Effetto la chiamata all'API con il metodo post, e gli passo il nuovo oggetto:
      axios.post(`${endpointApi}/posts`, updatedPost)
         .then(res => {
            setPostsList(res.data) //Al "send" del nuovo post, mi faccio restituire direttamente la lista dei dati del'API aggiornata
         })
      //In fine resetto il form:
      setFormData(initialFormData)
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
                     <input type="text" name="title" placeholder='Inserisci il titolo' onChange={handlerNewPost} value={formData.title} />
                  </div>
                  <div>
                     <h4>Immagine del post</h4>
                     <input type="text" name="image" placeholder="Inserisci il link dell'immagine" onChange={handlerNewPost} value={formData.image} />
                  </div>
                  <div>
                     <h4>Testo del post</h4>
                     <input type="text" name="content" placeholder='Inserisci il testo' onChange={handlerNewPost} value={formData.content} />
                  </div>
                  <div>
                     <h4>Tags del post (separati da una virgola!!!)</h4>
                     <input type="text" name="tags" placeholder='Inserisci i tags' onChange={handlerNewPost} value={formData.tags} />
                  </div>
                  <button className='btn' onClick={handlerSendNewPost}>Crea</button>
               </form>
            </div>
         </section>
      </>
   )
}

export default Blog