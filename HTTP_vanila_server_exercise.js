// Exercise_1:

import http from "http";

const PORT = 3000;

const hour = new Date().getHours();

const server = http.createServer((req, res) => {
    if (hour < 18){
        res.end("Good Morning")
    }else{
        res.end("Good Eveninig")
    }

    res.end("Hello from my server");
});

server.listen(PORT , () => {
    console.log(`server running on port http://localhost:${PORT}`);
});

// Exercise_2:

// import http from "http";

// const PORT = 3000

// const server = http.createServer((req, res) => {
//      if (req.url === "/" && req.method === "GET"){
//         res.end("Home Page");
//      } else if (req.url === "/about" && req.method === "GET"){
//         res.end("About Page");
//      }else if (req.url === "/contact") {
//         res.end("Contact Page");
//      } else {
//         res.statusCode = 404;
//         res.end("Page Not Found");
//      }
// });

// server.listen(PORT, () => {console.log(` Server running on http://localhost:${PORT}`)})

// Exercise_3:

// import http from "http";

// const PORT = 3000

// const server = http.createServer((req, res) => {
//     if (req.method !== "GET" || req.method !== "POST"){
//         res.end("Method Not Allowed");
//     }
//     else if (req.url === "/users" && req.method === "GET"){
//         res.end("Users list");
//     }else if (req.url === "/users" && req.method === "POST"){
//         res.end("User created");
//     }else {
//         res.statusCode = 404
//         res.end("Page Not Found");
//     }
// });

// server.listen(PORT, () => {console.log(` Server running on http://localhost:${PORT}`)})

