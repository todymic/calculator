import Client from "../utils/HttpClient";
import { UserInterface } from "../types/User.interface";

const getOne = async (id: number) => {
  const response = await Client.get<UserInterface>(`/users/${id}`)
  return response.data
};


const UserService = {
  getOne
};

export default UserService;
