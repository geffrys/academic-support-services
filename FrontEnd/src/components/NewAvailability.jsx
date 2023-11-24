import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createAvailability } from "../api/availability.api";
import toast, { Toaster } from "react-hot-toast";

function NewAvailability({ userId, isEdit, setEdit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitCreate = handleSubmit(async (data) => {
    let isValid = true;
    if (data.availability_start_time.length === 0) {
      toast.error("Please select a start time", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.availability_end_time.length === 0) {
      toast.error("Please select an end time", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.availability_start_time >= data.availability_end_time) {
      toast.error("Please select a valid time range", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (isValid) {
      try {
        const res = await createAvailability(data);
        toast.success("Availability created successfully", {
          style: {
            borderRadius: "10px",
            background: "var(--background-color-dark)",
            color: "var(--primary-color)",
          },
        });
        setTimeout(() => {
          setEdit(false);
        }, 2000);
        return res;
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    setValue("availability_day", isEdit);
    setValue("user_id", userId);
  });

  return (
    <section>
      <Toaster />
      <form action="" onSubmit={onSubmitCreate}>
        <div className="availability_day_item">
          <div>
            De :
            <input type="time" {...register("availability_start_time")} />
            Hasta :
            <input type="time" {...register("availability_end_time")} />
          </div>
          <button type="submit" className="availabilityPrimary_btn">
            ✔️
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewAvailability;
