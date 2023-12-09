import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import {  getUser } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function ListUsers() {
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/users/userList")
                console.log(response);
                dispatch(getUser(response.data));
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [dispatch])

    const handleAdd = async () => {
        window.location.href = '/create-user'
    }


    return (
        <div style={{ backgroundColor: "#e6e6e6" }} className='d-flex vh-100 justify-content-center align-items-center'>
            <div className='w-70 bg-white rounded p-3'>
                <button onClick={handleAdd} className='btn btn-success'>Add +</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='fw-bold' scope="col">Image</th>
                            <th className='fw-bold' scope="col">Name</th>
                            <th className='fw-bold' scope="col">Address</th>
                            <th className='fw-bold' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                    <tr key={user._id}>
                                        <td>   <img
                                            src={`http://localhost:8000/${user.image}`}
                                            alt={user.name}
                                            className="rounded-circle"
                                            width="50"
                                            height="50"
                                        /></td>
                                        <td>{user.name}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                            <Link to={`/update-user/${user._id}`} className='btn btn-warning'>Update</Link>
                                            <button  className='btn btn-danger'>Delete</button>
                                                
                                            </div>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListUsers
