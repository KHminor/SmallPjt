import axios from "axios"
import { useState } from "react"

function Article() {
  let [articles,setArticles] =  useState([])
  return (
    <div>
      <button onClick={()=> {
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/pages/articles/',
          headers: {
            Authorization: "Token 313f28ca7d77c318ca829d8338af0590b5273eae"
          }
        })
        .then((r)=> {
          // console.log(r.data[0].title)
          setArticles(r.data)
        })
        .catch((e)=> {
          console.log(e);
        })
      }}>버튼</button>

      <div>{articles.map((article,idx)=> {
        return (
        <div key={idx}>
          <div>{article.title}</div>
          <span>{article.content}</span>
          <div>{article.write_date}</div>
        </div>)
      })}</div>
    </div>
  )
}

export default Article