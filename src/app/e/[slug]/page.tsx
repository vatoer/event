import RSVPChart from "@/components/rsvp-chart";
import RSVPPieChart,{RSVPData} from "@/components/rsvp-pie-chart";
import { getRsvpSummaryByResponse } from "@/data/rsvp";

const EvenPage = async () => {
  const rsvpSummary = await getRsvpSummaryByResponse("resdip79");
  let pieData:RSVPData ={
    accept:0,
    decline:0,
    represented:0,
    notresponding:0
  };
  rsvpSummary.forEach(item => {
    switch (item.rsvp_response) {
      case 'YES':
        pieData.accept = Number(item.count);
        break;
      case 'NO':
        pieData.decline = Number(item.count);
        break;
      case 'REPRESENTEDBY':
        pieData.represented = Number(item.count);
        break;
      case 'NOTRESPONDING':
        pieData.notresponding = Number(item.count);
        break;
    }
  });
  console.log(rsvpSummary);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-lg font-semibold">Summary RSVP</h1>
      
      <div className="flex flex-col w-full gap-10 items-center justify-center">
        <div className="w-[500px] h-[500px] border-2 items-center text-sm justify-center">
          <RSVPPieChart data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default EvenPage;
