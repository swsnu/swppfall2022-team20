import React from "react";
import renderer from "react-test-renderer";
import * as router from "react-router";
import { expect } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import axios from "axios";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
afterEach(() => {
  jest.clearAllMocks();
});

describe("Login", () => {
  let component: any = null;
  const fakeUserData = {
    username: "test",
    password: "test",
  };

  it("initial render", () => {
    component = renderer.create(<Login />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("login test", () => {
    const login: any = render(<Login />);
    const input = login.getByTestId("username");
    fireEvent.change(input, { target: { value: "a" } });
    expect(input.value).toBe("a");
  });
  it("click register", () => {
    const login: any = render(<Login />);
    const button = login.getByTestId("register");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
  it("click signin - no data", () => {
    global.alert = jest.fn();
    const login: any = render(<Login />);
    const button = login.getByTestId("signin");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
  it("should get json data and store in local", async () => {
    const login: any = render(<Login />);
    const button = login.getByTestId("signin");
    fireEvent.click(button);
    const res = await (axios.post = jest
      .fn()
      .mockResolvedValue({ data: fakeUserData }));
    expect(mockNavigate).toHaveBeenCalledWith("/main");
  });
});
