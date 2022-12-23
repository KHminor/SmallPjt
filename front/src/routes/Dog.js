import axios from 'axios'
import React, {useState} from 'react'


function Dog() {
  let [dogImg,setDogImg] = useState('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9928CA355C80FB3F26')
  return (
    <div>
      <header>
      </header>
      <section>
        <div></div>
        <div>  
          <img src={dogImg} alt="이미지" style={{width: '50rem', height: '40rem'}}/>
          <div>
            <button onClick={()=> {
              axios({
                method: 'GET',
                url: 'https://dog.ceo/api/breeds/image/random'

              })
              .then((r)=> {
                // console.log();
                setDogImg(r.data.message)
              })
              .catch((e)=> {
                console.log(e);
              })
            }}>클릭</button>
          </div>
          <div></div>
        </div>
      </section>
      <footer>
      </footer>
    </div>
  )
}

export default Dog