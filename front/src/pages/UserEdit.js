import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faUserCheck } from '@fortawesome/free-solid-svg-icons'

function ProjectEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(function (response) {
                let project = response.data
                setName(project.name)
                setEmail(project.email)
                setGender(project.gender);
                setPhone(project.phone);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])


    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/api/users/${id}`, {
            name: name,
            email: email,
            gender: gender,
            phone: phone
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'User updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                navigate('/');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }


    return (
        <Layout>
            <div className="row align-items-center justify-content-center w-auto">

                <div className="card mt-5 col-6" style={{ boxShadow: "0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)" }}>
                    <div className="card-header border-0">
                        <h4>Edit user
                            <div className="card-tools" style={{ float: "right" }}>

                                <Link
                                    className="btn btn-primary mr-4"
                                    to="/">
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} /> retour
                                </Link>
                            </div>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value) }}
                                    className="form-control"
                                    id="email"
                                    rows="3"
                                    name="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Gender">Gender</label>
                                <select
                                    value={gender}
                                    onChange={(event) => { setGender(event.target.value) }}
                                    className="form-control"
                                    id="gender"
                                    name="gender">
                                    <option>Select gender</option>
                                    <option value={"Male"}>Male</option>
                                    <option value={"Female"}>Female</option>
                                    <option value={"Others"}>Others</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    value={phone}
                                    onChange={(event) => { setPhone(event.target.value) }}
                                    className="form-control"
                                    id="phone"
                                    rows="3"
                                    name="phone"/>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-success mt-3">
                                     <FontAwesomeIcon icon={faUserCheck} />
                                Update user
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectEdit;