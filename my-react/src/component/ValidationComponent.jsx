import React, { Component } from 'react'

class ValidationComponent extends Component {
     constructor(props){
         super(props);
         this.state={
            setEmaiId: true,
            setStudentName: true,
            setStudentSurname: true,
            setFees: true
         }
     }

     validateForm(name, value){
          if(name === "StudentName"){
            if(value.length > 20 || !value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value !== ''){
                if(false !== this.state.setStudentName)   {
                    this.setState({setStudentName: false});
                }
            }else{
                if(true !== this.state.setStudentName)    {
                    this.setState({setStudentName: true});
                }
            }
            
          }

          if(name === "StudentSurname"){
            if(value.length > 20 || !value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value !== ''){
                if(false !== this.state.setStudentSurname)   {
                    this.setState({setStudentSurname: false});
                }
            }else{
                if(true !== this.state.setStudentSurname)    {
                    this.setState({setStudentSurname: true});
                }
            }
            
          }

          if(name === 'Fees') {
            if(!value.toString().match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")) {
                if(false !== this.state.setFees)  {
                    this.setState({setFees: false})
                }
            }
        }else{
            if(true !== this.state.setFees)  {
                this.setState({setFees: true})
            }
        }

        // if(name === 'EmailId') {
        //     if(!(value.includes("@") || value.includes(".") || value.includes("com"))) {
        //         if(this.state.setEmaiId !== false)    {
        //             this.setState({setEmaiId: false});
        //         }
        //     }
        // }else{
        //     if(this.state.setEmaiId !== true) {
        //         this.setState({setEmaiId: true});
        //     }
        // }


     }

    render() {
            this.validateForm(this.props.name,this.props.data);
            if(this.props.name === 'EmailId') { 
                return (
                    <div hidden={this.state.setEmaiId} className="alert alert-danger" style={{'width': '25%'}}>Email Id should be greater than 5 and it must containe @ symbol </div>
                );
            }
            if(this.props.name === 'Password') { 
                return (
                    <div hidden={this.state.Password} className="alert alert-danger" style={{'width': '25%'}}>Password should be strong</div>
                );
            }

    }
}

export default ValidationComponent;