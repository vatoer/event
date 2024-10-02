import { UserButton } from "@/components/user/user-button";
import { getSumCheckin } from "@/data/guest";
import AttendancePieChart, { AttendanceData } from "./_components/pie";


const EvenPage = async () => {
  const attendanceSummary = await getSumCheckin("resdip79");
  let pieData: AttendanceData = {
    attending: 0,
    notattending: 0,
  };
  attendanceSummary.forEach((item) => {
    switch (item.checkin) {
      case "ATTENDING":
        pieData.attending = Number(item.count);
        break;
      case "NOTATTENDING":
        pieData.notattending = Number(item.count);
        break;
      
    }
  });

  console.log(attendanceSummary);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-row w-full justify-end p-4">
        <UserButton />
      </div>
      <h1 className="text-lg font-semibold">Summary Attendance</h1>

      <div className="flex flex-col w-2/3 gap-10 items-center justify-center">
        <div className="flex items-center justify-center border border-gray-300 rounded-md text-sm w-full h-max-[500px]  py-10">
          <AttendancePieChart data={pieData} />
        </div>
      </div>

      <div className="mt-10 w-2/3">
        <div className="overflow-x-auto">
          <div className="min-w-full shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
              <div className="px-5 py-3 border-b-2 border-gray-200">Attendance</div>
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

      

    </div>
  );
};

export default EvenPage;
