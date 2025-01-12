import Button from "../src/components/Button";

const NotFoundPage = () => {
  return (
    <div className="no-match slider-block slider-block-first-load">
      <div className="row">
        <div className="col-1 col-0-sm" />
        <div className="col-10 col-12-sm">
          <div className="no-match__wrapper">
            <div className="no-match__content slider">
              <div className="no-match__content-wrapper">
                <h1>Page not found</h1>
                <p>
                  The page you are looking for doesn't seem to exists anymore.
                </p>
                <Button
                  label="Back to home"
                  variant="transparent-blue"
                  link="/"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 col-0-sm" />
      </div>
    </div>
  );
};

export default NotFoundPage;
