import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate,} from 'react-router-dom'
import {changeToken} from '../store'

function Login() {
  let dispatch = useDispatch()
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
          <div><input type="text" placeholder={'ID'} onChange={(e)=> {
            setUsername(e.target.value)
          }}/></div>
          <div><input type="password" placeholder={'PWD'} onChange={(e)=> {
            setPassword(e.target.value)
          }}/></div>

        
          <button onClick={()=> {
            axios({
              method:'POST',
              url: `${site}/api/accounts/login/`,
              data: {
                'username': username,
                'password': password,
              }
            })
            .then((r)=> {
              alert('로그인 성공')
              dispatch(changeToken(r.data.key))
              navigate('/')
            })
            .catch((e)=> {
              console.log(e);
            })
          }}>클릭</button>
      </div>
    </div>
  )
}
export default Login