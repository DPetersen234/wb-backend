const express = require('express');
const app = express();
const cors = require('cors');
const {
    getStormData,
    getWindData,
    getLightningData,
    getAllUserData,
    getAllUserDataByUser,
    addNewUser,
    updateUserInfo,
    deleteUser,
    updateStormData,
    createStorm,
    createWind,
    updateWindData,
    updateLightningData,
    createLightning,
    deleteStorm,
    deleteLightning,
    deleteWind,
    getAllUserDataByUsername
} = require('./controllers');

const bcrypt = require('bcryptjs');
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);

const port = 8080;

const hashCompare = (input, hash) => {
}


app.listen(port, () => {
    console.log(`Listening for server on port ${port}`)
})

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json('Welcome to the weather board server')
})
app.get('/users', (req, res) => {

    getAllUserData()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(404).json({ message: 'No matching user data' }))

})

app.post('/users', async (req, res) => {
    const salt = await bcrypt.genSalt(15);
    const password = await bcrypt.hash(req.body.password, salt)
    const newUser = {
        is_admin: false,
        user_name: req.body.username,
        passwordHash: password,
        FirstName: req.body.FirstName,
        LastName: req.body.lastName
    }
    addNewUser(newUser)
        .then((data) => {
            res.status(200).send({ message: "success" })
        })
        .catch((err) => res.status(404).json({ message: 'User Update Unsuccessful', err }))
})
app.post('/users/login', async (req, res) => {
    getAllUserDataByUsername(req.body.username)
        .then(data => {
            if (data.length == 1) {
                bcrypt.compare(req.body.password, data[0].passwordHash, function (err, response) {
                    if (response == true) {
                        let newData = {
                            user_name: data[0].user_name,
                            FirstName: data[0].FirstName,
                            LastName: data[0].LastName
                        }
                        res.status(200).send(newData)
                    } else {
                        //error code 101 = password incorrect
                        res.status(200).send({ Err: 101 })
                    }
                })

            } else {
                //err code 100 = username incorrect
                res.status(200).send({ Err: 100 })
            }
        })


    // .then((data) => res.status(200).send({message: "success"}))
    // .catch((err) => res.status(404).json({ message: 'User Update Unsuccessful', err }))
})


app.get('/users/:id', (req, res) => {
    let { id } = req.params;
    getAllUserDataByUser(id)
        .then((data) => res.send(data))
        .catch(err => res.status(404).json({ message: "No id matching a user" }))
})

app.patch('/users/:id', (req, res) => {
    let { id } = req.params;
    updateUserInfo(id, req)
        .then((data) => res.status(201).send(`User ${req.body.user_name} has been updated successfully`))
        .catch((err) => res.status(400).send(err, 'Unable to update user'))
})
app.delete('/users/:id', (req, res) => {
    let { id } = req.params;
    deleteUser(id)
        .then((data) => res.status(200).send(`User has been deleted successfully`))
        .catch((err) => res.status(400).json({ message: 'User Update Unsuccessful', err }))
})

app.get('/storm', (req, res) => {

    getStormData()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(404).json({ message: 'No matching storm data' }))
});
app.patch('/storm', async (req, res) => {
    console.log(req.body)
    let userObj = await getAllUserDataByUsername(req.body.user)
    console.log(req.body);
    let newObj = { is_active: req.body.is_active, type: req.body.type, warning: req.body.warning, location: req.body.location, hail_diameter: req.body.hail_diameter, wind_speed: req.body.wind_speed, start: req.body.start, end: req.body.end, wind_direction: req.body.wind_direction, user_id: userObj.id }
    updateStormData(newObj)
        .then((data) => res.status(201).send({ message: 'Updated storm WWA successfully' }))
        .catch((err) => res.status(404).send(err))
})

app.post('/storm', (req, res) => {
    createStorm(req)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json({ message: 'Storm could not be created', err }))
})

app.delete('/storm', (req, res) => {
    if (req.body.is_active !== true && req.body.id !== undefined) {
        deleteStorm(req)
            .then((data) => res.status(200).send('Storm WWA was successfully delete'))
            .catch((err) => res.status(404).json({ message: 'Storm WWA was unable to be deleted', err }))
    } else {
        res.status(400).send('Storm WWA was unable to be deleted due to being active')
    }
})

app.get('/lightning', (req, res) => {

    getLightningData()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(404).json({ message: 'No matching lightning data' }))
})

app.patch('/lightning', async (req, res) => {
    //req.body does not have the id for the user, but it has the email/user_name
    //search by user_name in /users database to get ID
    //put id into new object where userId = ID

    //let newObj = { is_active: true, type: req.body.type, location: location, category: req.body.category, start: req.body.start, end: req.body.end, user_id: , }
    //map over lightning data to patch each location with new data
    let userObj = await getAllUserDataByUsername(req.body.user_name)
    let locations = req.body.location
    locations.map(location => {
        let newObj = { is_active: req.body.is_active, type: req.body.type, location: location, category: req.body.category, start: req.body.start, end: req.body.end, user_id: userObj.id }
        updateLightningData(newObj).then(data => console.log(data)).catch((err) => console.log(err))
    })

    res.status(201).send({ message: "success" })
})

// app.post('/lightning', (req, res) => {
//     let locations = req.body.location
//     locations.map(location => {
//         let newObj = { is_active: true, type: req.body.type, location: location, category: req.body.category, start: req.body.start, end: req.body.end, user_name: req.body.user_name, }
//         createLightning(newObj).then(data => console.log(data)).catch((err) => console.log(err))
//     })
//    })

app.delete('/lightning', (req, res) => {
    if (req.body.is_active !== true && req.body.id !== undefined) {
        deleteLightning(req)
            .then((data) => res.status(200).send('Lightning WWA was successfully deleted'))
            .catch((err) => res.status(404).json({ message: 'Lightning WWA was unable to be deleted', err }))
    } else {
        res.status(400).send('Lightning WWA was unable to be deleted due to being active')
    }
})

app.get('/wind', (req, res) => {
    getWindData()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(404).json({ message: 'No matching wind data' }))
})

app.patch('/wind', async (req, res) => {
    console.log(req.body);
    let newObj = { id: req.body.id, is_active: req.body.is_active, type: req.body.type, warning: req.body.warning, location: req.body.location, category: req.body.category, start: req.body.start, end: req.body.end, direction: req.body.direction, user_id:  1 }
    updateWindData(newObj)
        .then((data) => res.status(201).send({ message: "success" }))
        .catch((err) => res.status(503).send(err))

})

app.post('/wind', (req, res) => {
    createWind(req)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).json({ message: 'Wind could not be created', err }))
})

app.delete('/wind', (req, res) => {
    if (req.body.is_active !== true && req.body.id !== undefined) {
        deleteWind(req)
            .then((data) => res.status(200).send('Wind WWA was successfully deleted'))
            .catch((err) => res.status(404).json({ message: 'Wind WWA was unable to be deleted', err }))
    } else {
        res.status(400).send('Wind WWA was unable to be deleted due to being active')
    }
})



module.exports = app;