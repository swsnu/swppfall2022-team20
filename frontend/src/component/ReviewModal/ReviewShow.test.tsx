import { fireEvent, render, screen } from "@testing-library/react";
import ReviewShow from "./ReviewShow";
//testing
test("snapshot", () => {
  const el = render(<ReviewShow />);
  expect(el).toMatchSnapshot();
});
describe("<ReviewShow />", () => {
  it("test", () => {
    const img: any = render(<ReviewShow />);
    const state = img.getByTestId("image");
    fireEvent.click(state);
    expect(img.getInstance().state.value).toBe(true);
  });
});
