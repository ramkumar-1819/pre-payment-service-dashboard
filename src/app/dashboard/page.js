import axios from "axios";
import DashboardMain from "../bridge/Dashboard";

export default async function Dashboard() {
  let services = [];
  try {
    const { data: { doc = [] } } = await axios({
      url: `${process.env.DOMAIN}/api/services/filter`,
      method: 'post',
      data: {},
      headers: {
        'xapikey': process.env.XAPI_KEY
      }
    });
    services = doc;
  } catch (err) {
    console.log('Error in fetching services', err);
  }
  return (
    <DashboardMain services={services} />
  );
}
