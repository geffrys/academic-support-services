function AvailabilityInfo({ userAvailability, day }) {
  const dayItems = [];
  if (!userAvailability.loading) {
    userAvailability.map((item) => {
      if (item.availability_day === day) {
        item.availability_start_time = item.availability_start_time.slice(0, 5);
        item.availability_end_time = item.availability_end_time.slice(0, 5);
        dayItems.push(item);
      }
    });
  }
  dayItems.sort((a, b) => {
    a = a.availability_start_time.split(":");
    b = b.availability_start_time.split(":");
    return a[0] - b[0] || a[1] - b[1];
  });
  return (
    <section>
      {dayItems.map((item) => {
        return (
          <div key={item.availability_id} className="availability_day_item">
            <p>
              De: {item.availability_start_time} - Hasta:{" "}
              {item.availability_end_time}
            </p>
            <div>
              <button className="availabilityPrimary_btn">🖊️</button>
              <button className="availabilitySecundary_btn">🗑️</button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default AvailabilityInfo;
