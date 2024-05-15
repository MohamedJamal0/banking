'use client';
import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from './CustomInput';
import { Button } from './ui/button';
import { loginFormSchema } from '@/lib/utils';
import { login } from '@/lib/actions/user.actions';
import { Loader2 } from 'lucide-react';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    const response = await login(data);

    if (response.error) {
      setError(response?.error);
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <CustomInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        <Button type="submit" disabled={isLoading} className="form-btn w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign in
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          Don't have an account?
        </p>
        <a
          className="text-14 cursor-pointer font-medium text-bankGradient"
          href="/sign-up"
        >
          Sign up
        </a>
      </footer>
    </Form>
  );
};
