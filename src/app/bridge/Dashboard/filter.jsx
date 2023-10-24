"use client";
import { useState } from "react";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import AddNewService from "./addService";

const DashboardFilter = () => {
  // state.
  const [filterForm, setFilterForm] = useState({
    serviceId: "",
    serviceName: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFilterForm({ ...filterForm, [name]: value });
  };

  return (
    <section className="flex justify-between items-center border-b p-4">
      <form className="flex items-center gap-4">
        <Input
          type="number"
          value={filterForm["serviceId"]}
          onChange={changeHandler}
          direction="left"
          name="serviceId"
          placeholder="Search by Service ID"
        />
        <Input
          type="text"
          value={filterForm["serviceName"]}
          onChange={changeHandler}
          direction="left"
          name="serviceName"
          placeholder="Search by Service Name"
          className={{ root: "w-[450px]", input: "w-full" }}
        />
        <Button label="Search" className="w-[200px]" />
      </form>
      <AddNewService />
    </section>
  );
};

export default DashboardFilter;
