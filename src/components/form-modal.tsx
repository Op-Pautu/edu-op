"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
// import { StudentForm } from "@/components/forms/student-form";
// import { TeacherForm } from "@/components/forms/teacher-form";
const TeacherForm = dynamic(
  () => import("./forms/teacher-form").then((mod) => mod.TeacherForm),
  {
    loading: () => <h1>Loading...</h1>,
  }
);

const StudentForm = dynamic(
  () => import("./forms/student-form").then((mod) => mod.StudentForm),
  {
    loading: () => <h1>Loading...</h1>,
  }
);

interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "assigment"
    | "result"
    | "exam"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}
const forms: {
  [key: string]: (type: "create" | "update", data?: any) => React.ReactElement;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

export const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const size = type === "create" ? "size-8" : "size-7";

  const bgColor =
    type === "create"
      ? "bg-opYellow"
      : type === "update"
      ? "bg-opSky"
      : "bg-opPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found"
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
      >
        <Image src={`/${type}.png`} alt="action" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-11/12 md:w-[70%] lg:w-[60%] xl:w-1/2 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image
                src={"/close.png"}
                alt="close icon"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
