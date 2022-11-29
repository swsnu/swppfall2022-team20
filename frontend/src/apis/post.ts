import client from "./client";

export interface postResType {
  username: string;
  password: string;
}

export interface postReqType {
  username: string;
  password: string;
}

export interface registerReqType extends postReqType {
  nickname: string;
  email: string;
  length: string;
  waist_size: string;
  thigh_size: string;
  calf_size: string;
}

export const sendPostReq = async (payload: postReqType) => {
  const response = await client.post<postResType>(`/api/clothes/`, payload);
  return response.data;
};
