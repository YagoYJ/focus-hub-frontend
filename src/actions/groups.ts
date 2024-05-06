"use server";

import { api } from "@/lib/api";
import { Group } from "./types";

export async function getGroups() {
  const { data } = await api.get<Group[]>("/groups");

  return data;
}
