import React, { useState } from 'react'
import './Admin.css'
import { NavLink, Redirect } from 'react-router-dom'


const AdminTrack = (props) => {
    //protected Route Logic
    const token = localStorage.getItem('token');
    console.log(token)
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/adminLogin" />
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(!login)

    }
    // 
    return (
        <div>

            <div className="Container">
                <div style={{ top: '12.5rem', left: '-5rem', position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                    <NavLink className="link" to='/viewLeaveReq'  >View Leave Request</NavLink>
                    <NavLink className="link" to='/employees' >Employees</NavLink>
                    <NavLink className="link" to="/editReq">Edit Requests</NavLink>
                </div>

                <h1 className="hp"> 'View Employees And Leave Requests If Any.' </h1>
                <button style={{ border: 'none', backgroundColor: 'green', color: '#fff', width: '150px', height: '50px', marginLeft: '100px' }} onClick={handleLogout}>LogOut</button>



            </div>
        </div>





    )

}

export default AdminTrack;