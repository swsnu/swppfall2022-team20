import { render, screen } from "@testing-library/react";
import HowRegisterModal from "./HowRegisterModal";

test("snapshot", () => {
  const el = render(<HowRegisterModal />);
  expect(el).toMatchSnapshot();
});
