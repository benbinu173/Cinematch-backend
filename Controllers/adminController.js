
const admin = require("../Models/adminmodels");
const jwt = require('jsonwebtoken') 

// creation of register controller.
exports.Adminregister = async (req, res) => {
    console.log('inside the admin register and in the controller');


    // logic (here is the logic we provide)
    // we provide the data in thunder cloud body part we need to access it as request.body

    const { username, email, password } = req.body

    // console.log(`username is ${username} and the emailm is ${email} wit the password is ${password}`);

    // we type res.end() because so that thunder cloud can stop loaading and the status can be 200 series
    // res.end()

    try {
        // here we  type the code to findthe exsting users if not enter new details of the user snd saving it .

        const existingAdmin = await admin.findOne({ email })
        // find the users by tier respective emails

        if (existingAdmin)
        // checking for existing users
        {
            res.status(406).json('ADMIN already exists..!')
        } else {
            const newAdmin = new admin({
                username,
                email,
                password,
                
            })
            await newAdmin.save()
            // after the new user enter the detsils it will be saved in newUser\

            res.status(200).json(newAdmin)

        }
    } catch (error) {
        res.status(401).json(error)
    }


}


exports.Adminlogin = async (req, res) => {
    const { username, password } = req.body

    console.log(username, password);

    try {
        const existingAdmin = await admin.findOne({ username,password })

        if (existingAdmin) {
            // introduced jwt here

            const token = jwt.sign({ userId: existingAdmin._id }, "secretKey")
            res.status(200).json({existingAdmin, token})
        }
        else {
            res.status(406).json('Incorrect username or password')
        }

    }
    catch (error) {
        res.status(406).json(error)
    }


}