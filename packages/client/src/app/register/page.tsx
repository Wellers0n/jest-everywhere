"use client";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import theme from "@/theme";
import useSessionRegisterMutation from "@/hooks/useSessionRegisterMutation";

import React from "react";

type Submit = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { mutate, isLoading } = useSessionRegisterMutation();

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async ({ name, email, password }: Submit) => {
    mutate({
      email,
      password,
      name,
    });
  };

  return (
    <Stack
      height={"90vh"}
      width={"100%"}
      display={"flex"}
      mb={5}
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
        <Stack mb={5} alignItems={"center"}>
          <Typography
            color={"primary"}
            variant={mobile ? "h5" : "h4"}
            textAlign={"center"}
            top={mobile ? 200 : 250}
          >
            Controle seu fluxo de forma simples
          </Typography>
        </Stack>
        <Stack
          width={"100%"}
          spacing={2}
          direction={{ xs: "column", sm: "column", md: "column" }}
        >
          <Controller
            name={"name"}
            control={control}
            rules={{
              minLength: {
                value: 3,
                message: "Digite pelo menos 3 caracteres",
              },
              required: "Nome é obrigatório",
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
                label={"Nome"}
              />
            )}
          />
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
                type={"password"}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={"Senha"}
              />
            )}
          />

          <Controller
            name={"confirmPassword"}
            control={control}
            rules={{
              required: "Confrimação de senha é obrigatório",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Suas senhas não correspondem";
                }
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
                label={"Confirmar senha"}
              />
            )}
          />
        </Stack>
        <Stack
          width={"100%"}
          mt={2}
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Button
            disabled={isLoading}
            sx={{ width: 160, height: 40 }}
            variant="contained"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress color="primary" size={22} />
            ) : (
              "Cadastrar"
            )}
          </Button>
          <Button variant="text" onClick={() => router.push("/login")}>
            Entrar
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Register;
