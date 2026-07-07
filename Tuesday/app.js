import http from "http";

const users = [
    {
        id: 1,
        username: "alice"
    },
    {
        id: 2,
        username: "bob"
    },
    {
        id: 3,
        username: "charlie"
    },
    {
        id: 4,
        username: "david"
    },
    {
        id: 5,
        username: "emma"
    },
    {
        id: 6,
        username: "frank"
    },
    {
        id: 7,
        username: "grace"
    },
    {
        id: 8,
        username: "henry"
    },
    {
        id: 9,
        username: "isabella"
    },
    {
        id: 10,
        username: "jack"
    }
];

const PORT = 3000

const server = http.createServer((req, res) => {

    if (req.url === "/users" && req.method.toLowerCase() === "get") {
        console.log("GET/users");
        return res.end(JSON.stringify(users));
    }

    else if (req.url.startsWith("/users?") && req.method.toLowerCase() === "get") {
        console.log("GET/users?username=name");

        const paths = new URL(req.url, "http://localhost").searchParams
        const username = paths.get("username");
        const id = paths.get("id");
        console.log(id);
        console.log(username);
        const user = users.find((user) => { return user.username === username && user.id === +id })

        if (!user) {
            res.statusCode = 404;
            return res.end("User not found!");
        };

        return res.end(JSON.stringify({
            username: user
        }));
    }

    else if (req.url.startsWith("/users/") && req.method.toLowerCase() === "get") {
        console.log("GET/users/id");

        const path = req.url.split("/");
        if (path.length !== 3 || isNaN(+path[2])) {
            console.log("The path is wrong");
            res.statusCode = 400;
            return res.end("Invalid path");
        };

        const id = path[2];

        const userID = users.find((user) => { return user.id === +id });
        console.log(userID);

        if (!userID) {
            console.log("Not found");
            res.statusCode = 404;
            return res.end(`user with the id ${id} is not found`);
        };

        return res.end(JSON.stringify(userID.username));
    }

    else if (req.url === "/users" && req.method.toLowerCase() === "post") {

        let body = "";
        req.on("data", (chunk) => {
            console.log(typeof body)
            body += chunk.toString()
        })

        req.on("end", () => {


            console.log("Get all chunks of data")

            // console.log(!req.headers["content-type"].includes("application/json"))

            if (!req.headers["content-type"].includes("application/json")) return res.end("wrong content-type");
            console.log(body)

            const data = JSON.parse(body);

            console.log(typeof data.id)
            let include = false
            users.map((user) => {
                if (user.id === +data.id) {
                    include = true
                }

            })

            console.log(include + "blabla")

            if (include) {
                console.log("It already exists in users")
                res.statusCode = 400
                return res.end("already exists in users")}

           

            try {
                console.log(body);

                console.log(data);
                users.push(JSON.parse(body))
                return res.end(body)
            } catch (e) {
                console.error(e)
            }

        })

        req.on("error", (err) => { console.log(err) })
    }
});


server.listen(PORT, () => { console.log(`Server is running on http://localhost${PORT}`) })


// thank you for everything today I have understand the node http much more clearly!!!