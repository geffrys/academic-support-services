import SessionRows from "./SessionRows";

function SessionTable() {
  return (
    <>
      <h2 className="table_titles">Individual Sessions</h2>
      <section className="appointments_content__container">
        <table className="appointments__table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Topic</th>
              <th>Teacher</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            <SessionRows />
          </tbody>
        </table>
      </section>
    </>
  );
}

export default SessionTable;
