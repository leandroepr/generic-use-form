"use client";

import { FormDialog, useDialog } from "@/components/custom/form-dialog";
import { TextInput } from "@/components/custom/text-input";
import { Button } from "@/components/ui/button";
import useForm, { zodResolver } from "@/lib/use-form";
import { z } from "zod";

const SignUpSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof SignUpSchema>;

export default function Home() {
  const { open, openDialog, closeDialog, formData } = useDialog();

  const { register, handleSubmit } = useForm<SignUpData>({
    state: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
    refine: {
      email: (value) => ({ email: value.toLowerCase() }),
    },
  });

  return (
    <main className="flex min-h-screen flex-col max-w-md m-auto py-8">
      <h1 className="text-xl font-bold">Simple example</h1>
      <div className="flex flex-col space-y-4 mt-4">
        <TextInput
          label="Name"
          placeholder="insert the name"
          {...register("name")}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="insert the email"
          {...register("email")}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="insert the password"
          {...register("password")}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="confirm the password"
          {...register("confirmPassword")}
        />
        <div className="flex flex-row justify-end flex-1">
          <Button type="button" onClick={handleSubmit(openDialog)}>
            Submit
          </Button>
        </div>
      </div>
      <FormDialog open={open} onClose={closeDialog} formData={formData} />
    </main>
  );
}
