"use client";
import { Priority, createPrioritySchema } from "@/actions/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { z } from "zod";
import { CompletePriorityButton } from "./CompletePriorityButton";
import { Button } from "./ui/Button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/Form";
import { Textarea } from "./ui/Textarea";
import { Input } from "./ui/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEditPriority } from "@/data/priorities/useEditPriority";

interface Props {
  priority: Priority;
}

export function PriorityEditForm({ priority }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof createPrioritySchema>>({
    resolver: zodResolver(createPrioritySchema),
  });

  const { mutate: editPriority, isPending } = useEditPriority({
    disableForm: () => setIsEditing(false),
  });

  function cancelEdit() {
    form.reset({
      name: priority.name,
      description: priority.description,
    });
    setIsEditing(false);
  }

  function onSubmit(values: z.infer<typeof createPrioritySchema>) {
    const { name, description } = values;
    const { groupId, id: priorityId } = priority;

    editPriority({
      name,
      description,
      groupId,
      priorityId,
    });
  }

  useEffect(() => {
    form.setValue("name", priority.name);
    form.setValue("description", priority.description);
  }, [form, priority.description, priority.name]);

  return (
    <Form {...form}>
      <form
        className="space-y-8 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type a good name!"
                  className="leading-relaxed"
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Talk more about this!"
                  className="leading-relaxed"
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!priority.completed && (
          <div className="w-full flex items-center justify-end gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={cancelEdit}
                  disabled={isPending}
                  type="button"
                >
                  Cancel
                </Button>

                <Button
                  className="self-end"
                  type="submit"
                  isLoading={isPending}
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Button type="button" onClick={() => setIsEditing(true)}>
                  <Pen size={15} className="mr-2" /> Edit
                </Button>

                <CompletePriorityButton
                  groupId={priority.groupId}
                  priorityId={priority.id}
                />
              </>
            )}
          </div>
        )}
      </form>
    </Form>
  );
}
