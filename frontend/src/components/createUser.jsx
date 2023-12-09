
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addUser } from '../redux/userSlice';

function CreateUser() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [fieldRequired, setFieldRequired] = useState(false);
    const [exist, setExist] = useState(false);
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    function isPasswordValid(password) {
      if (password.length < 8) {
        return 'Password should be at least 8 characters long';
      }
  
      if (!/\d/.test(password)) {
        return 'Password should contain at least one numeric digit';
      }
  
      if (!/[!@#$%^&*]/.test(password)) {
        return 'Password should contain at least one special character (!@#$%^&*)';
      }
  
      return null;
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (name === '' || address === '' ||  password === '' || !image === '') {
        setFieldRequired(true);
        toast.error('Please enter all fields')
        return;
      }
  
      const passwordError = isPasswordValid(password);
      if (passwordError) {
        toast.error(passwordError);
        return;
      }
  
      const formData = new FormData();
  
      formData.append("name", name);
      formData.append("address", address);
      formData.append("password", password);
      formData.append("image", image);
  
      axios
        .post('http://localhost:8000/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(function (response) {
          dispatch(addUser(response.data))
          navigate('/')
  
        })
        .catch(function (error) {
          console.log(error);
          if (error.response && error.response.status === 400) {
            setExist(true);
            toast.error(error.response.data.exist)
          } else {
            console.log(error)
            toast.error("An error occurred on the server")
          }
        });
    }
  return (
    <>
     <Toaster />
    <div style={{ backgroundColor: "#e6e6e6" }} className='d-flex vh-100 justify-content-center align-items-center'> 
      <div  className='w-50 bg-white rounded p-3'>
      <form onSubmit={handleSubmit}>
            <h2 className="text-center">Create User</h2>
            <div className='mb-2'>
              <label htmlFor='name'>Name: </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control" />
            </div>
            <div className='mb-2'>
              <label htmlFor='address'>Address: </label>
              <input
                type='text'
                id='address'
                name='address'
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor='password'>Password: </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='name'>Image: </label>
              <input
                type='file'
                id='image'
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control" />
            </div>
            <div className='mb-2 mt-2 text-center'> 
          <button type='submit' className='btn btn-primary'>Create</button>
        </div>

          </form>

      </div>
    </div> 
    </>
  )
}

export default CreateUser
