import { FC } from "react";

type StudentJourneysProps = {
  journeys: [
    {
      name: string;
      location: string;
      picture: any;
      progress: [{ label: string; name?: string; icon: any }];
    }
  ];
};

export const StudentJourneys: FC<StudentJourneysProps> = ({ journeys }) => {
  return (
    <section className="my-12 lg:my-24 max-w-6xl mx-auto px-4 w-full">
      <ul className="flex flex-col lg:flex-row flex-wrap gap-x-16 gap-y-10">
        {journeys.map(({ name, location, progress, picture }, index) => {
          return (
            <li
              key={index}
              className={`bg-gray-100 px-2 py-4 lg:p-6 list-none flex-1 relative rounded-xl  ${
                index >= 2 ? "hidden lg:list-item" : ""
              } ${index === 2 ? "ml-16" : ""} ${index === 1 ? "lg:mr-16" : ""}`}
            >
              <div className="flex border-b border-gray-400 pb-2">
                <img
                  className="rounded-full w-12 h-12"
                  src={picture.sizes.thumbnail}
                  alt=""
                />
                <div className="ml-4">
                  <p className="uppercase text-xl font-bold leading-tight">
                    {name}
                  </p>
                  <p className="uppercase text-lg text-gray-600 leading-tight">
                    {location}
                  </p>
                </div>
              </div>
              <div className="flex justify-between leading-none text-gray-600 pt-2 text-xs lg:text-sm">
                {progress.map(
                  (
                    {
                      label: progressLabel,
                      name: progressName,
                      icon: progressImage,
                    },
                    progressIndex
                  ) => (
                    <div
                      key={progressIndex}
                      className={`flex items-center ${
                        progressIndex >= 1 ? "pl-4" : ""
                      }`}
                    >
                      <div className="flex flex-shrink-0 items-center">
                        <img
                          src={progressImage.sizes.thumbnail}
                          className="w-8 h-8 mr-1"
                          alt=""
                        />
                        <div className="text-gray-600 ">
                          <p className="uppercase font-bold">{progressLabel}</p>
                          <p className="uppercase whitespace-nowrap">
                            {progressName}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
