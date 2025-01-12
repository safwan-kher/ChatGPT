import { FC } from "react";

interface CertificationProps {
  name: string;
  image: any;
  alt?: boolean;
}

export const Certification: FC<CertificationProps> = ({ name, image, alt }) => {
  return (
    <>
      {alt ? (
        <section className="mt-16 mb-16 max-w-6xl mx-auto px-4 w-full flex flex-col lg:flex-row items-center justify-center">
          <h2 className="text-lg text-center sm:text-left  text-indigo-700 uppercase">
            {name}
          </h2>
          <img
            className="mt-4 sm:mt-0 w-[85px]"
            src={image.sizes.medium}
            alt={image.alt}
          />
        </section>
      ) : (
        <section className="mt-16 mb-16 max-w-6xl mx-auto px-4 w-full flex flex-col-reverse lg:flex-row lg:items-center">
          <img
            className="lg:mr-10 mt-4 lg:mt-0 w-32"
            src={image.sizes.medium}
            alt={image.alt}
          />
          <h2 className="text-4xl lg:text-6xl font-bold">{name}</h2>
        </section>
      )}
    </>
  );
};
