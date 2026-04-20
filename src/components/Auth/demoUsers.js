export const demoUsersDatabase = [
  {
    id: 101,
    username: "ahmed_demo",
    email: "ahmed.demo@bondokshop.com",
    password: "Ahmed@12345",
    firstName: "Ahmed",
    lastName: "Megahed",
  },
  {
    id: 102,
    username: "sara_demo",
    email: "sara.demo@bondokshop.com",
    password: "Sara@12345",
    firstName: "Sara",
    lastName: "Hassan",
  },
  {
    id: 103,
    username: "omar_demo",
    email: "omar.demo@bondokshop.com",
    password: "Omar@12345",
    firstName: "Omar",
    lastName: "Ali",
  },
];

export function getDemoUserByCredentials({ email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();

  return demoUsersDatabase.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
  );
}

export function sanitizeUserForSession(user) {
  if (!user) return null;

  const { password: _password, ...safeUser } = user;
  return safeUser;
}
