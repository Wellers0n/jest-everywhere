"use client";
import { Button, Typography, Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import theme from "@/theme";
import Cookies from "js-cookie";

export default function Home() {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth-token");
    router.push("/login");
  };

  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        background: "black",
      }}
    >
      <Typography
        variant="h5"
        color={"secondary"}
        width={mobile ? "95%" : "40%"}
        textAlign={"center"}
        mb={5}
      >
        Home screen
      </Typography>
      <Button variant="outlined" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Stack>
  );
}
