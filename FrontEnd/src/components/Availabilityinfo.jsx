import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { deleteAvailability, editAvailability } from "../api/availability.api";
import toast, { Toaster } from "react-hot-toast";

function AvailabilityInfo({ userAvailability, day, setEdit }) {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [isEditItem, setIsEditItem] = useState(false);
  const [availabilityId, setAvailabilityId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (!userAvailability.loading && userAvailability.message === undefined) {
      const filteredItems = userAvailability.filter(
        (item) => item.availability_day === day
      );

      filteredItems.sort((a, b) => {
        a = a.availability_start_time.split(":");
        b = b.availability_start_time.split(":");
        return a[0] - b[0] || a[1] - b[1];
      });

      const modifiedItems = filteredItems.map((item) => ({
        ...item,
        availability_start_time: item.availability_start_time.slice(0, 5),
        availability_end_time: item.availability_end_time.slice(0, 5),
      }));

      setAvailabilityList(modifiedItems);
    }
  }, [userAvailability, day]);

  const onDelete = async (id) => {
    try {
      await deleteAvailability(id);
      toast.success("Availability deleted successfully", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      setAvailabilityList((prevList) =>
        prevList.filter((item) => item.availability_id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (item) => {
    setIsEditItem(true);
    setAvailabilityId(item.availability_id);
    setValue("availability_day", item.availability_day);
    setValue("availability_start_time", item.availability_start_time);
    setValue("availability_end_time", item.availability_end_time);
  };

  const onCancelEdit = () => {
    setIsEditItem(false);
    setAvailabilityId(null);
  };

  const onSubmitEdit = handleSubmit(async (data) => {
    try {
      await editAvailability(availabilityId, data);
      toast.success("Availability edited successfully", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });

      setIsEditItem(false);
      setAvailabilityId(null);

      
      setAvailabilityList((prevList) =>
        prevList.map((item) => {
          if (item.availability_id === availabilityId) {
            return {
              ...item,
              availability_start_time: data.availability_start_time,
              availability_end_time: data.availability_end_time,
            };
          }
          return item;
        })
      );

      reset();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <section>
      <Toaster />
      {isEditItem ? (
        <form onSubmit={onSubmitEdit}>
          <div className="availability_day_item">
            <div>
              De :{" "}
              <input type="time" {...register("availability_start_time")} />
              Hasta :{" "}
              <input type="time" {...register("availability_end_time")} />
            </div>
            <div>
              <button type="submit" className="availabilityPrimary_btn">
                {" "}
                ✔️
              </button>
              <button
                type="button"
                className="availabilitySecundary_btn"
                onClick={onCancelEdit}
              >
                ✖️
              </button>
            </div>
          </div>
        </form>
      ) : (
        availabilityList.map((item) => (
          <div key={item.availability_id} className="availability_day_item">
            <p>
              Start: {item.availability_start_time} - End:{" "}
              {item.availability_end_time}
            </p>
            <div>
              <button
                className="availabilityPrimary_btn"
                onClick={() => onEdit(item)}
              >
                🖊️
              </button>
              <button
                className="availabilitySecundary_btn"
                onClick={() => onDelete(item.availability_id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default AvailabilityInfo;
