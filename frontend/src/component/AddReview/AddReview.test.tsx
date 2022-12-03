import React from "react";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import AddReview from "./AddReview";

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

describe("<AddReview />", () => {
  let itemModal: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    render(<AddReview setAddopen={true} />);
  });
  it("should render ItemModal", () => {
    const style = screen.getByText("modalStyle");
    const backButton = screen.getByText("back"); // Implicit assertion
  });

  it("should handle closeModal", () => {
    const backButton = screen.getByText("back");
    fireEvent.click(backButton);
  });
  it("should handle modalHandler", () => {});
});
