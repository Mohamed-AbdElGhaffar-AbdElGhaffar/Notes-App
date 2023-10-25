import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import Delete from '../../Assets/delete.png'
import Swal from 'sweetalert2';

export default function Note({item,deleteNote,getAllNotes}){
    const [show, setShow] = useState(false);
    let [deleteBtn,setDeleteBtn] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function updateNote(values) {
        let {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${item._id}`,values,{
            headers:{
                token: `3b8ny__${localStorage.getItem("token")}`
            }
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.msg
            })
        })
        // console.log(data);
        Swal.fire({
            icon: 'success',
            title: 'Congratulation',
            text: 'Note Updated Successfully',
            showConfirmButton: false,
            timer: 1500
            })
        
        getAllNotes();
    }

    let validationSchema = Yup.object({
        title:Yup.string().max(15,"Max length is 15").min(3,"Min length is 3"),
        content:Yup.string().min(4,"Min length is 4")
    })

    const formik = useFormik({
        initialValues:{
          title:'',
          content:''
        },
        // // validate,
        validationSchema,
        onSubmit: updateNote
      })
    return <>
    
    <div className="input-box">
        <h1>{item.title}</h1>
        <p>{item.content}</p>
        <button onClick={()=>{
            setDeleteBtn(false)
            handleShow()
            }} className='Update'>Update</button>
        <img onClick={()=>{
            setDeleteBtn(true)
            handleShow()}} src={Delete} className='delete' alt="Delete"/>
    </div>
    {deleteBtn?
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this Note?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" onClick={()=>{
                deleteNote(item._id)
                handleClose()
                }}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
    :
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
            <input type="text" className='ModelInput' placeholder='Title' name='title' onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={item.title} />
            {formik.errors.title && formik.touched.title? <div className='error'>{formik.errors.title}</div>:""} 
            <textarea type="text" className='ModelTextarea' placeholder='Content' name='content' onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={item.content}></textarea>
            {formik.errors.content && formik.touched.content? <div className='error'>{formik.errors.content}</div>:""} 
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" onClick={()=>{
                formik.handleSubmit()
                handleClose()
                }}>
                Edit
            </Button>
        </Modal.Footer>
    </Modal>
    }
    </>
}