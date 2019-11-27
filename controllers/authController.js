import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import client from '../config/dbconnection';

const user_signup = (req, res) => {
  const { first_name, last_name, username, email, role } = req.body;
  let { password } = req.body;
  if (!first_name || !last_name || !username || !email || !password || !role) {
    return res.status(400).json({
      status: 400,
      error: 'Please fill all fields.'
    });
  }
  if (role !== 'admin' && role !== 'customer') {
    return res.status(400).json({
      status: 400,
      error: 'User role must either be an "admin" or a "customer"'
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      status: 400,
      error: 'Password must be at least 6 characters'
    });
  }
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
  const date = new Date();
  client
    .query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username])
    .then((result) => {
      if (result.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          error: 'Email or Username already exist, please login!'
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          password = hash;
          const create = `
          INSERT INTO users(first_name,last_name, username, email, password, gravatar, role, created_at, modified_at) 
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
          const values = [
            first_name, last_name, username, email, password, avatar, role, date, date
          ];
          client.query(create, values).then((result) => {
            if (result.rowCount > 0) {
              return res.status(201).json({
                status: 201,
                success: 'Account created successfuly'
              });
            } else {
              return res.status(500).json({
                status: 500,
                error: 'Unable to register user at the moment'
              });
            }
          }).catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
};

const user_login = (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      error: 'Please enter a valid email and password'
    });
  }
  client
    .query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username])
    .then((user) => {
      if (user.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Email or Username is not registered. Please signup!'
        });
      }
      const user_password = user.rows[0].password;
      const user_id = user.rows[0].id;
      const user_first_name = user.rows[0].first_name;
      const user_last_name = user.rows[0].last_name;
      const user_avatar = user.rows[0].gravatar;
      bcrypt.compare(password, user_password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user_id,
            first_name: user_first_name,
            last_name: user_last_name,
            gravatar: user_avatar
          };
          jwt.sign(payload, process.env.secretOrkey, { expiresIn: 21600000 }, (err, token) => {
            return res.status(200).json({
              status: 200,
              succes: 'Login successful',
              token: `Bearer ${token}`
            });
          });
        } else {
          return res.status(400).json({
            status: 400,
            error: 'Incorrect Password!'
          });
        }
      });
    });
};

export { user_signup, user_login };
