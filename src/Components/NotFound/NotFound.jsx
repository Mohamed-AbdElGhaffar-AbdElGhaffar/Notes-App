import React from 'react'
import style from '../NotFound/NotFound.module.css'
import Notfound from '../../Assets/NotFound.png'
import {Helmet} from "react-helmet";

export default function NotFound() {
  return <>
  <Helmet>
    <title>NotFound</title>
  </Helmet>
  <div className='body'>
    <img className={style.image} src={Notfound} alt="Notfound" />
  </div>
    

  </>
}
