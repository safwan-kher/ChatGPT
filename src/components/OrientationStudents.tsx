import { FC, useRef, useState } from "react";

type StudentTestimonialsProps = {
  students: {
    name: string;
    testimonial: string;
    location: string;
    image: any;
    journey: {
      logo: any;
      name: string;
      company: string;
    }[];
  }[];
  title: string;
  subtitle: string;
};

export const OrientationStudents: FC<StudentTestimonialsProps> = ({
  students,
  title,
  subtitle,
}) => {
  const [position, setPosition] = useState(0);
  const testimonialRef = useRef<HTMLLIElement | null>(null);
  const testimonialContainerRef = useRef<HTMLUListElement | null>(null);

  const getTestimonialWidth = (): number => {
    return testimonialRef.current
      ? testimonialRef.current.clientWidth + 20
      : 400;
  };

  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center lg:text-left max-w-3xl text-3xl lg:text-4xl font-[700]">
          {title}
        </h2>
        <div className="mt-4 flex flex-col lg:flex-row justify-between items-center gap-6 lg:items-end">
          <p className="text-center lg:text-left max-w-3xl text-xl lg:text-2xl">
            {subtitle}
          </p>
          <div className="flex gap-6">
            <button
              disabled={position <= 0}
              onClick={() => setPosition((cur) => cur - 1)}
              className="w-12 h-12 flex group items-center justify-center rounded-full border disabled:border-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-gray-200 border-gray-700 text-gray-700 bg-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M7.825 13H20V11H7.825L13.425 5.4L12 4L4 12L12 20L13.425 18.6L7.825 13Z" />
              </svg>
            </button>
            <button
              disabled={position >= students.length - 1}
              onClick={() => setPosition((cur) => cur + 1)}
              className="w-12 h-12 flex items-center justify-center group rounded-full border disabled:border-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-gray-200 border-gray-700 text-gray-700 bg-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 lg:mt-16 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4">
          <ul
            ref={testimonialContainerRef}
            style={{ translate: `-${getTestimonialWidth() * position}px` }}
            className="flex space-x-5 transition-all duration-500"
          >
            {students.map(
              ({ name, testimonial, location, journey, image }, index) => (
                <li
                  className="list-none w-[calc(100%-10px)] lg:w-[calc(50%-10px)] flex-shrink-0 bg-gray-50 rounded-lg p-7 lg:p-10 grid gap-8 lg:gap-4 grid-cols-1 lg:grid-cols-12"
                  ref={testimonialRef}
                  key={index}
                >
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4">
                      <img
                        width={150}
                        height={150}
                        className="w-16 h-16 rounded-full bg-gray-200 object-cover"
                        src={image.sizes.thumbnail}
                      />
                      <div>
                        <p className="uppercase font-[700] text-xl lg:text-2xl">
                          {name}
                        </p>
                        <p className="lg:text-xl">{location}</p>
                      </div>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: testimonial }}
                      className="lg:text-xl mt-6 space-y-2"
                    ></div>
                  </div>
                  <div className="lg:col-span-5 space-y-4">
                    {journey.map(({ logo, company, name }, index) => (
                      <div key={index}>
                        <div className="flex gap-4">
                          <div className="flex flex-col flex-shrink-0 gap-4 items-center">
                            <img
                              className="w-10 h-auto"
                              src={logo.sizes.medium}
                            />
                            <div
                              className={`${
                                index > 1 ? "hidden" : "block"
                              } w-px h-full bg-gray-300`}
                            ></div>
                          </div>
                          <div className="">
                            <p className="font-[700] text-base lg:text-lg">
                              {name}
                            </p>
                            <p className="text-base lg:text-lg mb-4">
                              {company}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
