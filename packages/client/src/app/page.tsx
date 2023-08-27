"use client";
import { Button, Typography, Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import theme from "@/theme";

export default function Home() {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();
  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Typography
        variant="h5"
        color={"secondary"}
        width={mobile ? "95%" : "40%"}
        textAlign={"center"}
        mb={5}
      >
        Clique em entrar para fazer o login
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push("/login")}
      >
        Entrar
      </Button>
    </Stack>
  );
}
