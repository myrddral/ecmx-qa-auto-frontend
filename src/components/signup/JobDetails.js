import cx from "classnames";

const JobDetails = ({ errors, values, handleChange }) => (
  <>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">Employer Name</label>
          <div className="control">
            <input
              name="employerName"
              className={cx("input", !!errors.employerName && "is-danger")}
              type="text"
              placeholder="Employer Name"
              value={values.employerName}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <p className="help is-danger">{errors.employerName}</p>
          )}
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">Designation</label>
          <div className="control">
            <input
              name="designation"
              className={cx("input", !!errors.designation && "is-danger")}
              type="text"
              placeholder="Designation"
              value={values.designation}
              onChange={handleChange}
            />
          </div>
          {errors.designation && (
            <p className="help is-danger">{errors.designation}</p>
          )}
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">Total Experience</label>
          <div className="control">
            <input
              name="totalExperience"
              className="input"
              type="text"
              placeholder="Total Experience"
              value={values.totalExperience}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input
              name="city"
              className="input"
              type="text"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default JobDetails;
