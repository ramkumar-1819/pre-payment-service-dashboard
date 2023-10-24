import Image from "next/image";

const VSLOGO = ({className = ''}) => {
  return (
    <Image
      src="https://assets.vakilsearch.com/live-images/website_revamp/brandlogo.svg"
      width={150}
      height={20}
      alt="VSLOGO"
      className={className}
    />
  );
};

export default VSLOGO;
