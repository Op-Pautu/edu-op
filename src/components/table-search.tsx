"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import debounce from "lodash/debounce";

export const TableSearch = () => {
  const router = useRouter();

  const handleSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value) {
        params.set("search", value);
        router.push(`${window.location.pathname}?${params}`);
      } else {
        params.delete("search");
        const newParams = params.toString();
        router.push(
          `${window.location.pathname}${newParams ? `?${newParams}` : ""}`
        );
      }
    }, 300),
    [router]
  );

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src={"/search.png"} alt="search" width={14} height={14} />

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};
