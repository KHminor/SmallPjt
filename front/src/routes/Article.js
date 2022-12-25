import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function Article() {
  let [articles,setArticles] =  useState([])
  let token = useSelector((state)=> {return state.token})
  let site = "http://127.0.0.1:8000"
  useEffect(()=> {
    axios({
      method: 'GET',
      url: `${site}/api/pages/articles/`,
      headers: {
        Authorization: `Token ${token.token}`
      }
    })
    .then((r)=> {
      setArticles(r.data)
      // console.log(r.data);
    })
    .catch((e)=> {
      console.log(e);
    })
  },[])
  
  
  return (
    <div>
      {
        articles.map((article,idx)=> {
          return (
            <div key={idx} style={{width:"60rem", backgroundColor:"black", color:'white'}}>
              <div><span>Title: </span>{article.title}</div>
              <pre style={{width:'100%'}}>{article.content}</pre>
              <div>{article.write_date}</div>
              <br />
              <br />
              <br />
            </div>
          )
        })
      }
    </div>
  )
}

export default Article