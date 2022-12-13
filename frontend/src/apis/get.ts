import client from "./client";

export interface sizeType {
  named_size: string;
  length: string;
  waist_size: string;
  thigh_size: string;
  calf_size: string;
}

export interface clothesType {
  id: string;
  name: string;
  style: string;
  brand: string;
  price: string;
  URL: string;
  photo: string;
  named_size: string[];
}

export interface reqType {
  username: string | null;
  clothes_id: string | null;
}

export interface reqCommentType {
  username: string | null;
  review_id: number;
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

export const reviewClothes = async (payload: reqType) => {
  if (
    typeof payload.username === "string" &&
    typeof payload.clothes_id === "string"
  ) {
    const response = await client.get(
      `/api/clothes/review/${payload.username}/${payload.clothes_id}/`
    );
    return response.data;
  } else {
    alert("wrong approach");
  }
};

export const analyze = async (payload: reqType) => {
  if (
    typeof payload.username === "string" &&
    typeof payload.clothes_id === "string"
  ) {
    const response = await client.get(
      `/api/clothes/analyze/${payload.username}/${payload.clothes_id}/`
    );
    return response.data;
  } else {
    alert(typeof payload.clothes_id);
  }
};
export const reqScrap = async (payload: reqType) => {
  if (
    typeof payload.username === "string" &&
    typeof payload.clothes_id === "string"
  ) {
    const response = await client.get(
      `/api/clothes/scrap/${payload.username}/${payload.clothes_id}/scrap/`
    );
    return response.data;
  } else {
    alert("wrong approach");
  }
};

export const reqScrappedList = async (username: string | null) => {
  if (typeof username === "string") {
    const response = await client.get(`/api/clothes/scrapped/${username}/`);
    return response.data;
  } else {
    alert("wrong approach");
  }
};

export const reqComment = async (payload: reqCommentType) => {
  if (
    typeof payload.username === "string" &&
    typeof payload.review_id === "number"
  ) {
    const response = await client.get(
      `/api/clothes/comment/${payload.username}/${payload.review_id}/`
    );
    return response.data;
  } else {
    alert("wrong approach");
  }
};
