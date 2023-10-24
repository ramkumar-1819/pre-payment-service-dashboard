const AvailableServices = ({ services = [] }) => {
  const tableHead = ["S.No", "Service ID", "Service Name", "Edit"];
  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold">Available Services</h2>
      <div className="my-4 overflow-auto">
        {services.length > 0 ? (
          <table className="border border-collapse w-full text-center rounded-md">
            <thead>
              <tr>
                {tableHead.map((head) => (
                  <th key={head} className="font-semibold p-3 border">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
                {services.map(({serviceName, serviceId}, index)=>(
                    <tr key={serviceId}>
                        <td className="p-3 border">{index + 1}.</td>
                        <td className="p-3 border">{serviceId}</td>
                        <td className="p-3 border">{serviceName}</td>
                        <td className="p-3 border">{'->'}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default AvailableServices;
