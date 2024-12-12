// to add data in the db

import { faker } from '@faker-js/faker';
import { createConnection } from "mysql2";

const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mega_app',
    password: 'Silver@1005'
});

// inserting new data
// let q = "INSERT INTO user (id, username , email, password) VALUES (?, ?, ?, ?)";
// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];

// for multiple users̀
// let q = "INSERT INTO user (id, username , email, password) VALUES ?";
// let users = [["123", "123_newuser", "abc@gmail.com", "abc"], ["123a", "12a3_newuser", "abc@gaail.com", "abac"]];




let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};


// for inserting data in bulk 

let q = "INSERT INTO user (id, username , email, password) VALUES ?";
let data = [];
for (let i = 0; i <= 100; i++) {
    data.push(getRandomUser());
}


try {
    connection.query(q, [data], (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log(result.length);
        console.log(result[0]);
    })
} catch (err) {
    console.log(err);
}

connection.end();
