import client from "./client";

export interface sizeType {
  named_size: string;
  length: string;
  waist_size: string;
  thigh_size: string;
  calf_size: string;
}

export interface clothesType {
  id: number;
  name: string;
  style: string;
  brand: string;
  price: string;
  URL: string;
  photo: string;
  named_size: string[];
}

export interface analyzeReqType {
  username: string | null;
  clothes_id: number;
}

export const reqClothes = async (username: string | null) => {
  if (typeof username === "string") {
    const response = await client.get<clothesType[]>(
      `/api/clothes/main/${username}/`
    );
    return response.data;
  } else {
    alert("wrong approach");
  }
};

export const reviewClothes = async (payload: string | null) => {
  if (typeof payload === "string") {
    const response = await client.get(`/api/clothes/review/${payload}/`);
    return response.data;
  } else {
    alert("wrong approach");
  }
};

export const analyze = async (payload: analyzeReqType) => {
  if (typeof payload.username === "string") {
    const response = await client.get(
      `/api/clothes/analyze/${payload.username}/${payload.clothes_id}/`
    );
    return response.data;
  } else {
    alert("wrong approach");
  }
};
