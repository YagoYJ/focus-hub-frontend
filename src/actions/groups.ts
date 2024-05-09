"use server";

import { api } from "@/lib/api";
import { CreateGroup, Group } from "./types";
import axios, { AxiosError } from "axios";

export async function getGroups() {
  const { data } = await api.get<Group[]>("/groups");

  return data;
}

export async function createGroup({ name }: CreateGroup) {
  try {
    const {data} = await api.post<Group>("/groups", { name });

    return data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error ocurred");
    }
  }
}
