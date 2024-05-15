'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormSchema } from '@/lib/utils';
import { z } from 'zod';

import CustomInput from './CustomInput';
import { Form } from './ui/form';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { register } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
    setLoading(true);
    console.log(1);
    try {
      await register(data);
      router.push('/connect-bank');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <CustomInput
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
          />
          <CustomInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Enter your first name"
          />
        </div>
        <CustomInput
          control={form.control}
          name="address1"
          label="Address"
          placeholder="Enter your specific address"
        />
        <CustomInput
          control={form.control}
          name="city"
          label="City"
          placeholder="Enter your city"
        />
        <div className="flex gap-4">
          <CustomInput
            control={form.control}
            name="state"
            label="State"
            placeholder="Example: NY"
          />
          <CustomInput
            control={form.control}
            name="postalCode"
            label="Postal Code"
            placeholder="Example: 11101"
          />
        </div>
        <div className="flex gap-4">
          <CustomInput
            control={form.control}
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            placeholder="YYYY-MM-DD"
          />
          <CustomInput
            control={form.control}
            name="ssn"
            label="SSN"
            placeholder="Example: 1234"
          />
        </div>
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
          type="password"
          placeholder="Enter your password"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="form-btn w-full mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          Already have an account?
        </p>
        <a
          className="text-14 cursor-pointer font-medium text-bankGradient"
          href="/sign-in"
        >
          Sign in
        </a>
      </footer>
    </Form>
  );
};

export default SignUpForm;
