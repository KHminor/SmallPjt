import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function Login() {
  let site = "http://127.0.0.1:8000"
  let navigate = useNavigate()
  let [username,setUsername] = useState()
  let [password,setPassword] = useState()
  let token = useSelector((state)=> {return state.token})
  useEffect(()=> {
    console.log(token.token.key);
  },[])
  return (
    <div style={{background:'black', height: '100vh', width:'100vw', color:'white'}}>
      Hi 여기는 로그인 페이지
      <div>
        {/* <form action="POST"> */}
          <div><input type="text" placeholder={'ID'} onChange={(e)=> {
            setUsername(e.target.value)
            console.log(username);
          }}/></div>
          <div><input type="password" placeholder={'PWD'} onChange={(e)=> {
            setPassword(e.target.value)
            console.log(password);
          }}/></div>

        
          <button onClick={()=> {
            console.log(username,password);
            axios({
              method:'POST',
              url: `${site}/api/accounts/login/`,
              data: {
                'username': username,
                'password': password,
              },
              headers: {
                Authorization: `Token ${token.token.key}` 
              }
            })
            .then((r)=> {
              alert('로그인 성공')
              console.log(r);
              navigate('/')
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
export default Login