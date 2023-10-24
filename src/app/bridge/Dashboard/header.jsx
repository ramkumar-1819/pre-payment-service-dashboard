import VSLOGO from "@/app/components/vslogo";

const DashboardHead = () => {
    return (
        <header className="shadow-sm p-6 flex justify-between items-center bg-white">
            <VSLOGO />
            <button type="button" className="font-semibold">Log out {'->'}</button>
        </header>
    )
}

export default DashboardHead;
