const { rejects } = require("assert");
const http = require("http");
const { resolve } = require("path");
const { Pool } = require('pg');
const { json } = require("stream/consumers");


const pool = new Pool({
    user:'hoangduy',
    host:'localhost',
    database:'test',
    password:'12345678',
    port:5432
});

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            resolve(JSON.parse(data));
        });
        req.on('error', reject);
    });
};

// tao server http

const server = http.createServer( async (req, res) => {
    const { method, url } = req;
    res.setHeader('Content-type', "application/json");
    try{
        if(url === '/api/users' && method === 'GET'){
            const result = await pool.query('Select * from users');
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        }else if(url === '/api/users' && method === 'POST'){
            const data = await getRequestBody(req);
            const {username} = data;
            if(!username){
                res.writeHead(400);
                res.end(JSON.stringify({error:"Username is required"}));
            }
            const result = await pool.query('Insert into users(username) values($1) returning *',[username])
            console.log(result)
            res.writeHead(201);
            res.end(JSON.stringify(result.rows[0]));

        }else if(url.match(/\/api\/users\/(\d+)/) && method === 'PUT'){
            const match = url.match(/\/api\/users\/(\d+)/); 
            const id = match ? match[1] : null;  
            if(!id){
                res.writeHead(400);
                res.end(JSON.stringify({error: 'Invalid user ID'}));
                return;

            }
            console.log(id)
            const data  = await getRequestBody(req);
            const {username} = data;
            const result = await pool.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [username, id]);

            if(result.rowCount === 0){
                res.writeHead(400);
                res.end(JSON.stringify({error: 'User not found'}));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(result.rows[0]));
            }
        }else if(url.match(/\/api\/users\/(\d+)/) && method === 'DELETE'){
            const match = url.match(/\/api\/users\/(\d+)/); 
            const id = match ? match[1] : null;  
            if(!id){
                res.writeHead(400);
                res.end(JSON.stringify({error: 'Invalid user ID'}));
                return;

            }
            const result = await pool.query('delete from users where id = $1 RETURNING *', [ id]);

            if(result.rowCount === 0){
                res.writeHead(400);
                res.end(JSON.stringify({error: 'User not found'}));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify({message:'deleted successfuly'}));
            }
        }
    }catch (error){
        if(error.code === '23505'){
            res.writeHead(409);
            res.end(JSON.stringify({error:"Username already exists!"}))
        }else{
            console.error(error);
            res.writeHead(500);
            res.end(JSON.stringify({error:'Tnternal Server Error'}));
        }
        
    }
});

server.listen(8000,() =>{
    console.log("Server is running on port 8000");

});