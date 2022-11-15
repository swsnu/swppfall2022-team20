import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemModal from "./ItemModal";

/*describe("ItemModal", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<ItemModal />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe("ItemModal2", () => {
  it("should be change true.", () => {
    const wrapper: any = shallow(<ItemModal />);
    wrapper.find("#change").simulate("click");
    expect(wrapper.state().click).toBe(true);
  });
});
*/
describe("Counter test", () => {
  it("should render Counter", () => {
    render(<ItemModal />);
  });
});
