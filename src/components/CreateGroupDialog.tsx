import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderIcon, Plus } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
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
import { createGroupSchema } from "@/actions/types";
import { useCreateGroup } from "@/data/groups/useGetGroups";
import { useState } from "react";

export function CreateGroupDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createGroup, isPending } = useCreateGroup({
    closeDialog: () => setIsOpen(false)
  });
  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof createGroupSchema>) {
      createGroup(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="h-52 border-dashed cursor-pointer hover:bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center gap-2 h-full">
            <Plus />
            <span>Create a group</span>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new group</DialogTitle>
          <DialogDescription>
            Priority in first place! Give a name to your new group and
            let&apos;s go!
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isPending ? (
              <Button className="self-end" type="submit" disabled>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </Button>
            ) : (
              <Button className="self-end" type="submit">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
