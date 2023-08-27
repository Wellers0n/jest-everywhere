import Api from "./api";

type Data = {
  email: string;
  password: string;
};

type Props = {
  data?: Data;
};

type Response = {
  access_token: string;
  message: string;
};

const postAuthLogin = async (props: Props): Promise<Response> => {
  const { data } = props;

  const api = Api();

  const response = await api.post<Response>("/session/signin", data);

  return response.data;
};

export default postAuthLogin;