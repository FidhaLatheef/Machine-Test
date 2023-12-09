import axios from 'axios';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast'
import { MDBInput } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../redux/userSlice';

function UpdateUser() {
    const { id } = useParams()
    const users = useSelector(state => state.users.users)
    const user = users.find(u => u._id === id)

    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState(user.address);
    const [password, setPassword] = useState(user.password);
    const [image, setImage] = useState(user.image);
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

    const handleUpdate = (e) => {
        e.preventDefault();

        if (name === '' || address === '' || password === '' || !image === '') {
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
            .put('http://localhost:8000/users/updateUser/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(function (response) {
                dispatch(updateUser({ id, formData }))
                navigate('/')

            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    setExist(true);
                    toast.error(error.response.data.exist)
                } else {
                    toast.error("An error occurred on the server")
                }
            });
    }

  return (
    <div>
      <Toaster />
      <section className="text-center text-lg-start">
        <div className="container py-4 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div
            className="card cascading-right"
            style={{
              background: 'hsla(0, 0%, 100%, 0.55)',
              backdropFilter: 'blur(30px)',
              maxWidth: '600px', 
              width: '100%',
            }}
          >
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Register</h2>
              <form>
                <div className="row">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <MDBInput label="Name" id='form1' type='text' name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fa-solid fa-address-book  fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <MDBInput label='Address' id='form1' type='text' name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <MDBInput label='Password' id='form1' type='password' name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-camera fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <MDBInput name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        placeholder="Image" id='form1' type='file' />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg mb-4"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateUser;
