const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 8080

const users = [
    {
        "id": 1,
        "name": "Kaya Tekand",
        "gender": "Male",
        "image": "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        "id": 2,
        "name": "Josefa García",
        "gender": "female",
        "image": "https://randomuser.me/api/portraits/women/49.jpg",
    },
    {
        "id": 3,
        "name": "Charles Spahn",
        "gender": "Male",
        "image": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        "id": 4,
        "name": "Supritha Shroff",
        "gender": "female",
        "image": "https://randomuser.me/api/portraits/women/42.jpg",
    },
    {
        "id": 5,
        "name": "Lydia Philippe",
        "gender": "Male",
        "image": "https://randomuser.me/api/portraits/women/1.jpg",
    }
]

// // api server

// get all users
app.get("/api/users", function (req, res) {
    res.status(200).json(users);
})

function getUserByID(uid) {
    for (var i = 0; i < users.length; i++) {
        if (uid == users[i].id) {
            return i;
        }
    }
    return -1;
}


//get user by id
app.get("/api/users/:id", function (req, res) {
    var uid = req.params.id;
    var userid = getUserByID(uid);

    if (userid == -1) {
        res.status(404).json({ "message": "User not found" });
    }
    res.status(200).json(users[userid]);
})

// get random users

app.get("/api/randomuser", function (req, res) {
    var n = users.length;
    const randomIndex = Math.floor(Math.random() * users.length);

    res.status(200).json(users[randomIndex]);
})

var newuserid = users.length;

// api to add a new user
app.post("/api/users", function (req, res) {
    if (!req.body.name || !req.body.image || !req.body.gender) {
        res.json({ "message": "name,gender,image are required" });
    }
    let user = req.body;
    user.id = newuserid;
    newuserid++;
    users.push(user);
    res.status(200).json({ "message": "added successfully" });
})

// to update
app.put("/api/users/:id", function (req, res) {
    var userid = getUserByID(req.body);
    if (userid == -1)
        return res.json({ "message": "User not found " });

    if (req.body.name)
        users[userid].name = req.body.name;
    if (req.body.gender)
        users[userid].gender = req.body.gender;
    if (req.body.image)
        users[userid].image = req.body.image;
    return res.status(200).json({ "message": "User details updated", "user": users[userid] });
})

// delete api
app.delete("/api/users/:id", function(req,res){
    var userid = getUserByID(req.params.id);
    if(userid == -1)
        return res.json({"message":"User not found"})
    users.splice(userid,1);
    res.status(200).json({"message":"User deleted successfully"})
} )

app.use(express.static('frontend')); // webserver ( Api server using express)
app.listen(port, function () {
    console.log("Server running on http://localhost:" + port)
})