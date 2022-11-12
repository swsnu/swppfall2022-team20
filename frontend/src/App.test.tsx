import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { mount } from "enzyme";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
describe("App", () => {
  let app: any;

  beforeEach(() => {
    app = <App />;
  });

  it("should render", () => {
    const component = mount(app);
    expect(component.find(".App").length).toEqual(1);
  });
});
