import jwt from "jsonwebtoken";
// //jwt middleware

// // Tasks:
// // Read Authorization header
// // Extract token
// // Verify token
// // Store decoded payload in : req.user

function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    
        req.user = decodedToken;
        
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

export default authenticateToken