import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeToken } from "../store"
import {Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'


function Signup() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let site = "http://127.0.0.1:8000"
  let [username,setUsername] = useState()
  let [password1,setPassword1] = useState()
  let [password2,setPassword2] = useState()
  return (
    <div style={{background:'black', height: '100vh', width:'100vw', color:'white'}}>
      Hi 여기는 Signup페이지
      <li onClick={()=> {navigate('/login')}}>룓 로그인 하러가기 </li>
      <div>
        {/* <form action="POST"> */}
          <div><input type="text" placeholder={'ID'} onChange={(e)=> {
            setUsername(e.target.value)
            console.log(username);
          }}/></div>
          <div><input type="password" placeholder={'PWD'} onChange={(e)=> {
            setPassword1(e.target.value)
            console.log(password1);
          }}/></div>
          <div><input type="password" placeholder={'PWD'} onChange={(e)=> {
            setPassword2(e.target.value)
            console.log(password2);
          }}/></div>

        
          <button onClick={()=> {
            console.log(username,password1,password2);
            axios({
              method:'POST',
              url: `${site}/api/accounts/signup/`,
              data: {
                'username': username,
                'password1': password1,
                'password2': password2
              }
            })
            .then((r)=> {
              dispatch(changeToken(r.data))
              navigate('/login')
              console.log(r.data);
            })
            .catch((e)=> {
              console.log(e);
            })
          }}>클릭</button>
        {/* </form> */}
      </div>
    </div>
  )
}
export default Signup