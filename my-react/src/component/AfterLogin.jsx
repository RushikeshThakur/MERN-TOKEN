import React, { Component } from 'react'

class AfterLogin extends Component {
    constructor(props){
        super(props);
        this.state={
            StudentName:"",
            StudentCollege:"",
            StudentUniversity:""
        }
    }

    // Method to add input text area to specific instance

    handleInput=(evt)=>{
       this.setState({[evt.target.name]: evt.target.value})
    }

    // Method to add Clearing the text area

    Clear=(evt)=>{
        this.setState({StudentName:"",StudentCollege:"",StudentUniversity:""})
    }

    // Method to add logout functionality

    logout=(evt)=>{
        sessionStorage.clear();
        this.props.history.push('/login');  
    }
    
    // Render Method
    
    render() {
        return (
            <center>
            <br/>
            <br/>
            <h1 style={{'font-weight': 'bold'}}>Student Application Form</h1>
            <br/>
            <br/>
        <div className="container">
            <div className="form-group">
                <h5 style={{'font-weight': 'bold'}}><strong>Student Name</strong></h5>
                <input type="text" name="StudentName" value={this.state.StudentName} onChange={this.handleInput.bind(this)} placeholder="Enter Student Name" className="form-control" style={{'width': '40%'}}/>
            </div>
            <div className="form-group">
                <h5 style={{'font-weight': 'bold'}}><strong>Student College</strong></h5>
                <input type="text" name="StudentCollege" value={this.state.StudentCollege} onChange={this.handleInput.bind(this)}  placeholder="Enter Student College" className="form-control" style={{'width': '40%'}}/>
            </div>
            <div className="form-group">
                <h5 style={{'font-weight': 'bold'}}><strong>Student University</strong></h5>
                <input type="text" name="StudentUniversity" value={this.state.StudentUniversity} onChange={this.handleInput.bind(this)}  placeholder="Enter Student University" className="form-control" style={{'width': '40%'}}/>
            </div>
            <div className="form-group">
                <input type="button"  value="Submit" onClick={this.Clear.bind(this)} className="btn btn-success"/>&nbsp;
                <input type="button"  value="Clear" onClick={this.Clear.bind(this)} className="btn btn-info"/>
            </div> 
            <br/>
            <br/>
            <input type="button" onClick={()=>this.logout()} value="Logout" className="btn btn-danger"/>
        </div>
        </center>
        )
    }
}

export default AfterLogin;