import React from "react";
import renderer from "react-test-renderer";
import { expect } from "@jest/globals";
import Register from "./Register";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";


jest.mock("axios");

describe("Register", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<Register />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Register test", () => {
    const register: any = render(<Register />);
    const input = register.getByTestId("username");
    fireEvent.change(input, { target: { value: "a" } });
    expect(input.value).toBe("a");
  }); 
  it("click submit - no data", () => {
    global.alert = jest.fn();
    const register: any = render(<Register />);
    const button = register.getByTestId("submit");
    fireEvent.click(button);
    expect(axios.post).toHaveBeenCalledTimes(1);
  //  expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
