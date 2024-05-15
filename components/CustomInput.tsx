'use client';

import React from 'react';

import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from './ui/form';

import { Input } from './ui/input';

interface CostumeInputProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const CustomInput = ({
  control,
  name,
  label,
  type = 'text',
  placeholder,
}: CostumeInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1.5">
          <FormLabel className="w-full max-w-[280px] font-medium text-14 text-gray-700">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              className="input-class"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-500 text-sm" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
