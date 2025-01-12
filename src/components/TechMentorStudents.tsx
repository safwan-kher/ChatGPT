import { FC, useRef, useState } from "react";

const colors = [
  "#EDE8FF",
  "#FFF8D7",
  "#E0F0FF",
  "#DFF9DC",
  "#FFE9FA",
  "#E0E5FF",
  "#DDF9FF",
  "#F1F1F1",
  "#FFEBDC",
];

export const TechMentorStudents: FC<{ tech_mentor_students: any }> = ({
  tech_mentor_students,
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
      <div className="max-w-2xl lg:max-w-7xl mx-auto px-4">
        <h2 className="text-center lg:text-left max-w-3xl text-3xl lg:text-4xl font-[700]">
          {tech_mentor_students.title}
        </h2>
        <div className="mt-8 flex gap-6 justify-center lg:justify-start">
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
            disabled={position >= tech_mentor_students.students.length - 1}
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
      <div className="mt-8 lg:mt-16 overflow-x-clip">
        <div className="max-w-2xl lg:max-w-7xl mx-auto px-4">
          <ul
            ref={testimonialContainerRef}
            style={{ translate: `-${getTestimonialWidth() * position}px` }}
            className="flex space-x-5 transition-all duration-500"
          >
            {tech_mentor_students.students.map(
              ({ name, testimonial, location, image, job }, index) => (
                <li
                  className="list-none relative w-[calc(100%-10px)] lg:w-[calc(50%-10px)] flex-shrink-0 bg-gray-50 rounded-lg p-7 lg:p-10"
                  ref={testimonialRef}
                  key={index}
                >
                  <svg
                    width="194"
                    height="141"
                    viewBox="0 0 194 141"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 right-0"
                  >
                    <path
                      opacity="0.03"
                      d="M34.0081 134.746L35.4975 136.827L37.7874 135.684L36.4478 133C37.7874 135.684 37.789 135.683 37.7908 135.683L37.7955 135.68L37.8091 135.673L37.8527 135.651C37.8891 135.633 37.94 135.607 38.0049 135.573C38.1346 135.506 38.3204 135.408 38.5585 135.279C39.0346 135.022 39.7203 134.64 40.5854 134.132C42.3153 133.114 44.7651 131.585 47.6946 129.514C53.5504 125.373 61.3433 119.052 69.1359 110.301C84.7437 92.7749 100.343 65.4978 100.343 26.6274C100.343 -2.26052 77.8059 -25 51.6716 -25C25.6618 -25 3 -2.38749 3 23.5882C3 48.2813 23.4789 69.935 47.8453 72.0134C44.5362 83.3268 38.0078 92.3007 31.9882 98.6431C28.685 102.123 25.5662 104.778 23.282 106.557C22.141 107.445 21.2116 108.112 20.5758 108.552C20.258 108.772 20.0138 108.934 19.8537 109.04C19.7736 109.092 19.7146 109.13 19.6779 109.154L19.6397 109.178L19.636 109.18L19.6345 109.181L19.6336 109.182L19.6335 109.182L16.9241 110.872L18.7842 113.471L34.0081 134.746ZM146.665 134.746L148.154 136.827L150.444 135.684L149.104 133C150.444 135.684 150.446 135.683 150.447 135.683L150.452 135.68L150.466 135.673L150.509 135.651C150.546 135.633 150.597 135.607 150.662 135.573C150.791 135.506 150.977 135.408 151.215 135.279C151.691 135.022 152.377 134.64 153.242 134.132C154.972 133.114 157.422 131.585 160.351 129.514C166.207 125.373 174 119.052 181.793 110.301C197.4 92.7749 213 65.4978 213 26.6274C213 -2.26052 190.463 -25 164.328 -25C138.318 -25 115.657 -2.38749 115.657 23.5882C115.657 48.2813 136.136 69.935 160.502 72.0134C157.193 83.3268 150.664 92.3007 144.645 98.6431C141.342 102.123 138.223 104.778 135.939 106.557C134.798 107.445 133.868 108.112 133.232 108.552C132.915 108.772 132.671 108.934 132.51 109.04C132.472 109.065 132.438 109.087 132.409 109.106C132.378 109.126 132.353 109.141 132.335 109.154L132.296 109.178L132.293 109.18L132.291 109.181L132.29 109.182L132.29 109.182L129.581 110.872L131.441 113.471L146.665 134.746Z"
                      stroke="black"
                      stroke-width="6"
                    />
                  </svg>

                  <div
                    style={{ backgroundColor: colors[index] }}
                    className="text-xl font-bold-x py-2 px-4 w-max rounded-sm relative"
                  >
                    {job}
                  </div>
                  <div className="flex items-center gap-4 mt-8">
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
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
