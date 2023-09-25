export const getUserData = (): User[] => {
  return [
    { id: "user1", password: "123456" },
    { id: "user2", password: "123456" },
  ];
};

//test
export interface User {
  id: string;
  password: string;
}
