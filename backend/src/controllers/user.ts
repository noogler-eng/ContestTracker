import User from "../models/user_schema";
import Contest from "../models/contest_schema";

// controller function for getting the user details
// this will help in frontend to persisten user across the pages
const getCurrentUser = async (req: any, res: any) => {
  try {
    const email = req.email;
    if (!email) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const freshUser = await User.findOne({
      email: email,
    });

    return res.status(200).json({
      message: "Current user fetched successfully",
      user: freshUser,
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// controller function for adding the bookmarks
// this will save whole contest data
// as when user fetched the booksmar we can't call sinle
// contest api's to the official platforms
const addBookmark = async (req: any, res: any) => {
  try {
    const { contestData } = req.body;
    const email = req.email;

    if (!contestData) {
      return res.status(400).json({ message: "Missing data" });
    }

    let contest = await Contest.findOne({ id: contestData.id });

    if (!contest) {
      contest = new Contest(contestData);
      await contest.save();
    }

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isAlreadyBookmarked = user.bookmarks?.includes(contest._id);
    if (!isAlreadyBookmarked) {
      user.bookmarks?.push(contest._id);
      await user.save();
    }

    return res.status(200).json({ message: "Contest bookmarked successfully" });
  } catch (error) {
    console.error("Bookmark Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// this is controller function to fetch all the user bookmarks
// /user/bookmarks?page=2
export const getUserBookmarks = async (req: any, res: any) => {
  try {
    const email = req.email;
    const { page = 0 } = req.query;
    const limit = 10;

    if (!email)
      return res.status(400).json({ message: "User email is required" });

    const user = await User.findOne({ email }).populate("bookmarks");
    if (!user) return res.status(404).json({ message: "User not found" });

    const bookmarks = user.bookmarks || [];

    const paginatedBookmarks = bookmarks.slice(
      page * limit,
      (page + 1) * limit
    );

    return res.status(200).json({
      bookmarks: paginatedBookmarks,
      total: bookmarks.length,
      page: Number(page),
      hasMore: (page + 1) * limit < bookmarks.length,
    });
  } catch (error) {
    console.error("Fetch Bookmarks Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { getCurrentUser, addBookmark, getUserBookmarks };
