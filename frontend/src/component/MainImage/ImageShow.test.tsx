import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
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
  it("test", () => {
    const img: any = render(<ImageShow />);
    const state = img.getByTestId("image");
    fireEvent.click(state);
    expect(img.getInstance().state.value).toBe(true);
  });
});
