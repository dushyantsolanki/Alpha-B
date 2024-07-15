import React, { useState } from "react";
import { firestore } from "../../firebase/";
import { toast } from "../../components/";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <div className="main-page-contact" data-aos="zoom-in">
        <div class="contact-1 py-4 md:py-12">
          <div class="container mx-auto px-4">
            <div class="xl:flex -mx-4">
              <div class="xl:w-10/12 xl:mx-auto px-4">
                <div class="xl:w-3/4 mb-4">
                  <h1 class="text-3xl text-medium mb-4">
                    We would love to hear from you
                  </h1>
                  <p class="text-xl mb-2">
                    Please submit your information and we will get back to you.
                  </p>
                  <p>
                    Call us at{" "}
                    <a
                      href="tel:+12314561231"
                      class="text-indigo-600 border-b border-transparent hover:border-indigo-600 transition-colors duration-300"
                    >
                      +91 7623 0579 936
                    </a>
                  </p>
                </div>

                <div class="md:flex md:-mx-4 mt-4 md:mt-10">
                  <div class="md:w-2/3 md:px-4">
                    <div class="contact-form">
                      <div class="sm:flex sm:flex-wrap -mx-3">
                        <div class="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="Full Name"
                            class="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                            onChange={(e) => {
                              setFullName(e.target.value);
                            }}
                            value={fullName}
                          />
                        </div>
                        <div class="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="Company Name"
                            class="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                            onChange={(e) => {
                              setCompany(e.target.value);
                            }}
                            value={company}
                          />
                        </div>
                        <div class="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="E-mail address"
                            class="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            value={email}
                          />
                        </div>
                        <div class="sm:w-1/2 px-3 mb-6">
                          <input
                            type="text"
                            placeholder="Phone Number"
                            class="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            value={phone}
                          />
                        </div>
                        <div class="sm:w-full px-3">
                          <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="4"
                            placeholder="Your message here"
                            class="border-2 rounded px-3 py-1 w-full focus:border-indigo-400 input"
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                            value={message}
                          ></textarea>
                        </div>
                      </div>
                      <div class="text-right mt-4 md:mt-12">
                        <button
                          class="border-2 border-indigo-600 rounded px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                          onClick={async (e) => {
                            if (
                              phone.length > 0 &&
                              email.length > 0 &&
                              message.length > 0 &&
                              fullName.length > 0 &&
                              company.length > 0
                            ) {
                              let reciveData = await firestore.sendConatactDoc(
                                fullName,
                                company,
                                email,
                                phone,
                                message
                              );

                              if (reciveData.status === true) {
                                toast.success(`${reciveData.message}`);
                              } else {
                                toast.error(`${reciveData.message}`);
                              }
                            } else {
                              toast.error("Please Enter Data Carefully!! ");
                            }
                          }}
                        >
                          Send a Message
                          <i class="fas fa-chevron-right ml-2 text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="md:w-1/3 md:px-4 mt-10 md:mt-0">
                    <div class="bg-indigo-100 rounded py-4 px-6">
                      <h5 class="text-xl font-medium mb-3">Help</h5>
                      <p class="text-gray-700 mb-4">
                        Need help or have any query? Don't hesitate, you can
                        directly shoot us an{" "}
                        <a
                          href="mailto:"
                          class="text-indigo-600 border-b border-transparent hover:border-indigo-600 inline-block"
                        >
                          email
                        </a>{" "}
                        or call us at{" "}
                        <a
                          href="tel:"
                          class="text-indigo-600 border-b border-transparent hover:border-indigo-600 inline-block"
                        >
                          +91 7623 057 936
                        </a>
                      </p>
                      <p class="text-gray-700">
                        You can move to{" "}
                        <a
                          href="#"
                          class="text-indigo-600 border-b border-transparent hover:border-indigo-600 inline-block"
                        >
                          FAQs
                        </a>{" "}
                        or{" "}
                        <a
                          href="#"
                          class="text-indigo-600 border-b border-transparent hover:border-indigo-600 inline-block"
                        >
                          Support
                        </a>{" "}
                        page to get more information about our site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
