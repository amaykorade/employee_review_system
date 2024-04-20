import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res, next) {
        const { name, email, password, type } = req.body;
        const user = { name, email, password, type };
        // console.log(user);
        try {
            const newUser = await this.userRepository.signUp(user);
            res.status(201).send(newUser);
        } catch (err) {
            console.log(err);
            res.status(500).send("Signup failed")
            next(err);
        }
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.signIn(email, password);
            const data = await this.userRepository.get(email);
            // console.log(data[0].type);
            if (data[0].type == 'Admin') {
                if (user) {
                    // create token
                    const token = jwt.sign(
                        {
                            userID: user._id,
                            email: user.email,
                        },
                        'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                        {
                            expiresIn: '10h'
                        }
                    );
                    // send token
                    return res.status(200).send(token);
                } else {
                    return res.status(400).send('Incorrect Credentials')
                }
            } else {
                return res.status(400).send('You are not admin to login');
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Signin failed")
            next(err);
        }
    }
}