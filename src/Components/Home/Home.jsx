import React, { useEffect, useState } from 'react'
import style from '../Home/Home.module.css'
import notes from '../../Assets/notes.png'
import edit from '../../Assets/edit.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import Swal from 'sweetalert2'
import { ColorRing } from 'react-loader-spinner'
import Note from '../Note/Note'
import { useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";


export default function Home() {
  let navigate = useNavigate();
  const [Notes,setNotes] = useState([])
  let [isLoading,setIsLoading] = useState(false);
  async function addNote(values) {
    setIsLoading(true);
    // console.log(values);
    let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values,{
      headers:{
        token: `3b8ny__${localStorage.getItem("token")}`
      }
    }).catch((err)=>{
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.msg
      })
      
      setIsLoading(false);
    })
    setIsLoading(false);
    // console.log(data);
    Swal.fire({
      icon: 'success',
      title: 'Congratulation',
      text: 'Note Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    getAllNotes();
    document.querySelector("input").value = "";
    document.querySelector("textarea").value = "";
  }

  async function getAllNotes() {
    try {
      let {data} = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
        headers:{
          token: `3b8ny__${localStorage.getItem("token")}`
        }
      })
      setNotes(data.notes)
    } catch (err) {
      // console.log(err);
      if (err.response.data.msg != "not notes found") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.msg
        })
      }else{
        setNotes([])
      }
    }
    
  }

  async function deleteNote(id) {
    let {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{
      headers:{
        token: `3b8ny__${localStorage.getItem("token")}`
      }
    }).catch((err)=>{
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.msg
      })
    })
    // console.log(data);
    Swal.fire({
      icon: 'success',
      title: 'Note Deleted Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    getAllNotes();
  }

  function logout() {
    localStorage.removeItem('token')
    navigate('/Login')
  }

  let validationSchema = Yup.object({
    title:Yup.string().required("Title is Required").max(15,"Max length is 15").min(3,"Min length is 3"),
    content:Yup.string().min(4,"Min length is 4").required("Content is Required")
  })
  const formik = useFormik({
    initialValues:{
      title:'',
      content:''
    },
    // // validate,
    validationSchema,
    onSubmit: addNote
  })
  useEffect(()=>{
    getAllNotes();
  },[])
  // console.log(Notes);
  return <>
  <Helmet>
    <title>Note App</title>
  </Helmet>
  <div className='Home'>
    <div className='Logout-button'>
      <button onClick={()=>logout()} className='Logout'>Logout<i className="fa-solid fa-right-from-bracket"></i></button>
    </div>
    <div className="container">
      <div className='Title'>
        <h1> <img src={notes} alt="Notes"/> Notes</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" placeholder='Title' name='title' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.title && formik.touched.title? <div className='error'>{formik.errors.title}</div>:""} 
        <textarea type="text" placeholder='Content' name='content' onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
        {formik.errors.content && formik.touched.content? <div className='error'>{formik.errors.content}</div>:""} 
        {isLoading?<div className='MarginAuto'>
          <ColorRing
                visible={true}
                height="59px"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
              </div>:<button type='submit' className='button'><img src={edit} alt="Edit"/>Add Notes</button>
              }
      </form>
      
      <div className="notes-container">
        
        {Notes.length>0?  Notes.map((item)=>(
          <Note key={item._id} item ={item} deleteNote={deleteNote} getAllNotes={getAllNotes}/>
        ))
        
        :""}
      </div>
    </div>
  </div>
  
  
  
  </>
}
