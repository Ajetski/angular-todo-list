import { connect } from 'mongoose';


console.log(`${process.env.DB_CONNECTION_URL}`)
connect(`${process.env.DB_CONNECTION_URL}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        dbName: 'todo-list-db',
    })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err: any) => {
        console.error(`Error connecting to DB: ${err}`);
    });