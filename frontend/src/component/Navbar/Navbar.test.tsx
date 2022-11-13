import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import Navbar from "./Navbar";
import { getByTestId } from "@testing-library/react";
import { render } from "react-dom";

describe("Navbar", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<Navbar />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
/*
test("event", () => {
  render(<h2 />);

  const h2 = screen.getByText("profile");
  fireEvent.click(h2);
  expect(h2).toHaveAttribute(click);
});
*/
