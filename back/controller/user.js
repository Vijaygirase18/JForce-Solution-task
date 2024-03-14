const User = require("../model/user");
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const userExist = await User.findOne({ name: name });
        if (userExist) {
            if (userExist.password === password) {
                const token = jwt.sign({ id: userExist._id, name: userExist.name }, 'iconnect_technology');
                res.cookie('token', token);
               
                if (userExist.role === 'admin') {
                    res.json({ msg: "Admin login successful", id: userExist._id, user: userExist.name, token: token, role: userExist.role });
                } else {
                    res.json({ msg: "User login successful", id: userExist._id, user: userExist.name, token: token, role: userExist.role });
                }
            } else {
                res.status(400).json({ error: "Password not Match" });
            }
        } else {
            res.status(404).json({ error: "User not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const Register = async (req, res) => {
    try {
        const { email, password, name, number, role } = req.body;
        const isExist = await User.findOne({ name: name });
        if (isExist) {
            res.status(400).json({ error: 'User already exists' });
        } else {
            const newUser = new User({
                email: email,
                password: password,
                name: name,
                number: number,
                role: role
            });
            const result = await newUser.save();
            if (result) {
                res.json({ msg: "User registered successfully" });
            } else {
                res.status(500).json({ error: "User not registered" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }   
}

module.exports = { Login, Register };
