import jwt from "jsonwebtoken";

const createJwt = (
  verificationToken: string,
): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(
    {
      verificationToken,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    {
      verificationToken,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    accessToken,
    refreshToken,
  };
};

export { createJwt };
