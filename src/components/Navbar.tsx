import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search bar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src={"/search.png"} alt="search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search"
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* Icons */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full size-7 flex items-center justify-center cursor-pointer">
          <Image
            src={"/message.png"}
            alt="message icon"
            width={20}
            height={20}
          />
        </div>
        <div className="bg-white rounded-full size-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src={"/announcement.png"}
            alt="announcement icon"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 size-5 flex items-center justify-center bg-purple-500 text-white rounded-full">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-left capitalize">
            {user?.publicMetadata.role as string}
          </span>
        </div>
        {/* <Image
					src={"/avatar.png"}
					alt="avatar"
					width={36}
					height={36}
					className="rounded-full"
				/> */}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
