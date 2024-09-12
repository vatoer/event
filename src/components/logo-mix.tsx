import Image from "next/image";

export const LogoMix = () => {
  return (
    <div className="flex flex-row h-44 relative">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={72}
        height={144}
        className="mx-auto rounded-none hidden md:block w-full "
      />
      <Image
        src="/logo.png"
        alt="Logo"
        width={72}
        height={72}
        className="mx-auto rounded-none hidden md:block
            absolute top-10 right-0"
      />
    </div>
  );
};

export default LogoMix;
