import cx from "classnames";

const ContactDetails = ({ errors, values, handleChange }) => (
  <>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">AddressType</label>
          <div className="control">
            <input
              name="addressType"
              className={cx("input", !!errors.addressType && "is-danger")}
              type="email"
              placeholder="AddressType"
              value={values.addressType}
              onChange={handleChange}
            />
          </div>
          {errors.addressType && <p className="help is-danger">{errors.addressType}</p>}
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <input
              name="country"
              className={cx("input", !!errors.country && "is-danger")}
              type="text"
              placeholder="country"
              value={values.country}
              onChange={handleChange}
            />
          </div>
          {errors.country && <p className="help is-danger">{errors.country}</p>}
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input
              name="city"
              className={cx("input", !!errors.city && "is-danger")}
              type="email"
              placeholder="houseNumber"
              value={values.city}
              onChange={handleChange}
            />
          </div>
          {errors.city && <p className="help is-danger">{errors.city}</p>}
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">Street</label>
          <div className="control">
            <input
              name="street"
              className={cx("input", !!errors.street && "is-danger")}
              type="text"
              placeholder="street"
              value={values.street}
              onChange={handleChange}
            />
          </div>
          {errors.street && <p className="help is-danger">{errors.street}</p>}
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <div className="field">
          <label className="label">HouseNumber</label>
          <div className="control">
            <input
              name="houseNumber"
              className={cx("input", !!errors.houseNumber && "is-danger")}
              type="email"
              placeholder="houseNumber"
              value={values.houseNumber}
              onChange={handleChange}
            />
          </div>
          {errors.houseNumber && <p className="help is-danger">{errors.houseNumber}</p>}
        </div>
      </div>
      <div className="column is-6">
        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input
              name="postcode"
              className={cx("input", !!errors.postcode && "is-danger")}
              type="text"
              placeholder="postcode"
              value={values.postcode}
              onChange={handleChange}
            />
          </div>
          {errors.postcode && <p className="help is-danger">{errors.postcode}</p>}
        </div>
      </div>
    </div>
  </>
);

export default ContactDetails;
