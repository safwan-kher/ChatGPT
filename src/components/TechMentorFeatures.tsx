import { FC } from "react";

export const TechMentorFeatures: FC<{ tech_mentor_features: any }> = ({
  tech_mentor_features,
}) => {
  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4">
      <div className="bg-gray-50 py-9 flex justify-center flex-wrap lg:grid lg:grid-cols-5 gap-y-9 gap-3 lg:gap-4 px-4 lg:px-12">
        {tech_mentor_features.features.map((feature) => (
          <div className="flex flex-col items-center">
            <div className="w-auto h-12 flex justify-center items-center">
              <img className="" src={feature.icon.sizes.medium} />
            </div>
            <p className="text-center text-xl lg:text-xl mt-3 min-w-24 w-min">
              {feature.feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
