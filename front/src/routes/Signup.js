import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeToken } from "../store"
import {useNavigate} from 'react-router-dom'


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
      <li style={{cursor: 'pointer'}} onClick={()=> {navigate('/login')}}>룓 로그인 하러가기 </li>
      <div>
          <div><input type="text" placeholder={'ID'} onChange={(e)=> {
            setUsername(e.target.value)
          }}/></div>
          <div><input type="password" placeholder={'PWD'} onChange={(e)=> {
            setPassword1(e.target.value)
          }}/></div>
          <div><input type="password" placeholder={'PWD'} onChange={(e)=> {
            setPassword2(e.target.value)
          }}/></div>

        
          <button onClick={()=> {
            Promise.all([ 
              // 회원가입
              axios({
                method:'POST',
                url: `${site}/api/accounts/signup/`,
                data: {
                  'username': username,
                  'password1': password1,
                  'password2': password2
                }
              }),
              // 로그인
              axios({
                method:'POST',
                url: `${site}/api/accounts/login/`,
                data: {
                  'username': username,
                  'password': password1,
                }
              })
              .then((r)=> {
                alert('회원가입 성공')
                dispatch(changeToken(r.data.key))
                navigate('/')
              })
              .catch((e)=> {
                console.log(e);
              })
          ])
          }}>클릭</button>
      </div>
    </div>
  )
}
export default Signup