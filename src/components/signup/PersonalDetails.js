import cx from "classnames";

const PersonalDetails = ({ errors, values, handleChange }) => (
  <>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              name="firstName"
              className={cx("input", !!errors.firstName && "is-danger")}
              type="text"
              placeholder="First Name"
              value={values.firstName}
              onChange={handleChange}
            />
          </div>
          {errors.firstName && <p className="help is-danger">{errors.firstName}</p>}
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              name="lastName"
              className="input"
              type="text"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              name="email"
              className={cx("input", !!errors.email && "is-danger")}
              type="text"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="help is-danger">{errors.email}</p>}
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">Phone</label>
          <div className="control">
            <input
              name="phone"
              className={cx("input", !!errors.phone && "is-danger")}
              type="text"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && <p className="help is-danger">{errors.phone}</p>}
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              name="password"
              className={cx("input", !!errors.password && "is-danger")}
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className="help is-danger">{errors.password}</p>}
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">Password Confirmation</label>
          <div className="control">
            <input
              name="passwordConf"
              className={cx("input", !!errors.passwordConf && "is-danger")}
              type="password"
              placeholder="Email"
              value={values.passwordConf}
              onChange={handleChange}
            />
          </div>
          {errors.passwordConf && <p className="help is-danger">{errors.passwordConf}</p>}
        </div>
      </div>
    </div>
  </>
);

export default PersonalDetails;
