// utils/otpStore.js
// simple in-memory store (use Redis in production!)
const otpStore = {};

function setOTP(studentId, otp) {
  otpStore[studentId] = { otp, expires: Date.now() + 2 * 60 * 1000 }; // valid 2 mins
}

function verifyOTP(studentId, otp) {
  const record = otpStore[studentId];
  if (!record) return false;
  if (Date.now() > record.expires) return false;
  return record.otp === otp;
}

module.exports = { setOTP, verifyOTP };
