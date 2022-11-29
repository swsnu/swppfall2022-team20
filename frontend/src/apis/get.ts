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
  size: sizeType[];
}

export const getClothes = async () => {
  const response = await client.get<clothesType[]>(`/api/clothes/main/`);
  return response.data;
};
