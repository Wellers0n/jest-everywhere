import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../page";
import Wrapper from "@/test/Wrapper";
import { rest, server } from "@/test/server";
import { act } from "react-dom/test-utils";

const url = process.env.BASE_URL

describe("login", () => {
  it("should render login screen", () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    expect(
      screen.getByText("Jest everywhere")
    ).toBeInTheDocument();
  });
  it("should render require login inputs", async () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const submitBtn = screen.getByText("Entrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Senha é obrigatório")).toBeInTheDocument();
  });
  it("should render require email valid", async () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(emailInput, { target: { value: "admin@" } });

    const submitBtn = screen.getByText("Entrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Digite um email válido")).toBeInTheDocument();
    expect(screen.getByText("Senha é obrigatório")).toBeInTheDocument();
  });

  it("should render success message when login", async () => {

    server.use(
      rest.post(`${url}/session/signin`, async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          })
        );
      })
    );

    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");

    fireEvent.change(emailInput, { target: { value: "admin@admin.com" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });

    const submitBtn = screen.getByText("Entrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Logado com sucesso!")).toBeInTheDocument();
  });

  it("should render error message when login", async () => {
    server.use(
      rest.post(`${url}/session/signin`, async (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            access_token: null,
          })
        );
      })
    );

    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");

    fireEvent.change(emailInput, { target: { value: "admin@admin.com" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });

    const submitBtn = screen.getByText("Entrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Error ao logar!")).toBeInTheDocument();
  });
});
