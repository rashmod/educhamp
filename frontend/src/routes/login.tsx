import { zodResolver } from '@hookform/resolvers/zod';
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { Hexagon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import env from '@/config/env';
import useAuth from '@/contexts/auth/use-auth';

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: ({ context }) => {
    if (context.auth.session.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const defaultValues: LoginSchema = {
  email: '',
  password: '',
};

type LoginSchema = z.infer<typeof LoginSchema>;

function Login() {
  const form = useForm<LoginSchema>({ resolver: zodResolver(LoginSchema), defaultValues });

  const { login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (login.isSuccess) {
      navigate({ to: '/' });
    }
  }, [login.isSuccess, navigate]);

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
    login.mutate(data);
  };

  return (
    <div className="grid h-full w-full lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link className="ml-auto inline-block text-sm underline">Forgot your password?</Link>
                    </div>
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

              <Button type="button" className="w-full" variant="secondary">
                <Link to={`${env.VITE_BACKEND_API_URL}/user/google`}>Login with Google</Link>
              </Button>
            </form>
          </Form>
          <div className="mt-4 space-x-1 text-center text-sm">
            <span>Don't have an account?</span>
            <Link to="/register" className="underline">
              Register
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
