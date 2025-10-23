import express from 'express';
import cors from 'cors'
import { config } from 'dotenv'
const app = express();
const port = process.env.PORT || 8000 
app.use(cors());

app.listen(port, () => {
    console.log('server is running on port', port)
})
app.get((res, req) => {
    res.send('working now')
})