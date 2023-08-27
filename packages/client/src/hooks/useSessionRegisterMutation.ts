import { enqueueSnackbar } from "notistack";
import postAuthRegister from "@/services/postAuthRegister";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import Cookies from "js-cookie";

type Data = {
  email: string;
  password: string;
  name: string;
};

type Response = {
  access_token: string;
  message: string;
};

type Error = {
  message: string;
};

const useSessionRegisterMutation = () => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password, name }: Data) =>
      postAuthRegister({
        data: {
          email,
          password,
          name,
        },
      }),
    onSuccess: (data: Response) => {
      enqueueSnackbar({
        message: "Registrado com sucesso!",
        variant: "success",
      });

      Cookies.set("auth-token", data.access_token);

      router.push("/home");
    },
    onError: (error: AxiosError<Error>) => {
      return enqueueSnackbar({
        message: "Houve algum erro ao registrar!",
        variant: "error",
      });
    },
  });

  return { mutate, isLoading };
};

export default useSessionRegisterMutation;
