import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import Navbar from "./Navbar";
import { getByTestId } from "@testing-library/react";

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

const handleClick = require("./Navbar");
