export const isValidOTP = (otp) => {
  return /^[0-9]{6}$/.test(otp);
};


export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};