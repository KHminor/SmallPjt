import axios from 'axios'
import React ,{ useState } from 'react'

function Cat() {
  let [catImg,setCatImg] = useState('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9928CA355C80FB3F26')
  return (
    <div>
      <img src={catImg} alt="이미지" style={{width: '50rem', height: '40rem'}} />
      <div>
        <button onClick={()=> {
          axios({
            method: 'GET',
            url: 'https://api.thecatapi.com/v1/images/search',
          })
          .then((r)=> {
            console.log(r);
            setCatImg(r.data[0].url)
          })
          .catch((e)=> {
            console.log(e);
          })
        }}>클릭</button>
      </div>
    </div>
  )
}

export default Cat



