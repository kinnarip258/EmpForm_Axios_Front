import React, { useEffect, useState} from 'react'
import Axios from 'axios';
import "../form.css";
import {useHistory, NavLink} from "react-router-dom";
import {useFormik} from "formik";
import queryString from "query-string";

const EmployeeForm = () => {
    
    const history = useHistory();
    const [editedObject,setEditedObject ] = useState([]);
    const {id} = queryString.parse(window.location.search);
    const formik = useFormik({
        initialValues: {
            name:"", email:"", phone:"", profession:"", salary:"", password:""
        },

        onSubmit: (values) =>  {
            if(id){ 
                Axios.put(`/updateEmployee/${id}`, values)
                .then(() => {
                    history.push('/deshboard');
                })
                .catch(err => {
                    console.log("error: " + err)
                })
            }
            else{
                Axios.post(`/addEmployee`, values)
                .then(() => {
                    history.push('/deshboard');
                })
                .catch(err => {
                    console.log("error: " + err)
                })
            }
        }     
    });

    useEffect(() => {
        if(id) {
            Axios.get(`/getEmployee/${id}`)
            .then(res => {
                setEditedObject(res.data);
            })
            .catch(err => {
                console.log("error: " + err);
            })
        }
    }, [id]);

    useEffect(() => {
        if(id && editedObject) {
            formik.setValues(editedObject)
        }
    }, [editedObject])
    return (
        <div>
                <div className="header_div">
                    <h1>Employee Form</h1>
                </div>
                <div className="dashboard_div">
                    <NavLink to = "/Deshboard"> Dashboard </NavLink>
                </div>

             <div className="form_div">
                <form className="register_form" id="register_form" onSubmit={formik.handleSubmit}>
                    <label>Full Name </label> 
                    <input required onChange={formik.handleChange} value={formik.values.name}  name="name"  type='text' placeholder="Enter Full Name..." />
                                            
                    <label>Email ID </label>
                    <input required onChange={formik.handleChange} value={formik.values.email}  name="email"type='Email' placeholder="Enter Email ..." />

                    <label>Phone No. </label>
                    <input required onChange={formik.handleChange} value={formik.values.phone} name="phone" type='number' placeholder="Enter Phone ..." />

                    <label>Profession </label>
                    <input required onChange={formik.handleChange} value={formik.values.profession}  name="profession"  type='text' placeholder="Enter Profession ..." />

                    <label>Salary </label>
                    <input required onChange={formik.handleChange} value={formik.values.salary}  name="salary" type='number' placeholder="Enter Salary ..." />

                    <label>Password </label>
                    <input required onChange={formik.handleChange} value={formik.values.password}  name="password" type='Password' placeholder="Enter Password ..." />

                    <button type="submit">{!id ? "Register" : "Update" }</button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm
