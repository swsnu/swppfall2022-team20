import client from "./client";

export interface postResType {
  username: string;
}

export interface postReqType {
  username: string;
}

export interface reviewReqType {
  content: string;
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

export interface reqCommentType {
  username: string | null;
  review_id: number;
  content: string;
}

export const postReview = async (
  payload: reviewReqType,
  username: string | null,
  clothesId: string | null
) => {
  if (typeof username === "string" && typeof clothesId === "string") {
    const response = await client.post(
      `/api/clothes/review/${username}/${clothesId}/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } else {
    alert("wrong approach");
  }
};

export const postComment = async (payload: reqCommentType) => {
  if (
    typeof payload.username === "string" &&
    typeof payload.review_id === "number"
  ) {
    const response = await client.post(
      `/api/clothes/comment/${payload.username}/${payload.review_id}/`,
      {
        content: payload.content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } else {
    alert("wrong approach");
  }
};
