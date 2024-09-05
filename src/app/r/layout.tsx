import Image from "next/image";

const RsvpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col w-full justify-center items-center bg-gray-800 border-customRed border">
      <div className="flex flex-col min-h-screen md:max-w-[600px] w-full border-t-2 border-customRed bg-white">
        <div className="flex flex-row h-24 w-full ">
        <div className="w-1/3 flex justify-start items-center">
            <Image
              src="/images/logo-sekunder-warna.png"
              alt="Ambassade de Indonesie"
              width={52}
              height={52}
              className="w-auto h-16" // Tailwind classes for width and height

            />
          </div>
          <div className="w-1/3 flex justify-center items-center">
            <Image
              src="/images/logo-garuda.png"
              alt="Ambassade de Indonesie"
              width={52}
              height={52}
              className="w-auto h-16" // Tailwind classes for width and height
            />
          </div>
        </div>

        <div className="flex-grow">{children}</div>
        <div className="relative h-24 w-full">
        <Image
            src="/images/elemen-grafis-5x1-putih.png"
            alt="Ambassade de Indonesie"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default RsvpLayout;
