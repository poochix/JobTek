// this file is for business logic
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';




dotenv.config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, role, password } = req.body;

    if (!fullname || !email || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return (
        res.status(400).
        json({
          message: "Email already registered",
          success: false,
        })
      );
    }

    const userPhone = await User.findOne({ phoneNumber });
    if (userPhone) {
      return (
        res.status(400).
        json({
          message: "Phone number already registered",
          success: false,
        })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10); //to hash the password with 10 salt rounds that makes hashing computationaly intensive

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto: cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error.message, error.stack);
    return res.status(500).json({
         message: "Internal server error", 
         success: false 
        });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    /*const*/ let user = await User.findOne({ email }); // here every single attribute is fetched including password
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); //password is from req body and user.password is form collection is retrieved while querying for email  in line 55
    if (!isPasswordMatch) {
      return res.status(400).json({
        mesaage: "Incorrect email or password",
        success: false,
      });
    }

    // check whether role is correct or not

    if (role != user.role) {
      return res.status(400).json({
        message: "Account not found for the current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    // tokenData will be encode in the token and the secret key will sign the token which will expire in 1 day
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // this sets a cookie in client browser to maintain the login sessions without relogin for accesing server or protected resources
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error());
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      //this will invalidates the token by empty string and maxAge 0
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    if(!file){
      return res.status(400).json({message : ' no file uploaded'})
    }

    // cloudinary will come here
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //  const cloudResponse = await cloudinary.uploader.upload("your-file-path.pdf", {
    //   resource_type: "raw",  // Use 'raw' for non-image files like PDFs
    //   access_mode: "public"  // Set the access mode to public
    // }, function(error, result) { console.log(result, error); });

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(','); // only when skill is entered
    }

    const userId = req.id; //middleware authentication

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // updating data

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    console.log(skills);

    // resume will be implemented later
    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname // save the original file name
    }

    await user.save();

    // user is redefined to send back to the client to avoid sending confidential data

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user, //returning the user object
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
