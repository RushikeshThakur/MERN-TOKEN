import axios from "axios";
import React, { Component } from "react"

 class SecureCallService extends Component {
     constructor(){
        super();
        this.url =  'http://localhost:6070'
     }

     //code for hit api for registering the student

     register(student){
         let response = axios.post(`${this.url}/api/users/register`,
         student,{
            Headers:{
                'Content-type': 'application/json'
            }
        });
            return response;
     }
     
     // code for hit api for login verifiction
     
     login(student){
        let response = axios.post(`${this.url}/api/users/authuser`,
        student,{
            Headers:{
                'Content-type': 'application/json'
            }
        });
            return response;
     }

     // code to check a unique record 

     checkForUniqueId(EmailId)  {
        let response = axios.post(`${this.url}/api/users/uniqueId`,
        EmailId, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

}

export default SecureCallService;