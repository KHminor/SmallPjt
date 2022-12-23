import './App.css';
import Main from './routes/Main'
import Dog from './routes/Dog'
import Cat from './routes/Cat'
import Article from './routes/Article'
import Login from './routes/Login';
import Signup from './routes/Signup';
import {Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import React, {useState} from 'react'
function App() {
  let navigate = useNavigate()
  return (
    <div className="App">
      
      <Routes >
        <Route path='/' element={<><Main /></>}/>
        <Route path='signup/' element={<><Signup /></>}/>
        <Route path='login/' element={<><Login /></>}/>
        <Route path='dog/' element={<><Dog /></>}/>
        <Route path='cat/' element={<><Cat /></>}/>
        <Route path='article/' element={<><Article /></>}/>
      </Routes>
    </div>
  );
}



export default App;
