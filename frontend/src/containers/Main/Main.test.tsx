import React from "react";
import renderer from "react-test-renderer";
import { NavLink } from "react-router-dom";
import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import Main from "./Main";
import axios from "axios";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("axios");

describe("Main", () => {
  let component: any = null;
  const fakeClothesData = {
    id: 1,
    name: "와이드 데님 팬츠 (LIGHT BLUE)",
    style: "street",
    brand: "TOFFEE",
    price: "36,500원",
    URL: "https://www.musinsa.com/app/goods/858911",
    photo:
      "https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg?t=20220628150414",
    size: [
      {
        named_size: "XS",
        length: 103,
        waist_size: 35,
        thigh_size: 28.5,
        calf_size: 21.5,
      },
    ],
  };
  const res = { data: fakeClothesData };

  it("initial render", () => {
    component = render(<Main />);
  });
  it("fetch clothes items", async () => {
    const func = jest.fn().mockResolvedValue([]);
    axios.get = jest.fn().mockResolvedValue(res);
    expect(func).not.toHaveBeenCalled();
  });
});
