import bcrypt from "bcryptjs";

module.exports = {
  encrypt(text) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(text, salt);
    return hash;
  },
  compare(text, hash) {
    const compare = bcrypt.compareSync(text, hash);
    return compare;
  },
};
