import { faker } from '@faker-js/faker';
import { createConnection } from "mysql2";

const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mega_app',
    password: 'Silver@1005'
});

try {
    connection.query("SHOW TABLES", (err, result) => {
        if (err) throw err;
        console.log(result);
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

