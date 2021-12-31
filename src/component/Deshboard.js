import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import Axios from "axios";

const Deshboard = () => {

    const [searchData, setSearchData] = useState("");
    const [employeeList, setEmployeeList] = useState([]);
    const [tempList,setTempList] = useState([]);

    useEffect(() => {
        Axios.get(`/getEmployees`)
        .then((res) => {
            setEmployeeList(res.data)
        })
    }, [])

    const handleSearch = (searchEmployee) => {
        setEmployeeList(tempList.filter((ele) => ele.name === searchEmployee));      
    }

    const handleDelete = (id) => {
        Axios.delete(`/${id}`)

        .catch(err => {
            console.log("error" + err);
        })
    }

    return(
        <>
            <div className="main_div">
                <div className="header_div">
                    <h1>Employee Data</h1>
                </div>
                <div className="dashboard_div">
                    <NavLink to= "/">Register New Employee</NavLink>
                </div>

                <div className="allEmployeeList_div">
                    <button onClick={() =>{
                        Axios.get(`/getEmployees`)
                        .then((res) => {
                            setEmployeeList(res.data);
                            setTempList(res.data);
                        })
                    }}>Show All Employees</button>
                </div>
        
                <div className="search_div">
                    <input onChange={e => setSearchData(e.target.value)} value={searchData} placeholder="Search Employee..."/>
                    <button onClick={() => {handleSearch(searchData,setSearchData(""))}}>Search</button>
                </div>

                <hr />
                <div className="data_index">
                    <table style={{"width" : "100%"}}>
                        <tr>
                            <th>Employee_id</th>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Phone</th>
                            <th>Profession</th>
                            <th>Salary</th>
                            <th>Password</th>
                        </tr>
                    </table>

                </div>

                <div className="show_data">
                    {
                        employeeList.map((ele) => {
                            return(
                                <div className = "eachitem" key = {ele.id}>
                                    <table style={{"width" : "100%"}}>
                                        <tr>
                                            <td>{ele._id}</td>
                                            <td>{ele.name}</td>
                                            <td>{ele.email}</td>
                                            
                                            <td>{ele.phone}</td>
                                            <td>{ele.profession}</td>
                                            <td>{ele.salary}</td>
                                            <td>{ele.password}</td>
                                            <NavLink to={`/editEmployee/:?id=${ele._id}`}><button>Edit</button></NavLink>
                                            <td><button onClick={() => handleDelete(ele._id)}>Delete</button></td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Deshboard;