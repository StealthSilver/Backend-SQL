import { faker } from '@faker-js/faker';
import { createConnection } from "mysql2";
import express from 'express';
const app = express();
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mega_app',
    password: 'Silver@1005'
});


let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};



// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         console.log(result.length);
//         console.log(result[0]);
//     })
// } catch (err) {
//     console.log(err);
// }

// connection.end();

// home route
app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;

            let count = (result[0]["COUNT(*)"]);
            res.render("home.ejs", { count });
        })
    } catch (err) {
        console.log(err);
        res.send("some error in db")
    }
});

//sow route
app.get("/user", (req, res) => {
    let q = "SELECT * FROM user";
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;

            res.render("Users.ejs", { users });
        })
    } catch (err) {
        console.log(err);
        res.send("some error in db")
    }
})

app.listen("3000", () => {
    console.log("server is listening to port 3000")
})