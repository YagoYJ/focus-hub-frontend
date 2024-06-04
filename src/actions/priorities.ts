"use server";

import { api } from "@/lib/api";
import {
  CompletePriority,
  CreatePriority,
  EditPriority,
  ErrorResponse,
  Priority,
} from "./types";
import axios, { AxiosError } from "axios";
import { z } from "zod";

const getPrioritiesByGroupSchema = z.object({
  groupId: z.string().uuid(),
  limit: z.number().optional(),
});

type GetPrioritiesByGroup = z.infer<typeof getPrioritiesByGroupSchema>;

export async function getPrioritiesByGroup({
  groupId,
  limit,
}: GetPrioritiesByGroup): Promise<Priority[] | ErrorResponse> {
  try {
    const { data } = await api.get<Priority[]>(
      `/groups/${groupId}/priorities`,
      {
        params: {
          limit,
        },
      }
    );

    return data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        name: "Unexpected error",
        message: "An unexpected error ocurred",
      };
    }
  }
}

const getPriorityByIdSchema = z.object({
  groupId: z.string().uuid(),
  priorityId: z.string().uuid(),
});

type GetPriorityById = z.infer<typeof getPriorityByIdSchema>;

export async function getPriorityById({
  groupId,
  priorityId,
}: GetPriorityById): Promise<Priority | ErrorResponse> {
  try {
    const { data } = await api.get<Priority>(
      `/groups/${groupId}/priorities/${priorityId}`
    );

    return data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        name: "Unexpected error",
        message: "An unexpected error ocurred",
      };
    }
  }
}

export async function createPriority({
  name,
  description,
  groupId,
}: CreatePriority) {
  try {
    const { data } = await api.post<Priority>(`/groups/${groupId}/priorities`, {
      name,
      description,
    });

    return data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error ocurred");
    }
  }
}

export async function editPriority({
  name,
  description,
  groupId,
  priorityId,
}: EditPriority) {
  try {
    const { data } = await api.put<Priority>(
      `/groups/${groupId}/priorities/${priorityId}`,
      {
        name,
        description,
      }
    );

    return data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error ocurred");
    }
  }
}

export async function completePriority({
  groupId,
  priorityId,
}: CompletePriority) {
  try {
    const { data } = await api.patch<Priority>(
      `/groups/${groupId}/priorities/${priorityId}/complete`
    );

    return data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error ocurred");
    }
  }
}
