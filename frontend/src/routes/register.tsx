import { zodResolver } from '@hookform/resolvers/zod';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Hexagon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/register')({
  component: Register,
});

const RegisterSchema = z
  .object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const defaultValues: RegisterSchema = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

type RegisterSchema = z.infer<typeof RegisterSchema>;

function Register() {
  const form = useForm<RegisterSchema>({ resolver: zodResolver(RegisterSchema), defaultValues });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    console.log(data);
  };

  return (
    <div className="grid h-full w-full lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to register your account</p>
          </div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>This is how others will see you</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
          <div className="mt-4 space-x-1 text-center text-sm">
            <span>Already have an account?</span>
            <Link to="/login" className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden place-items-center bg-muted lg:grid">
        <Hexagon className="size-96 fill-foreground object-cover" />
      </div>
    </div>
  );
}
