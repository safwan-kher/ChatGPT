import { FC, useRef, useState } from "react";

type StudentTestimonialsProps = {
  testimonials: [
    { picture: any; name: string; testimonial: string; location: string }
  ];
  heading?: string;
};

export const StudentTestimonials: FC<StudentTestimonialsProps> = ({
  testimonials,
  heading,
}) => {
  const [position, setPosition] = useState(0);
  const testimonialRef = useRef<HTMLLIElement | null>(null);

  const getTestimonialWidth = (): number => {
    return testimonialRef.current
      ? testimonialRef.current.clientWidth + 48
      : 400;
  };

  return (
    <section className="my-24">
      {heading && (
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h2 className="text-5xl font-[700]">{heading}</h2>
          <img src="/assets/floaters/pin.png" alt="" />
        </div>
      )}
      <div className="mt-16 overflow-x-clip">
        <div className="max-w-6xl mx-auto px-4">
          <ul
            style={{ translate: `-${getTestimonialWidth() * position}px` }}
            className="flex space-x-12 transition-all duration-500"
          >
            {testimonials.map(
              ({ picture, name, testimonial, location }, index) => (
                <li
                  className="list-none w-[calc(100%-32px)] sm:w-[332px] flex-shrink-0"
                  ref={testimonialRef}
                  key={index}
                >
                  <div className="relative w-full">
                    <div className="absolute inset-0 translate-y-8 -translate-x-2">
                      <svg
                        viewBox="0 0 333 334"
                        fill="none"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                      >
                        <path
                          d="M332.465 4.62501C332.465 2.69201 330.898 1.125 328.965 1.125H4.21362C2.19449 1.125 0.594147 2.8288 0.72049 4.84399L21.1038 329.983C21.2356 332.085 23.1809 333.595 25.2502 333.202L329.618 275.373C331.27 275.06 332.465 273.616 332.465 271.935V4.62501Z"
                          stroke="#481BFF"
                        />
                      </svg>
                    </div>

                    <div
                      style={{
                        clipPath: "url(#card)",
                      }}
                      className="bg-indigo-700 text-white flex-shrink-0 px-6 py-12"
                    >
                      <div
                        style={{
                          backgroundImage: "url('/assets/quotes.svg')",
                        }}
                        className="bg-no-repeat pt-20 pb-4 px-6"
                      >
                        <p className="text-xl">{testimonial}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full flex flex-col items-end pr-8 -mt-8">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={picture.sizes.thumbnail}
                      alt=""
                    />
                    <p className="uppercase font-bold text-xl tracking-wide">
                      {name}
                    </p>
                    <p className="uppercase text-gray-500 tracking-wide -mt-1">
                      {location}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto w-full px-4 flex justify-end mt-8">
        <button
          disabled={position <= 0}
          onClick={() => setPosition((cur) => cur - 1)}
          className="mr-10 w-12 h-12 flex group items-center justify-center rounded-full border disabled:border-indigo-200 disabled:text-indigo-200 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-indigo-200 border-indigo-700 text-indigo-700 bg-white"
        >
          <svg
            width="11"
            height="16"
            viewBox="0 0 11 16"
            className="group-disabled:fill-indigo-200 fill-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.5468 14.1067L4.44008 8L10.5468 1.88L8.66675 0L0.666748 8L8.66675 16L10.5468 14.1067Z" />
          </svg>
        </button>
        <button
          disabled={position >= testimonials.length - 1}
          onClick={() => setPosition((cur) => cur + 1)}
          className="w-12 h-12 flex items-center justify-center group rounded-full border disabled:border-indigo-200 disabled:text-indigo-200 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-indigo-200 border-indigo-700 text-indigo-700 bg-white"
        >
          <svg
            width="11"
            height="16"
            viewBox="0 0 11 16"
            className="group-disabled:fill-indigo-200 fill-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.453249 14.1067L6.55992 8L0.453249 1.88L2.33325 0L10.3333 8L2.33325 16L0.453249 14.1067Z" />
          </svg>
        </button>
      </div>
    </section>
  );
};
