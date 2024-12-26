// import User from "../models/UserModel.js";
// import  jwt  from "jsonwebtoken";
// const protectRoute = async (req,res,next) => {
//     try {
//         const token = req.cookies.jwt;

//          //jwt  is what we named the index, as written in jwt file.
//          // "cookies.jwt"
        
//         if(!token){
//             return res.status(401).json({
//                 message : "unauthorized"
//             })
//         }

//         const decoded = jwt.verify(token , process.env.JWT_SECRET);
//         const user = await User.findById(decoded.userId).select("-password");
//         //this user id comes from the payload we put in the jwt file
       

//         req.user = user;
//         // select req.user to usesr i just set above
//         // we pass this user in the req object insde user
        
//         //next for middleware
//         next();

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//         console.log(`Error in logging in user : ${error.message}`);
//     }
// }

// export default protectRoute



import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized, token missing" });
        }

        // Extract the token from the header
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to the request object
        req.user = user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error(`Error in authentication: ${error.message}`);
        res.status(401).json({ message: "Invalid token" });
    }
};

export default protectRoute;
