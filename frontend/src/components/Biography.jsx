import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            We are the team behind your hospital's management system, a dedicated group working to ensure a smooth
            and efficient experience for both patients and staff.  Our roles encompass a wide range of specialties,
            from medical professionals providing top-notch care to administrative staff ensuring seamless operations.
            Doctors, nurses, and other clinicians utilize the system to manage patient records, appointments, and treatment plans
          </p>
         
          <p>
            Hospitals are lifelines in our communities, serving as central hubs for advanced medical care.  They bring together top professionals, cutting-edge technology, and a vast array of services, from emergency rooms to specialized treatments. This allows them to save lives in critical situations, provide comprehensive care for complex conditions, and  contribute to public health by researching and preventing diseases.  In essence, hospitals are there to ensure our well-being throughout life's health journey.
          </p>
         
        </div>
      </div>
    </>
  );
};

export default Biography;