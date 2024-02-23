interface User {
  passwordHash: string;
}

export function serializeUser<T extends User>(user: T) {
  // eslint-disable-next-line
  const { passwordHash, ...rest } = user;

  return rest;
}
