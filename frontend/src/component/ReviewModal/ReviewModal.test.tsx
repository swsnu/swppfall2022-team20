import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";
import ReviewModal from "./ReviewModal";

const mockEffect = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: () => mockEffect,
}));

const mockRef = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => mockRef,
}));

describe("<ItemModal />", () => {
  let itemModal: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ReviewModal
        setModalOpen={true}
        photo={"modalSrc"}
        content={"modalStyle"}
        id={1}
      />
    );
  });
  it("should render ItemModal", () => {
    const style = screen.getByText("modalStyle");
    const backButton = screen.getByText("back"); // Implicit assertion
  });

  it("should handle closeModal", () => {
    const backButton = screen.getByText("back");
    fireEvent.click(backButton);
  });
  /*it("should handle visitURL", () => {
    const visitButton = screen.getByText("visit");
    fireEvent.click(visitButton);
  });*/
  it("should handle modalHandler", () => {});
});
