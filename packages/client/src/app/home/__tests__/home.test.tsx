import { render, screen } from "@testing-library/react";
import Page from "../page";
import Wrapper from "@/test/Wrapper";

describe("Home", () => {
  it("should render home screen", () => {
    render(
      <Wrapper>
        <Page />
      </Wrapper>
    );

    expect(screen.getByText("Home screen")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
