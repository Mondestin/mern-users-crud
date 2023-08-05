import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

function ProjectShow() {
    const [id, setId] = useState(useParams().id)
    const [user, setUser] = useState({ name: '', email: '', gender: '', phone: '' })

    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="row align-items-center justify-content-center w-auto">

                <div className="card mt-5 col-6" style={{ boxShadow: "0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)" }}>
                    <div className="card-header">
                        <h4>User info
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
                        <b className="text-muted">Name:</b>
                        <p>{user.name}</p>
                        <b className="text-muted">Email:</b>
                        <p>{user.email}</p>
                        <b className="text-muted">Gender:</b>
                        <p>{user.gender}</p>
                        <b className="text-muted">Phone:</b>
                        <p>{user.phone}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectShow;