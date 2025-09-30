import User from '../model/usermodel.js';
import FoodPartner from '../model/foodpartner.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "your_jwt_secret";

// ================= USER AUTH =================
export async function register(req, res) {
      try {
            const { username, password, email } = req.body;
            const userexists = await User.findOne({ email });
            if (userexists) {
                  return res.status(400).send('User already exists');
            }

            const hashpassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                  fullname: username,
                  email,
                  password: hashpassword,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true });

            return res.status(201).json({ username: newUser.fullname, email: newUser.email });
      } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
      }
}

export async function login(req, res) {
      try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).send('Invalid credentials');

            const isMatch = await bcrypt.compare(password, user.password); // ✅ fixed await
            if (!isMatch) return res.status(400).send('Invalid credentials');

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true });

            return res.status(200).json({ username: user.fullname, email: user.email, token });
      } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
      }
}

export async function logout(req, res) {
      res.clearCookie("token");
      return res.status(200).send('Logged out successfully');
}

// ================= FOODPARTNER AUTH =================
export async function foodpartnerregister(req, res) {
      try {
            const { username, password, email } = req.body;
            const partnerExists = await FoodPartner.findOne({ email });
            if (partnerExists) {
                  return res.status(400).send('FoodPartner already exists');
            }

            const hashpassword = await bcrypt.hash(password, 10);

            const newPartner = new FoodPartner({
                  fullname: username,
                  email,
                  password: hashpassword,
            });

            await newPartner.save();

            const token = jwt.sign({ id: newPartner._id }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true });

            return res.status(201).json({ username: newPartner.fullname, email: newPartner.email });
      } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
      }
}

export async function foodpartnerlogin(req, res) {
      try {
            const { email, password } = req.body;
            const partner = await FoodPartner.findOne({ email });
            if (!partner) return res.status(400).send('Invalid credentials');

            const isMatch = await bcrypt.compare(password, partner.password); // ✅ fixed await
            if (!isMatch) return res.status(400).send('Invalid credentials');

            const token = jwt.sign({ id: partner._id }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true });

            return res.status(200).json({ username: partner.fullname, email: partner.email, token });
      } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
      }
}

export async function foodpartnerlogout(req, res) {
      res.clearCookie("token");
      return res.status(200).send('Logged out successfully');
}
