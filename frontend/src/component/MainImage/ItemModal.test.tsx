import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import ItemModal from "./ItemModal";

describe("ItemModal", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<ItemModal />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
