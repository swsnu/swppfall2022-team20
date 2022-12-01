import { render, screen } from "@testing-library/react";
import HowRegisterModal from "./HowRegisterModal";
//testing
test("snapshot", () => {
  const el = render(<HowRegisterModal />);
  expect(el).toMatchSnapshot();
});
