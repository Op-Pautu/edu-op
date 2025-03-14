"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "../input-field";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  assignmentSchema,
  AssignmentSchema,
} from "@/lib/form-validiation-schemas";
import { useFormState } from "react-dom";
// import { createAssignment, updateAssignment } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AssignmentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema),
  });

  // const [state, formAction] = useFormState(
  //   type === "create" ? createAssignment : updateAssignment,
  //   {
  //     success: false,
  //     error: false,
  //   }
  // );

  // const onSubmit = handleSubmit((data) => {
  //   formAction(data);
  // });

  const router = useRouter();

  // useEffect(() => {
  //   if (state.success) {
  //     toast(
  //       `Assignment has been ${type === "create" ? "created" : "updated"}!`
  //     );
  //     setOpen(false);
  //     router.refresh();
  //   }
  // }, [state, router, type, setOpen]);

  const { results } = relatedData;

  return (
    <form
      className="flex flex-col gap-8"
      // onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new result" : "Update the result"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Student Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          // error={errors.name}
        />
        <InputField
          label="Score"
          name="score"
          defaultValue={data?.score}
          register={register}
          // error={errors.dueDate}
          type="number"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Result</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            // {...register("lessonId")}
            defaultValue={data?.lessonId}
          >
            {results.map((result: { id: number; name: string }) => (
              <option value={result.id} key={result.id}>
                {result.name}
              </option>
            ))}
          </select>
          {/* {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
            </p>
          )} */}
        </div>
      </div>

      {/* {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )} */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AssignmentForm;
