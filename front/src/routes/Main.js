import '../App.css';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


function Main() {
  let a = useSelector((state)=> {return state.token})
  let navigate = useNavigate()
  useEffect(()=> {
    
    console.log(a);
  },[])
  return (
    <>
      <header>
        
      </header>
      <section>
        <div></div>
        <div id='content'>
          {
            a.token ? 
            <>
              <div></div>
              <div>
                <ul>
                  <li onClick={()=> {navigate('/dog')}}>룓 강아지 보러가기 </li>
                  <li onClick={()=> {navigate('/cat')}}>룓 고양이 보러가기 </li>
                  <li onClick={()=> {navigate('/article')}}>룓 게시글 보러가기 </li>
                  <li onClick={()=> {navigate('/article_create')}}>룓 게시글 작성 </li>
                </ul>
              </div>
              <div></div>
            </> 
            : 
            <> 
              <div></div>
              <div>
                <ul>
                  <li onClick={()=> {navigate('/login')}}>룓 로그인 하러가기 </li>
                  <li onClick={()=> {navigate('/signup')}}>룓 회원가입 하러가기 </li>
                </ul>
              </div>
              <div></div>
            </>
          }
        </div>
        <div></div>
      </section>
      <footer>
        
      </footer>
    </>
  )
}

export default Main