import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "../page";
import Wrapper from "@/test/Wrapper";
import { rest, server } from "@/test/server";
import { act } from "react-dom/test-utils";

const url = process.env.BASE_URL || "http://localhost:3001";

describe("Register", () => {
  it("should render register screen", () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const title = screen.getByText("Controle seu fluxo de forma simples");

    expect(title).toBeInTheDocument();
  });

  it("should render require register inputs", async () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const submitBtn = screen.getByText("Cadastrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Senha é obrigatório")).toBeInTheDocument();
    expect(
      screen.getByText("Confrimação de senha é obrigatório")
    ).toBeInTheDocument();
  });

  it("should render require email valid", async () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(emailInput, { target: { value: "admin@" } });

    const submitBtn = screen.getByText("Cadastrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Digite um email válido")).toBeInTheDocument();
  });

  it("should render require confirm password invalid", async () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar senha");

    fireEvent.change(passwordInput, { target: { value: "admin" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "adminn" } });

    const submitBtn = screen.getByText("Cadastrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(
      screen.getByText("Suas senhas não correspondem")
    ).toBeInTheDocument();
  });

  it("should render require password with 3 caracters", async () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    const passwordInput = screen.getByLabelText("Senha");

    fireEvent.change(passwordInput, { target: { value: "ad" } });

    const submitBtn = screen.getByText("Cadastrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(
      screen.getByText("Digite pelo menos 3 caracteres")
    ).toBeInTheDocument();
  });

  it("should render success message when register", async () => {
    server.use(
      rest.post(`${url}/auth/register`, async (req, res, ctx) => {
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
    const nameInput = screen.getByLabelText("Nome");
    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar senha");

    fireEvent.change(nameInput, { target: { value: "admin" } });
    fireEvent.change(emailInput, { target: { value: "admin@admin.com" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "admin" } });

    const submitBtn = screen.getByText("Cadastrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Registrado com sucesso!")).toBeInTheDocument();
  });

  it("should render error message when register", async () => {
    server.use(
      rest.post(`${url}/auth/register`, async (req, res, ctx) => {
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
    const nameInput = screen.getByLabelText("Nome");
    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar senha");

    fireEvent.change(nameInput, { target: { value: "admin" } });
    fireEvent.change(emailInput, { target: { value: "admin@admin.com" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "admin" } });

    const submitBtn = screen.getByText("Cadastrar");

    await act(() => {
      fireEvent.click(submitBtn);
    });

    expect(
      screen.getByText("Houve algum erro ao registrar!")
    ).toBeInTheDocument();
  });
});
