import jwt from 'jsonwebtoken';
// json web token payload will contain 'iat' - issued at
// and 'exp' expires at and the data we passed as a second arg
// to the sign function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
