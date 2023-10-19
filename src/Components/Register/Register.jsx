import React, { useState } from 'react'
import style from '../Register/Register.module.css'
import person from '../../Assets/person.png'
import email from '../../Assets/email.png'
import password from '../../Assets/password.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import {Helmet} from "react-helmet";

export default function Register() {
  let navigate = useNavigate()
  let [isLoading,setIsLoading] = useState(false);
  async function handleSubmit(values) {
    setIsLoading(true);
    let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,values).catch((err)=>{
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
      text: 'You are registered successfully, go to login now',
      showConfirmButton: false,
      timer: 1500
    })
    navigate("/login")
  }

  const phoneRegx = /^01[0125][0-9]{8}$/gm;
  let validationSchema = Yup.object({
    name:Yup.string().min(3,"Name must be more than 3").max(15,"Name must be less than 15").required("Name is Required"),
    email:Yup.string().email("Email Format Notvalid").required("Email is Required"),
    phone:Yup.string().matches(phoneRegx,"Mobile is Notvalid").required("Mobile is Required"),
    age:Yup.number().min(18,"you should at least 18 years old").max(80,"max age is 80 years old").required("Mobile is Required"),
    password:Yup.string().min(3,"Password must be more than 3").max(15,"Password must be less than 15").required("Password is Required")

  })

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      age:'',
      password:''
    },
    // // validate,
    validationSchema,
    onSubmit: handleSubmit
  })
  return <>
  <Helmet>
    <title>Note App - sign up</title>
  </Helmet>
  <div className="body">
    <div className="container-sign">
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="inputs">
            
            <div className={`input ${formik.touched.name? formik.errors.name ?( "false"):("true"):"" }`}>
                <img src={person} alt="person"/>
                <input type="text" placeholder="Name" name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                <div className={`${formik.touched.name?formik.errors.name? "wrong":"correct" :""}`}> <i className={`${formik.touched.name?formik.errors.name? "fa-solid fa-exclamation":"fa-solid fa-check" :""}`}></i> </div>
                
            </div>

            <div className={`input ${formik.touched.email? formik.errors.email ?( "false"):("true"):"" }`}>
                <img src={email} alt="email"/>
                <input type="email" placeholder="Email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                <div className={`${formik.touched.email?formik.errors.email? "wrong":"correct" :""}`}> <i className={`${formik.touched.email?formik.errors.email? "fa-solid fa-exclamation":"fa-solid fa-check" :""}`}></i> </div>
            </div>

            <div className={`input ${formik.touched.phone? formik.errors.phone ?( "false"):("true"):"" }`}>
                <i className="fa-solid fa-phone"></i>
                <input type="tel" placeholder="Phone" name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
                <div className={`${formik.touched.phone?formik.errors.phone? "wrong":"correct" :""}`}> <i className={`${formik.touched.phone?formik.errors.phone? "fa-solid fa-exclamation":"fa-solid fa-check" :""}`}></i> </div>
            </div>

            <div className={`input ${formik.touched.age? formik.errors.age ?( "false"):("true"):"" }`}>
                <i className="fa-solid fa-person-cane"></i>
                <input type="text" placeholder="Age" name='age' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age}/>
                <div className={`${formik.touched.age?formik.errors.age? "wrong":"correct" :""}`}> <i className={`${formik.touched.age?formik.errors.age? "fa-solid fa-exclamation":"fa-solid fa-check" :""}`}></i> </div>
            </div>

            <div className={`input ${formik.touched.password? formik.errors.password ?( "false"):("true"):"" }`}>
                <img src={password} alt="password"/>
                <input type="password" placeholder="Password" name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                <div className={`${formik.touched.password?formik.errors.password? "wrong":"correct" :""}`}> <i className={`${formik.touched.password?formik.errors.password? "fa-solid fa-exclamation":"fa-solid fa-check" :""}`}></i> </div>
            </div>
          </div>
          <div className="submit-container">
            
              {isLoading?<ColorRing
                visible={true}
                height="59px"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />:<button type='submit' className="submit">Sign Up</button>
              }
            
            <Link to={"/login"} className="submit gray">Login</Link>
          </div>
        </form>
        
        
      </div>
  </div>
  </>
}
