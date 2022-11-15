import React from "react";
import renderer from "react-test-renderer";
import axios from "axios";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
  let component: any = null;

  it("initial render", () => {
    component = renderer.create(<UserProfile />);
  });
  it("render correct", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
