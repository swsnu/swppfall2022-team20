import React from "react";
import renderer from "react-test-renderer";
import * as router from "react-router";
import { expect } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
const navigate = jest.fn();
beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("Login", () => {
  let component: any = null;

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
    expect(navigate).toHaveBeenCalledWith("/register");
  });
  it("click signin - no data", () => {
    global.alert = jest.fn();
    const login: any = render(<Login />);
    const button = login.getByTestId("signin");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
