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
        <Stack
          mb={5}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Typography
            color={"primary"}
            variant={mobile ? "h5" : "h4"}
            textAlign={"center"}
          >
            Jest everywhere
          </Typography>
        </Stack>
        <Stack
          width={"100%"}
          spacing={2}
          direction={{ xs: "column", sm: "column", md: "column" }}
        >
          <Controller
            name={"email"}
            control={control}
            rules={{
              required: "Email é obrigatório",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Digite um email válido",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={"Email"}
              />
            )}
          />

          <Controller
            name={"password"}
            control={control}
            rules={{
              required: "Senha é obrigatório",
              minLength: {
                value: 3,
                message: "Digite pelo menos 3 caracteres",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                type="password"
                label={"Senha"}
              />
            )}
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
