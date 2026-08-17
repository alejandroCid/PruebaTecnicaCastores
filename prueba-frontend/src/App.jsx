import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";

function App() {

  return (
    <>
      <div className={''}>
        <Header></Header>  
      </div>
      <div>
        <Outlet/>
      </div>
    </>

  )
}

export default App
