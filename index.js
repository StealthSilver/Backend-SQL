import { faker } from '@faker-js/faker';
import { createConnection } from "mysql2";

const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mega_app',
    password: 'Silver@1005'
});

// inserting new data
let q = "INSERT INTO user (id, username , email, password) VALUES (?, ?, ?, ?)";
let user = ["123", "123_newuser", "abc@gmail.com", "abc"];
try {
    connection.query(q, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log(result.length);
        console.log(result[0]);
    })
} catch (err) {
    console.log(err);
}

connection.end();

let getRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),

    };
}

