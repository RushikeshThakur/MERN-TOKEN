import React, { Component } from 'react'
import SecureCallService from '../services/securecallservice';
import { Link } from 'react-router-dom';

class Login extends Component  {
    constructor(props)  {
        super(props);
        this.state = {
            EmailId: '',
            Password: '',
            emailError:"",
            PassError:"",
            uniqueUsername: ""
        };

        // Instance to call HTTP method

        this.serv = new SecureCallService();
    }

    // Method for accessing input text value to specific instance 

    handleInput=(evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }

    // Chunk of code for validation of email-id 

    InputValidationEmailId(){

        if(!this.state.EmailId.includes("@") || !this.state.EmailId.includes(".") || !this.state.EmailId.includes("com")){
                this.setState({emailError:"Invalid Email Format"})
         }
    }

    // Method clearing the text area

    Clear=(evt)=>{
        this.setState({EmailId:"",Password:""})
        this.setState({emailError:"",PassError:""})
    }

    // Making strong password using regular expression

    InputValidationPassword(){

         var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

         if(!reg.test(this.state.Password)){
             this.setState({PassError:"Weak Password"})    
         }else{
             // alert("Strong Password man...")
         }

    }

    // Method to add Logout functionality 

    logIn() {
        if(this.state.EmailId === '' || this.state.Password === '') {
            alert('All input fields are required');
            return;
        }

        if(this.state.uniqueUsername === false)  {
            alert('Cannot submit the data');
            return;
        }

        // Code hit to login api for Authorized user login

        const student = {
            EmailId: this.state.EmailId,
            Password: this.state.Password
        }
        
        console.log(JSON.stringify(student))

        this.serv.login(student)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
                sessionStorage.setItem('token', response.data.data);
                // alert("Login successfully...")
                this.props.history.push('/dashboard/AfterLogin');
            }
            else{
                alert('Unauthorized user');
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });

        // code for clearing the text filed after submitting form

        this.setState({EmailId:"",Password:""})
        this.setState({emailError:"",PassError:""})

    }

    // Render method

    render()    {
        return (  
            <center>
            <br/>
            <br/>
            <h1 style={{'font-weight': 'bold'}}>Login Portal</h1>
            <br/>
            <br/>
        <div className="container">
            <div className="form-group">
                <h5 style={{'font-weight': 'bold'}}><strong>Email-ID</strong></h5>
                <input type="text" value={this.state.EmailId} name="EmailId" placeholder="Enter Email-Id" className="form-control" onChange={(evt)=>this.setState({EmailId:evt.target.value})} onBlur={this.InputValidationEmailId.bind(this)}  style={{'width': '40%'}} required/>
                <p style={{color:"red", fontSize:"14px"}}>{this.state.emailError}</p> 
            </div>
            <div className="form-group">
            <h5 style={{'font-weight': 'bold'}}><strong>Password</strong></h5>
                <input type="password" value={this.state.Password} name="Password" placeholder="Enter password" className="form-control" style={{'width': '40%'}} onChange={(evt)=>this.setState({Password:evt.target.value})} onBlur={this.InputValidationPassword.bind(this)} required/>
                <p style={{color:"red", fontSize:"14px"}}>{this.state.PassError}</p>
            </div>
            <div className="form-group">
                <input type="button" onClick={()=>this.logIn()} value="Login" className="btn btn-success"/>&nbsp;
                <input type="button" onClick={()=>this.Clear()} value="Clear" className="btn btn-info"/>
            </div> 
            <div className="panel-footer">
               Don't have an account? <Link to='/register'>Register</Link>
           </div>   
        </div>
        </center>
        );
    }
}

export default Login;