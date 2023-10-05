const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
    // console.log(token)
    // console.log(process.env.SECERT_WORD_JWT_TOKEN);

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECERT_WORD_JWT_TOKEN);

    if(decoded.image_path !== req.params.image){
        return res.status(403).json({ message: 'Invalid token, are you sure its valid?' });

    }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
