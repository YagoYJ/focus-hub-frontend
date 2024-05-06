"use server";

import { api } from "@/lib/api";
import { ErrorResponse, Priority } from "./types";
import axios, { AxiosError } from "axios";
import { z } from "zod";

const getPrioritiesByGroupSchema = z.object({
  groupId: z.string().uuid(),
  limit: z.number(),
});

type GetPrioritiesByGroup = z.infer<typeof getPrioritiesByGroupSchema>

export async function getPrioritiesByGroup({
  groupId,
  limit,
}: GetPrioritiesByGroup): Promise<Priority[] | ErrorResponse> {
  try {
    const { data } = await api.get<Priority[]>(`/groups/${groupId}/priorities`, {
      params: {
        limit,
      },
    });
    
    return data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response)  {
      return error.response.data
    } else {
      return {
        name: "Unexpected error",
        message: "An unexpected error ocurred"
      }
    }
  }
}
