const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
// using jsonwebtoken package
const jwtoken = require('jsonwebtoken');
// sequelize objects
const { Sequelize } = require('sequelize');
// define express instance
const instance = express();
// configure middlewares with express
// for cors and bosyParser
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

// the object that will contains a signeture as random string
const jwtObject = {
    'jwtSecret': 'xyzprq00700qrpzyx'
}

// define a varible that will contains the Token on server
// globally
let globalTokan;


const DATABASE_NAME = "studentsrecord";
const USER = "root";
const PASSWORD =  "";
const PORT = 3306;
const HOST = "localhost";


const sequelize = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        idle: 10000
    },
    define: {
        timestamps: false // omit the createdAt and updatedAt columns
    }
});

// import the model class file
const users = sequelize.import('./models/users.js');


// get/get:id/post/put/delete HTTP utility methods


// this post method is responsible for a unique identify records

instance.post('/api/users/uniqueId', (request, response)=> {
    sequelize.sync({force: false})
    .then(() => 
        users.findByPk(request.body.EmailId)
    )
    .then((result) => {
        if(result === null) {
            response.json({
                statusCode: 404,
                data: `User Not Found`
            });
            response.end();
        }
        else {
            response.json({
                statusCode: 200,
                data: `User Found`
            });
            response.end();
        }
    })
    .catch((error) => {
        response.send({
            statusCode: 500,
            data: `Error Occured ${error}`
        });
        response.end();
    });
})


// post method to create student register

instance.post('/api/users/register', (request, response) => {
    sequelize.sync({ force: false })
        .then(() =>              
            users.create({
            EmailId: request.body.EmailId,
            Password: request.body.Password
        }))
        .then((result) => {            
            response.json({
                statusCode: 200,
                data: `User Created Successfully ${JSON.stringify(result.toJSON())}`
            });
            response.end();
        })
        .catch((error) => {
            response.send({
                statusCode: 500,
                data: `Error Occured ${error}`
            });
            response.end();
        });
});

// logic steps for creating Tokens based on User Identity
// 1. store the secret with express instance
// express instance will use the secret to 
// generate token whern user is authenticated
// verify token when user send toke in HTTP request
instance.set('jwtSecret', jwtObject.jwtSecret);
// 2. Authorize the user and generate token
instance.post('/api/users/authuser', (request, response) => {
    const authValue = {
        EmailId: request.body.EmailId,
        Password: request.body.Password
    };

    sequelize.sync({ force: false })
        .then(() => users.findByPk(authValue.EmailId))
        .then((result) => {
            console.log(JSON.stringify(result));
            // 2a. if user not found response the UnAuthorized
            if (result === null) {
                response.json({ statusCode: 401, data: `User Not Found` });
                response.end();
            } else {
                if (result.Password !== authValue.Password) {
                    response.json({ statusCode: 401, data: `Un-Authenticated response Password Does not match` });
                    response.end();
                } else {
                    // 2b. Logic for issuing the token
                    let accessToken = jwtoken.sign(result.toJSON(), instance.get('jwtSecret'), {
                        expiresIn: 3600 // token will expire in 3600 seconds
                    });
                    globalTokan = accessToken;
                    console.log(`Access Token ${accessToken}`);
                    // 2c. respond token to client
                    response.send({
                        statusCode: 200,
                        authenticated: true,
                        data: accessToken
                    });
                    response.end();
                }
            }

        }).catch((error) => {
            response.json({ statusCode: 401, data: `User Not Found ${error}` });
            response.end();
        });
});

function verifyToken(request)  {
    let token = request.headers.authorization.split(' ')[1];
    
    return new Promise((r,e) => {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
                // 3d. request failed because token verification failed
                console.log(decoded);
                if (err) {
                    e(err)
                } else {
                    r(decoded);
                }
        })
    });
}

// listenting on the port

instance.listen(6070, () => {
    console.log('Server is listening on port 6070');
})