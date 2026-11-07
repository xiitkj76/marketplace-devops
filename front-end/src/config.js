// Alamat backend. Di Docker diisi lewat build arg REACT_APP_API_URL.
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
