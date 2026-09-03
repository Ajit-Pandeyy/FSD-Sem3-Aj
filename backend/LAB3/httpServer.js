import http from 'http';
const messages = [];
const userData=[];

const server = http.createServer((req, res) => {
    const url=req.url;
    const method=req.method;
    if(url=="/msg" && method=="GET"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World Successful\n');
    }else if(url.startsWith("/users/") && method=="GET"){
        const id=url.split("/")[2];
        const user=userData.find((u)=> u.id==id);
        if(!user){
            return res.end("User not found");
        }
    }else if(url=="/create" && method=="POST"){
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        });
        req.on("end",()=>{
            const data=JSON.parse(body);
            const newUser={
                id: data.id,
                name: data.name,
                email: data.email
            };
            userData.push(newUser);
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('User created successfully\n');
        });
    }else if(url.startsWith("/delete/") && method=="DELETE"){
        const id=url.split("/")[2];
        const index=userData.findIndex((u)=> u.id==id);
        if(index==-1){
            return res.end("User not found");
        }
        userData.splice(index,1);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('User deleted successfully\n');
    }
});

const port = 3000;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}/`); 
});