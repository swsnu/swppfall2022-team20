import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import Register from "./Register";

describe("Register", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<Register />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
