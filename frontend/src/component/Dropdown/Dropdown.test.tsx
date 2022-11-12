import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<Dropdown />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
/*describe("<NavLink />", () => {
  it("first", () => {
    const comp = (
      <NavLink to="/profile" className={"nav-links"}>
        NavLink profile test
      </NavLink>
    );
    const wrapper: any = shallow(comp);

    expect(wrapper.instance().props.to).to.equal("/profile");
  });
  it("logout", () => {
    const comp = (
      <NavLink to="/" className={"nav-links"}>
        NavLink logout test
      </NavLink>
    );
    const wrapper: any = shallow(comp);

    expect(wrapper.instance().props.to).to.equal("/");
  });
});*/
