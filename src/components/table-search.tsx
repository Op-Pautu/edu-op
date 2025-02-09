"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;

    const params = new URLSearchParams(window.location.search);
    if (searchValue) {
      params.set("search", searchValue);
      router.push(`${window.location.pathname}?${params}`);
    } else {
      params.delete("search");
      const newParams = params.toString();
      router.push(
        `${window.location.pathname}${newParams ? `?${newParams}` : ""}`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <Image src={"/search.png"} alt="search" width={14} height={14} />

      <input
        type="text"
        name="search"
        placeholder="Search"
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
  );
};
