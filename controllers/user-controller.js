const User = require('../models/user-model');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    signupUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {
                email, password: hashedPassword
            }

            // Save user
            await new User(newUser).save()

            res.send({
                msg: 'Signup successfully',
                data: { email }
            })

        } catch (error) {
            res.send({
                msg: error.message
            })
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userData = await User.findOne({ email: email })
            if (!userData) {
                return res.send("user not found.")
            }
            if (userData) {
                console.log(userData);
                const iscorrectPassword = await bcrypt.compare(password, userData.password);
                if (!iscorrectPassword) {
                    return res.send("Password is incorrect.")
                }
                if (iscorrectPassword) {
                    console.log(iscorrectPassword);
                    const token = jwt.sign(
                        userData.toObject(), "secret text", { expiresIn: 60 * 24 }
                    )
                    console.log("token", token)

                    return res.send({
                        msg: 'Login successfully',
                        data: { email, token }
                    })
                }
            }
        }
        catch (error) {
            res.send({
                msg: error.message
            })
        }

    }
}