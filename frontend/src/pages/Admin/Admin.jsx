import React from "react";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="AdminBody display-table ">
      <section className="AdminRow display-table-row">
        <div className="AdminCol-1 display-table-cell" id="side-menu">
          <h1>Navigation</h1>
        </div>

        <div className="AdminCol-2 display-table-cell valign-top"></div>
      </section>
    </div>
  );
};

export default Admin;
