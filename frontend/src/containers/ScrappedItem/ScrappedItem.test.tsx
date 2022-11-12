import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import ScrappedItem from "./ScrappedItem";
describe("ScrappedItem", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<ScrappedItem />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
