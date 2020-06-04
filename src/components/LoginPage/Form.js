import React, { useState } from 'react'

import { Paper } from '@material-ui/core'
import Expand from './ForgetPassModal'
import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(24),
        marginLeft: theme.spacing(20),
        marginBottom: theme.spacing(14),
        borderRadius: '0.938rem',
        display: 'flex',
        justifyContent: 'space-around',

        width: '55%',
        height: '100%',


    },
    listContainer: {
        display: 'flex',
    },
    form: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column'
    }, label: {
        fontSize: '2.5rem',
        color: 'green',
        fontFamily: 'lato'
    },
    inp: {

        borderRadius: '0.313rem',
        border: '0.063rem solid green',
        height: '3.125rem',
        marginBottom: '10px'
    },
    bttn: {
        width: '100%',
        backgroundColor: 'green',
        color: '#eee',
        textDecoration: 'none',
        border: 'none',
        height: '3.125rem',
        borderRadius: '0.313rem',
        marginTop: theme.spacing(1)

    }, check: {
        width: '13px',
        height: '13px',
        padding: '0',
        margin: '0',
        verticalAlign: 'bottom',
        position: 'relative',
        top: '-1px',
        overflow: 'hidden'
    }

}));




const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //console.log(email);
    //console.log(password);

    const submithandle = (event) => {
        event.preventDefault();
        //console.log(email, password)
        var data = JSON.stringify({
            "email": email,
            "password": password
        });
        console.log(data);

        fetch('https://hrms-project.herokuapp.com/api/login', { method: 'post', body: data, headers: { "Content-Type": "application/json" } })
            .then(res => {
                console.log(res);
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {

                console.log(response);
                localStorage.setItem('token', response.token);
                //alert('Login Successsful');
                props.history.push('/track');
            })
            .catch(err => {
                console.log(err.message);
                if (err.message == 401) {
                    alert('wrong email or password');
                } else {
                    alert('Some error occurred. Try again later')
                }

            })


    }

    const classes = useStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (

        <Paper className={classes.root} elevation={6}>
            <Expand anchorEl={anchorEl} setAnchorEl={setAnchorEl} id={id} open={open} />
            <form onSubmit={submithandle} className={classes.form}>
                <label className={classes.label}>Login Id</label>
                <input className={classes.inp} type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label className={classes.label}>Pass word</label>
                <input className={classes.inp} type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <label style={{ display: 'block' }}>Remember me<input className={classes.check} type="checkbox" /></label>
                <button className={classes.bttn}>Submit</button>
                {/* <h3><a style={{ color: 'black' }} href="/forget">Reset Password</a></h3> */}
                <h3 onClick={handleClick}>Forgot Your PassWord??</h3>
            </form>
            <img alt="LoginLogo" src={require('../../assets/edunomics.png')} />

        </Paper>








    )

}

export default withRouter(LoginForm);




