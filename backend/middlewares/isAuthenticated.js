import jwt from "jsonwebtoken";

const  isAuthenticated = async (req, res, next)=>{ // next is used as a response that this middleware has finsihed is executuion so next middleware or route handler can take place
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        };

        const decode = await jwt.verify(token, process.env.SECRET_KEY); // jwt.verify returns the decoded token payload 
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        };

        req.id = decode.userId; // storing userId from decoded token in to req object as id 
        next(); // to pass controll from one middleware function to next in req res cycle


    } catch (error){
        console.log(error);
        
    }

}

export default isAuthenticated;