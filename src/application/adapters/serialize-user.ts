interface ExpectedUser {
  passwordHash: string;
}

export function serializeUser<User extends ExpectedUser>(user: User) {
  // eslint-disable-next-line
  const { passwordHash, ...rest } = user;

  return rest;
}
