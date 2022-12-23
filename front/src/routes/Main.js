import '../App.css';
import {Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'


function Main() {
  let navigate = useNavigate()
  return (
    <>
      <header>
        
      </header>
      <section>
        <div></div>
        <div id='content'>
          <div></div>
          <div>
            <ul>
              <li onClick={()=> {navigate('/login')}}>룓 로그인 하러가기 </li>
              <li onClick={()=> {navigate('/signup')}}>룓 회원가입 하러가기 </li>
              <li onClick={()=> {navigate('/dog')}}>룓 강아지 보러가기 </li>
              <li onClick={()=> {navigate('/cat')}}>룓 고양이 보러가기 </li>
              <li onClick={()=> {navigate('/article')}}>룓 게시글 보러가기 </li>
            </ul>
          </div>
          <div></div>
        </div>
        <div></div>
      </section>
      <footer>
        
      </footer>
    </>
  )
}

export default Main