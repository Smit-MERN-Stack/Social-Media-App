import User from "../Modals/userModel.js"
import bcrypt from "bcrypt"
//Register user

export const registerUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt)

    const newUser = new User({
        username, password: hashedpass, firstname, lastname
    })

    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//login user

export const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username: username })

        if (user) {
            const validation = await bcrypt.compare(password, user.password)

            validation ? res.status(200).json(user) : res.status(400).send("Wrong Password")
        } else {
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}