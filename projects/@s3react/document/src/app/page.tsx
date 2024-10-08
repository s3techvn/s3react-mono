"use client";
import { TextInput } from '@s3react/core/TextInput';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-center text-[24px] text-slate-100">Welcome to @s3react/mono</h1>
      <div className="my-10 text-slate-100">
        <TextInput />
      </div>
    </div>
  );
}
