import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/Dialog";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { createPrioritySchema } from "@/actions/types";
import { useState } from "react";
import { Textarea } from "./ui/Textarea";
import { useCreatePriority } from "@/data/priorities/useCreatePriority";
import { useParams } from "next/navigation";

export function CreatePriorityDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { groupId } = useParams<{ groupId: string }>();

  const form = useForm<z.infer<typeof createPrioritySchema>>({
    resolver: zodResolver(createPrioritySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate: createPriority, isPending } = useCreatePriority({
    closeDialog: () => setIsOpen(false),
    clearInputs: form.reset,
  });

  function onSubmit(values: z.infer<typeof createPrioritySchema>) {
    createPriority({ ...values, groupId });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add new item
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new priority</DialogTitle>
          <DialogDescription>
            Now it&apos;s time to get your hands dirty!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
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
                      disabled={isPending}
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
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="self-end" type="submit" isLoading={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
