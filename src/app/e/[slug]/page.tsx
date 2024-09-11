import RSVPChart from "@/components/rsvp-chart";
import RSVPPieChart, { RSVPData } from "@/components/rsvp-pie-chart";
import { getRsvpSummaryByResponse,getRsvpSummaryByResponseUpdatedByAdmin } from "@/data/rsvp";

const EvenPage = async () => {
  const rsvpSummary = await getRsvpSummaryByResponse("resdip79");
  const rsvpSummaryUpdated = await getRsvpSummaryByResponseUpdatedByAdmin("resdip79");
  let pieData: RSVPData = {
    accept: 0,
    decline: 0,
    represented: 0,
    notresponding: 0,
  };
  rsvpSummary.forEach((item) => {
    switch (item.rsvp_response) {
      case "YES":
        pieData.accept = Number(item.count);
        break;
      case "NO":
        pieData.decline = Number(item.count);
        break;
      case "REPRESENTEDBY":
        pieData.represented = Number(item.count);
        break;
      case "NOTRESPONDING":
        pieData.notresponding = Number(item.count);
        break;
    }
  });

  let pieData2: RSVPData = {
    accept: 0,
    decline: 0,
    represented: 0,
    notresponding: 0,
  };
  rsvpSummaryUpdated.forEach((item) => {
    switch (item.rsvp_response) {
      case "YES":
        pieData2.accept = Number(item.count);
        break;
      case "NO":
        pieData2.decline = Number(item.count);
        break;
      case "REPRESENTEDBY":
        pieData2.represented = Number(item.count);
        break;
      case "NOTRESPONDING":
        pieData2.notresponding = Number(item.count);
        break;
    }
  });
  console.log(rsvpSummary);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-lg font-semibold">Summary RSVP</h1>

      <div className="flex flex-col w-2/3 gap-10 items-center justify-center">
        <div className="flex items-center justify-center border border-gray-300 rounded-md text-sm w-full h-max-[500px]  py-10">
          <RSVPPieChart data={pieData} />
        </div>
      </div>

      <div className="mt-10 w-2/3">
        <div className="overflow-x-auto">
          <div className="min-w-full shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
              <div className="px-5 py-3 border-b-2 border-gray-200">Response</div>
              <div className="px-5 py-3 border-b-2 border-gray-200">Jumlah</div>
            </div>
            {Object.entries(pieData).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 bg-white text-sm">
                <div className="px-5 py-5 border-b border-gray-200">{key}</div>
                <div className="px-5 py-5 border-b border-gray-200">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-lg font-semibold">Summary RSVP Updated By admin</h1>

      <div className="flex flex-col w-2/3 gap-10 items-center justify-center">
        <div className="flex items-center justify-center border border-gray-300 rounded-md text-sm w-full h-max-[500px]  py-10">
          <RSVPPieChart data={pieData2} />
        </div>
      </div>

      <div className="mt-10 w-2/3">
        <div className="overflow-x-auto">
          <div className="min-w-full shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
              <div className="px-5 py-3 border-b-2 border-gray-200">Response</div>
              <div className="px-5 py-3 border-b-2 border-gray-200">Jumlah</div>
            </div>
            {Object.entries(pieData2).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 bg-white text-sm">
                <div className="px-5 py-5 border-b border-gray-200">{key}</div>
                <div className="px-5 py-5 border-b border-gray-200">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default EvenPage;
