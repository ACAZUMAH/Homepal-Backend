export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export const productionWhitelist = [
  "https://real-back-end.vercel.app",
  "https://homepal-ochre.vercel.app",
  "http://localhost:5173"
];