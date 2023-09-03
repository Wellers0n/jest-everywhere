"use client";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import useSessionLoginMutation from "@/hooks/useSessionLoginMutation";
import { Input } from "@/components/Input";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/theme";
import { useRouter } from "next/navigation";

type Submit = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { mutate, isLoading } = useSessionLoginMutation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async ({ email, password }: Submit) => {
    mutate({
      email,
      password,
    });
  };

  return (
    <Stack
      height={"90vh"}
      width={"100%"}
      mb={3}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        component={"form"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={{ lg: "25%", md: "40%", xs: "78%" }}
        onSubmit={handleSubmit(submit)}
      >
        <Typography
          mb={5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          color={"primary"}
          variant={mobile ? "h5" : "h4"}
          textAlign={"center"}
        >
          Jest everywhere
        </Typography>
        <Stack
          width={"100%"}
          spacing={2}
          direction={{ xs: "column", sm: "column", md: "column" }}
        >
          <Input
            name={"email"}
            control={control}
            label={"Email"}
            rules={{
              required: "Email é obrigatório",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Digite um email válido",
              },
            }}
          />
          <Input
            name={"password"}
            control={control}
            label={"Senha"}
            type="password"
            rules={{
              required: "Senha é obrigatório",
              minLength: {
                value: 3,
                message: "Digite pelo menos 3 caracteres",
              },
            }}
          />
        </Stack>
        <Stack
          width={"100%"}
          mt={2}
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }} // add space-between when return register button
        >
          <Button
            disabled={isLoading}
            sx={{ height: 40, width: 160 }} // width: 160,
            variant="contained"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress color="primary" size={22} />
            ) : (
              "Entrar"
            )}
          </Button>
          <Button variant="text" onClick={() => router.push("/register")}>
            Cadastrar
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
