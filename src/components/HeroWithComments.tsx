import { FC } from "react";

interface HeroWithCommentsProps {
  title: string;
  description: any;
  comments: any[];
}

export const HeroWithComments: FC<HeroWithCommentsProps> = ({
  title,
  description,
  comments,
}) => {
  return (
    <section className="mt-32 mb-8 max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 lg:grid-rows-2 lg:grid-flow-col">
      <div className="order-1 lg:order-none row-span-2">
        <h1 className="text-5xl lg:text-7xl font-bold">{title}</h1>
        <div
          className="text-xl mt-4 hidden lg:block"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      <div
        className="text-xl mt-4 order-3 lg:order-none lg:hidden"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className="row-span-2 order-2 lg:order-none relative">
        <ul className="flex flex-col justify-between gap-y-8 pt-8 list-none">
          {comments.map(({ comment }, index) => {
            return (
              <li
                className={`bg-gray-100 px-2 py-4 lg:p-6 rounded-xl ${
                  index % 2 === 0 ? "lg:ml-16" : "lg:mr-16"
                }`}
              >
                <div className="flex border-b border-gray-400 pb-2">
                  <img
                    className="rounded-full w-12 h-12"
                    src={comment.image.sizes.thumbnail}
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="uppercase text-xl font-bold leading-tight">
                      {comment.name}
                    </p>
                    <p className="uppercase text-lg text-gray-600 leading-tight">
                      {comment.location}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-4 leading-none text-gray-600 pt-2 text-xs lg:text-sm">
                  <div className="flex items-center">
                    <img
                      src={comment.course_logo.sizes.thumbnail}
                      className="w-8 h-8 mr-1"
                      alt=""
                    />
                    <div className="uppercase font-bold ">
                      <p>{comment.course_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={comment.bootcamp_logo.sizes.thumbnail}
                      className="w-8 h-8 mr-1"
                      alt=""
                    />
                    <div className="text-gray-600 ">
                      <p className="uppercase font-bold">
                        {comment.bootcamp_label}
                      </p>
                      <p className="uppercase">{comment.bootcamp_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={comment.work_logo.sizes.thumbnail}
                      className="w-8 h-8 mr-1"
                      alt=""
                    />
                    <div className="text-gray-600 ">
                      <p className="uppercase font-bold">
                        {comment.work_position}
                      </p>
                      <p className="uppercase">{comment.work_name}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <img
          className="absolute top-0 right-0"
          src="/assets/floaters/like.png"
          alt=""
        />
      </div>
    </section>
  );
};
