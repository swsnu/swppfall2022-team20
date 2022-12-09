import client from "./client";

export interface postResType {
  username: string;
  password: string;
}

export interface userType {
  username: string;
  password: string;
}

export interface registerReqType extends userType {
  nickname: string;
  email: string;
  length: string;
  waist_size: string;
  thigh_size: string;
  calf_size: string;
}

export interface profileType extends userType {
  nickname: string;
  email: string;
  length: string;
  waist_size: string;
  thigh_size: string;
  calf_size: string;
}

export const token = async () => {
  const response = await client.get<undefined>(`/api/clothes/csrf_token/`);
  return response.data;
};

export const reqRegister = async (payload: registerReqType) => {
  const response = await client.post<postResType>(
    `/api/clothes/signup/`,
    payload
  );
  return response.data;
};

export const login = async (payload: userType) => {
  const response = await client.post<postResType>(
    `/api/clothes/login/`,
    payload
  );
  return response.data;
};

export const reqProfile = async (username: string) => {
  const response = await client.get<profileType>(
    `/api/clothes/profile/${username}/`
  );
  return response.data;
};
