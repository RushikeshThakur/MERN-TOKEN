import React, { Component } from 'react'
import SecureCallService from '../services/securecallservice';

class Registration extends Component  {
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

    // Method to add logout functionality

    logout=(evt)=>{
        sessionStorage.clear();
        this.props.history.push('/login');  
    }

    // Code hit the HTTP Api for check unique record validation

    checkForUniqueID(evt)  {

        // alert("Check for unique")

        let EmailId = {
            EmailId: evt.target.value
        }
  
        console.log(JSON.stringify(EmailId))

        this.serv.checkForUniqueId(EmailId)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
            console.log(JSON.stringify(response.data));
            this.setState({uniqueUsername: "Record Already Exist"});
            }
            else{
                this.setState({uniqueUsername: ""});
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
    }

    // making strong password using regular expression

    InputValidationPassword(){

         var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

         if(!reg.test(this.state.Password)){
             this.setState({PassError:"Weak Password"})
             return 0;    
         }else{
             // alert("Strong Password man...")
         }

    }

    // Method for save  functionality

    handleSave(evt)    {
        if(this.state.EmailId === '' || this.state.Password === '') {
            alert('All input fields are required');
            return;
        }

        let student = {
            EmailId: this.state.EmailId,
            Password: this.state.Password
        };

       console.log(JSON.stringify(student));

  // Sync method used to access a response data from the restapitoken

        this.serv.register(student)
        .then((response)=>{
            // alert(`User created successfully ${response.data.data}`)
        }).catch((error)=>{
            console.log(error);
        });  

        // Code for clearing the text filed after submitting form

        this.setState({EmailId:"",Password:""})
        this.setState({emailError:"",PassError:""})
    }

    // Method to clear the text field

    handleClear(){
        this.setState({'EmailId':'',Password:""})
        this.setState({emailError:"",PassError:"",uniqueUsername:""})
    }

    render()    {
        return (  
            <center>
            <br/>
            <br/>
            <h1 style={{'font-weight': 'bold'}}> Student Registration Portal </h1>
            <br/>
            <br/>
        <div className="container">
            <div className="form-group">
                <h5 style={{'font-weight': 'bold'}}><strong>Email-ID</strong></h5>
                <input type="text" value={this.state.EmailId} name="EmailId" placeholder="Enter Email-Id" className="form-control" onChange={(evt)=>this.setState({EmailId:evt.target.value})} onBlur={this.checkForUniqueID.bind(this)} style={{'width': '40%'}} required/>
                <p style={{color:"red", fontSize:"14px"}}>{this.state.emailError}</p>
                {/* // The uniqueUsername will print when it set to true for validation purposes */}
                <p style={{color:"red", fontSize:"14px"}}>{this.state.uniqueUsername}</p>
            </div>
            <div className="form-group">
            <h5 style={{'font-weight': 'bold'}}><strong>Password</strong></h5>
                <input type="password" value={this.state.Password} name="Password" placeholder="Enter password" className="form-control" style={{'width': '40%'}} onChange={(evt)=>this.setState({Password:evt.target.value})} onBlur={this.InputValidationPassword.bind(this)} required/>
                <p style={{color:"red", fontSize:"14px"}}>{this.state.PassError}</p>
            </div>
            <div className="form-group">
                <input type="button" onClick={()=>this.handleSave()} value="Submit" className="btn btn-success"/>&nbsp;
                <input type="button" onClick={()=>this.handleClear()} value="Clear" className="btn btn-info"/>
            </div> 
            <br/>
            <br/>
            <input type="button" onClick={()=>this.logout()} value="Logout" className="btn btn-danger"/>
        </div>
        </center>
        );
    }
}

export default Registration;