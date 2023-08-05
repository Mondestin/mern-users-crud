import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faUserCheck } from '@fortawesome/free-solid-svg-icons'

function ProjecCreate() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')

    const [isSaving, setIsSaving] = useState(false)

    const navigate = useNavigate()

    const handleSave = () => {
        setIsSaving(true);
        axios.post('/api/users', {
            name: name,
            email: email,
            gender: gender,
            phone: phone
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'User saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setName('')
                setEmail('')
                setPhone('')
                setGender('')
                navigate('/');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(error)
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="row align-items-center justify-content-center w-auto">

                <div className="card mt-5 col-6" style={{ boxShadow: "0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)" }}>
                    <div className="card-header border-0">
                        <h4>New user
                            <Link
                                className="btn btn-primary mr-4"
                                to="/" style={{ float: "right" }}>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} /> retour
                            </Link>
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
                                    name="email" />
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
                                    name="phone"
                                    type="tel"
                                />
                            </div>
                            <div className="form-group p-2">

                                <span></span>
                                <button
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                                    className="btn btn-success ml-3">
                                    <FontAwesomeIcon icon={faUserCheck} />
                                    Save user
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjecCreate;