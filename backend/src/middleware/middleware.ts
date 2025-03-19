import jwt from "jsonwebtoken";
import User from "../models/user_schema.js";

export const googleAuthMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const json_data = jwt.decode(token);
    // @ts-ignore
    if (!json_data || !json_data?.email) {
      return res.status(401).json({ message: "Invalid token data" });
    }

    const { email }: any = json_data;
    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid token" });
    req.email = user.email;
    next();
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default googleAuthMiddleware;