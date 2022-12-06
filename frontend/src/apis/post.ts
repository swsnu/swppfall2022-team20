import client from "./client";

export interface postResType {
  username: string;
}

export interface postReqType {
  username: string;
}

export interface reviewReqType extends postReqType {
  clothes_id: string;
  content: string;
  photo: string;
}

export const sendPostReview = async (
  payload: FormData,
  username: string | null,
  clothesId: string | null
) => {
  const response = await client.post(
    `/api/clothes/review/${username}/${clothesId}/`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
