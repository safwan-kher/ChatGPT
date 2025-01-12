export const OrientationCompassCourseSteps = ({
  orientation_compass_course_steps,
}: {
  orientation_compass_course_steps: any;
}) => {
  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto w-full px-4 pb-16 pt-32">
      <h2 className="text-center font-[700] text-3xl lg:text-4xl">
        {orientation_compass_course_steps.title}
      </h2>
      <p className="text-center text-xl lg:text-2xl mt-4">
        {orientation_compass_course_steps.subtitle}
      </p>
      <div className="grid lg:grid-cols-3 gap-0 lg:gap-32">
        {orientation_compass_course_steps.steps.map((step, index) => (
          <div key={step.title}>
            <div className="ml-8 lg:ml-0 flex items-center">
              <p className="text-[200px] font-[700] text-white text-str text-stroke">
                {index + 1}
              </p>
              <img
                className="max-w-64 h-auto max-h-48 w-auto -ml-20"
                src={step.image.sizes.medium}
                width={step.image.sizes["medium-width"]}
                height={step.image.sizes["medium-height"]}
              />
            </div>
            <h3 className="text-center lg:text-left font-[700] text-2xl lg:text-3xl">
              {step.title}
            </h3>
            <p className="text-center lg:text-left font-[700] text-xl lg:text-2xl text-indigo-700 mt-2 lg:mt-3">
              {step.subtitle}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: step.description }}
              className="text-center lg:text-left mt-2 lg:mt-4 text-xl lg:text-2xl"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
