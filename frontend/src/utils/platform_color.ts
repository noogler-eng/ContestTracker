const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "LeetCode":
      return "bg-[#FFA116] text-black";
    case "Codeforces":
      return "bg-[#1F8ACB] text-white";
    case "CodeChef":
      return "bg-[#5B4638] text-white";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default getPlatformColor;
