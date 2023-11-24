import GroupRows from "./GroupRows";
function GrouptTable() {
  return (
    <>
      <h2 className="table_titles">Grupal Sessions</h2>
      <section className="appointments_content__container">
        <table className="appointments__table">
          <thead>
            <tr>
              <th>Days</th>
              <th>Topic</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            <GroupRows />
          </tbody>
        </table>
      </section>
    </>
  );
}

export default GrouptTable;
