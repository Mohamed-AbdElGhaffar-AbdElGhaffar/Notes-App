import React, { useState } from 'react'
import style from '../Login/Login.module.css'
import email from '../../Assets/email.png'
import password from '../../Assets/password.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import {Helmet} from "react-helmet";

export default function Login() {
  let navigate = useNavigate()
  let [isLoading,setIsLoading] = useState(false);
  async function handleSubmit(values) {
    setIsLoading(true);
    let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.msg
      })
      setIsLoading(false);
    })
    setIsLoading(false);
    Swal.fire({
      icon: 'success',
      title: 'Congratulation',
      text: 'You loged in now',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.setItem("token",data.token)
    navigate("/")
  }

  let validationSchema = Yup.object({
    email:Yup.string().email("Email Format Notvalid").required("Email is Required"),
    password:Yup.string().min(3,"Password must be more than 3").max(15,"Password must be less than 15").required("Password is Required")
  })

  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    // // validate,
    validationSchema,
    onSubmit: handleSubmit
  })
  return <>
  <Helmet>
    <title>Note App - sign in</title>
  </Helmet>
  <div className="body">
    <div className="container-sign">
        <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="inputs">
            
            <div className={`input ${formik.touched.email? formik.errors.email ?( "false"):("true"):"" }`}>
                <img src={email} alt="email"/>
                <input type="email" placeholder="Email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                <div className={`${formik.touched.email?formik.errors.email? "wrong":"correct" :""}`}> <i className={`${formik.touched.email?formik.errors.email? "fa-solid fa-exclamation":"fa-solid fa-check" :""}`}></i> </div>
            </div>

            <div className={`input ${formik.touched.password? formik.errors.password ?( "false"):("true"):"" }`}>
                <img src={password} alt="password"/>
                <input type="password" placeholder="Password" name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                <div className={`${formik.touched.password?formik.errors.password? "wrong":"correct" :""}`}> <i className={`${formik.touched.password?formik.errors.password? "fa-solid fa-exclamation":"fa-solid fa-check" :""}`}></i> </div>
            </div>
          </div>
          <div className="forget-password">forget Password? <span>Click Here</span></div>
          <div className="submit-container">

            <Link to={"/Register"} className="submit gray">Sign Up</Link>

            {isLoading?<ColorRing
              visible={true}
              height="59px"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />:<button type='submit' className="submit">Login</button>
            }
          </div>
        </form>
        
        
      </div>
  </div>
  </>
}
