"use client"
import { useState } from "react";
import DashboardFilter from "./filter";
import DashboardHead from "./header";
import AvailableServices from "./serviceLists";

const DashboardMain = ({services = []}) => {
    // state.
    const [availableServices, setAvailableServices] = useState(services);   
    return (
        <main className="bg-[#f9f9ff] text-black h-screen">
            <DashboardHead />
            <DashboardFilter />
            <AvailableServices services={availableServices} />
        </main>
    )
}

export default DashboardMain;
