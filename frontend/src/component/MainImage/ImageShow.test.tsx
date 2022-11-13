import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { mount } from "enzyme";
import ImageShow from "./ImageShow";

describe("ImageShow", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<ImageShow />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe("<Imageshow />", () => {
  it("onClick", () => {
    const wrapper = mount(<ImageShow />);
    expect(wrapper.state("modalOpen")).toEqual(false);
    wrapper.find("img").simulate("click");
    expect(wrapper.state("modalOpen")).toEqual(true);
  });
});
