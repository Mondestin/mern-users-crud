import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'


function ProjectList() {
    const [userList, setUserList] = useState([])

    const imageStyle = {
        borderRaduis: "50%",
        width: "42px"
      };

    useEffect(() => {
        fetchUsersList()
    }, [])

    const fetchUsersList = () => {
        axios.get('/api/users')
            .then(function (response) {
                setUserList(response.data);
                console.log(response.data.id)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/users/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'User deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchUsersList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(error)
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container m-5">
                <div className="card" style={{ boxShadow: "0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)" }}>
                    <div className="card-header border-0">
                        <h4>Liste of users

                            <div className="card-tools" style={{ float: "right" }}>

                                <Link
                                    className="btn btn-success btn-tool"
                                    to="/create">
                                    <FontAwesomeIcon icon={faUserPlus} /> add new user
                                </Link>
                            </div>
                        </h4>
                    </div>
                    <div className="card-body table-responsive p-1">

                        <table className="table table-striped table-valign-middle">
                            <thead>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Phone</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((user, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>
                                                <img src="https://p1.hiclipart.com/preview/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clipart.jpg" alt="Product 1" className="img-circle mr-2" style={imageStyle}/>
                                                    
                                            </td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${user.id}`}
                                                    className="btn btn-info mx-1 text-white">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                                <Link
                                                    className="btn btn-warning mx-1 text-white"
                                                    to={`/edit/${user.id}`}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn btn-danger mx-1">

                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectList;