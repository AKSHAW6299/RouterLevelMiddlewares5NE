import express from 'express'
import router from './router/route.js'

const app = express()
const port = 3000

// 1) Loading middleware into the app
app.use(express.json())


// 2) Root route(Route handler)
app.get('/', (req, res) => {
    // console.log('Inside get request...');
    // console.log(req.body);
    res.send('Hello World!')
})

// 3) Mounting the router
app.use('/api', router) // All routes in router.js will be prefixed with /api


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})
