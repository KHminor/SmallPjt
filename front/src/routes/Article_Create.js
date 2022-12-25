import { useState } from "react"
import axios from 'axios'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Article_Create() {
  
  let [title,setTitle] = useState()
  let [content,setContent] = useState()
  let [write_date,setWrite_date] = useState()
  let navigate = useNavigate()
  let token = useSelector((state)=> {return state.token})
  let site = "http://127.0.0.1:8000"
  return (
    <div>
      <h1>게시글 작성</h1> 
      <div>
        <input style={{width:"28.5rem", marginRight:"2rem"}} id="title" type="text" placeholder="title" onChange={(e)=> {
          setTitle(e.target.value)
        }}/>
        <input style={{width:"19rem"}} type="date" placeholder="write_date" onChange={(e)=> {
          setWrite_date(e.target.value)
        }}/>
      </div>
      <div>
        <textarea style={{width:'50rem',height:'55rem'}} name="content" wrap="hard" onChange={(e)=> {
          setContent(e.target.value)
        }}></textarea>
      </div>
      <div>
        <button onClick={()=> {
          axios({
            method: 'POST',
            url: `${site}/api/pages/articles/`,
            data: {
              'title': title,
              'content': content,
              'write_date': write_date
            },
            headers: {
              Authorization: `Token ${token.token}`
            }
          })
          .then(()=> {
            alert('게시글 작성 완료💘')
            navigate('/article')
          })
          .catch((e)=> {
            console.log(e);
          })
        }}>생성</button>
      </div>
      
    </div>
  )
}
export default Article_Create