import bcrypt from 'bcrypt';

export default class HashedPassword {
  static saltRounds = 15;

  static hash = (password) => bcrypt.hash(password, HashedPassword.saltRounds)
}
