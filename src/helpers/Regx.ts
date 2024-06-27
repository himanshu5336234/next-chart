export const Regx = {
  alfabetsRegExp: /^[aA-zZ\s]+$/,
  passwordRegExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
  phoneRegExp: /^[+]?(?:[0-9]{2})?[0-9]{10}$/,
  otpRegExp: /^[0-9]{4}$/,
  panRegExp: /^[aA-zZ]{5}[0-9]{4}[aA-zZ]{1}$/,
  ifscRegExp: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  NumberRegex: /^[0-9\b]+$/
};
