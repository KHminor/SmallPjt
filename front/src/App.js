import './App.css';
import Dog from './routes/Dog'
import Cat from './routes/Cat'
import {Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import React, {useState} from 'react'
function App() {
  let navigate = useNavigate()
  return (
    <div className="App">
      <header>
        
      </header>
      <section>
        <div></div>
        <div id='content'>
          <div></div>
          <div>
            <ul>
              <li onClick={()=> {navigate('dog/')}}>룓 강아지 보러가기 </li>
              <li onClick={()=> {navigate('cat/')}}>룓 고양이 보러가기 </li>
            </ul>
          </div>
          <div></div>
        </div>
        <div></div>
      </section>
      <footer>
        
      </footer>
      <Routes >
        <Route path='dog/' element={<><Dog /></>}/>
        <Route path='cat/' element={<><Cat /></>}/>
      </Routes>
    </div>
  );
}



export default App;
