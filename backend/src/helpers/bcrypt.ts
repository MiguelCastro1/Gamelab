import bcrypt from "bcryptjs";

const encrypt = (text:string):string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
}

const compare = (text:string, hash:string):boolean => {
  const compare = bcrypt.compareSync(text, hash);
  return compare;
}

export {encrypt, compare};

