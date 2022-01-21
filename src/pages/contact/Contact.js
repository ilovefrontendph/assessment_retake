import React from "react";

function Contact() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <p>Phone: 0932390001 </p>
      <p>Address: UIC BANGKEROHAN</p>
      <iframe
        width="600"
        height="500"
        id="gmap_canvas"
        src="https://maps.google.com/maps?ll=28.5449756,77.1904397&q=Indian Institute of Technology Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
    </div>
  );
}

export default Contact;
