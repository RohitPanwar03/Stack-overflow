import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import usermodel from "../Models/usermodel.js"

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existiguser = await usermodel.findOne({ email });
        if (existiguser) {
            return res.status(400).json({ message: "User Already Exist" });

        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newuser = await usermodel.create({ name, email, password: hashedPassword })
        const token = jwt.sign({ email: newuser.email, id: newuser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ result: newuser, token })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existiguser = await usermodel.findOne({ email });
        if (!existiguser) {
            return res.status(400).json({ message: "user don't exist" })
        }
        const comparepassword = await bcrypt.compare(password, existiguser.password);
        if (!comparepassword) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: existiguser.email, id: existiguser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ result: existiguser, token })
    } catch (error) {
        res.status(500).json("something went wrong")
    }
}