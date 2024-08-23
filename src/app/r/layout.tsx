import Image from "next/image";

const RsvpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col w-full justify-center items-center bg-gray-800">
      <div className="relative flex flex-col min-h-screen md:max-w-[600px] w-full border-t-2 border-customRed bg-white">
        <div className="flex flex-row w-full ">
          <div className="w-1/3">
            <Image
              src="/images/logo-sekunder-warna.png"
              alt="Ambassade de Indonesie"
              width={75}
              height={75}
            />
          </div>
          <div className="w-1/3 flex justify-center items-center">
            <Image
              src="/images/logo-garuda.png"
              alt="Ambassade de Indonesie"
              width={75}
              height={75}
            />
          </div>
        </div>

        <div className="flex-grow">{children}</div>
        <div className="absolute bottom-0 right-0 w-full">
        <Image
            src="/images/elemen-grafis-5x1-putih.png"
            alt="Ambassade de Indonesie"
            layout="responsive"
            width={250}
            height={50}
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default RsvpLayout;
