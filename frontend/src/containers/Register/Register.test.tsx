import React from "react";
import renderer from "react-test-renderer";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import Register from "./Register";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Register", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<Register />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("성공적으로 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.length).toBe(1);
  });
  it("should be change", () => {
    const wrapper: any = shallow(<Register />);
    wrapper.find("#username").simulate("change", { target: { value: "값" } });
    expect(wrapper.state().profile.username).toBe("값");
  });
});
