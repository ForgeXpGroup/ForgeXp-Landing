import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendEmail } from "../../common/emailJs/emailJs";
import { toast, Toaster } from "sonner";

export const FormModal = () => {
  const [service, setService] = useState<string>("");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const arrayPath = currentPath.split("/");
    arrayPath.map((path) => {
      if (path === "desarrollo" || path === "mantenimiento" || path === "auditoria") {
        setService(path);
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("* El nombre es requerido"),
      email: Yup.string().email("* Ingrese un email válido").required("* El email es requerido"),
      phone: Yup.string()
        .required("* El teléfono es requerido")
        .min(10, "* El número de celular debe tener al menos 10 dígitos")
        .max(13, "* El número de celular no puede tener mas de 13 dígitos")
        .matches(/^[0-9]+$/, "* El número de celular solo debe contener dígitos"),
      message: Yup.string().required("* Escriba un mensaje"),
    }),
    onSubmit: (values) => {
      const templateParams = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        reason: "Contacto",
        service: service,
        membership: localStorage.getItem("titleMembership"),
        selectedCheckbox: localStorage.getItem("selectedCheckbox"),
      };
      try {
        sendEmail(templateParams);
        formik.resetForm();
        toast.success("Mensaje enviado con éxito!", {
          classNames: {
            toast: "bg-green-0",
            title: "text-black-0",
            description: "text-black-0",
            actionButton: "bg-black-0",
            cancelButton: "bg-black-0",
            closeButton: "bg-black-0",
          },
          duration: 2000,
        });
      } catch (error) {
        toast.error("Error al enviar mensaje, intenta de nuevo!", {
          classNames: {
            toast: "bg-red-0",
            title: "text-black-0",
            description: "text-black-0",
            actionButton: "bg-black-0",
            cancelButton: "bg-black-0",
            closeButton: "bg-black-0",
          },
          duration: 2000,
        });
      }
    },
  });

  return (
    <form className="lg:px-8 py-6 flex flex-col sm:flex-col gap-4 font-gabarito" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col md:col-span-2">
        <div className="flex flex-col md:flex-row justify-between md:w-[650px]">
          <div className="relative md:w-[49%] mb-6 md:mb-0">
            <input
              type="text"
              name="name"
              id="name"
              className="text-white-0 mt-1 px-6 block w-full border-[3px] border-white-0 rounded-full shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-black-0"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="name"
              className="absolute top-1 left-4 px-1 bg-black-0 -translate-y-1/2 text-md font-bold font-gabarito text-white-0  rounded-full"
            >
              Nombre
            </label>
            {formik.touched.name && formik.errors.name ? (
              <div className="mt-2 mx-4 text-red-0 font-medium text-xs text-start">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="flex flex-col mb-2 md:col-span-1  md:w-[49%]">
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="text-white-0 peer mt-1 px-6 block w-full border-[3px] border-white-0 rounded-full shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-black-0"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="email"
                className="absolute top-1 left-4 px-1 -translate-y-1/2 text-md font-bold font-gabarito text-white-0 bg-black-0  rounded-full"
              >
                Email
              </label>
              {formik.touched.email && formik.errors.email ? (
                <div className="mt-2 mx-4 text-red-0 font-medium text-xs text-start">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-2 md:col-span-1">
        <div className="relative">
          <input
            name="phone"
            id="phone"
            className="text-white-0 font-gabarito font-semibold transition duration-200 ease-in-out peer px-6 mt-1 block w-full border-[3px] border-white-0 rounded-full shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-black-0 appearance-none"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <label
            htmlFor="phone"
            className="absolute top-1 left-4 px-1 -translate-y-1/2 text-md font-bold font-gabarito text-white-0 bg-black-0"
          >
            Teléfono
          </label>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="mt-2 mx-4 text-red-0 font-medium text-xs text-start">{formik.errors.phone}</div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col mb-2 md:col-span-2">
        <div className="relative">
          <textarea
            id="message"
            name="message"
            className="text-white-0 px-6 peer mt-1 block w-full min-h-28 max-h-40 border-[3px] border-white-0 rounded-[32px] shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-black-0"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" Escribe el motivo de tu mensaje aqui..."
          ></textarea>
          <label
            htmlFor="message"
            className="absolute top-1 left-4 px-1 -translate-y-1/2 text-md font-bold font-gabarito text-white-0 bg-black-0"
          >
            Mensaje
          </label>
          {formik.touched.message && formik.errors.message ? (
            <div className="mx-4 text-red-0 font-medium text-xs text-start mt-2">{formik.errors.message}</div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center space-x-3 justify-end md:col-span-2">
        <h3 className="text-white-0 text-md hidden lg:block">¿Queres coordinar una reunión?</h3>
        <div className="flex flex-1 items-center justify-end gap-4">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reunión%20de%20Asesoría&dates=20240930T090000Z/20240930T100000Z&details=Asesoría%20para%20tu%20negocio&location=Tu%20Ubicación&add=forgexperience@gmail.com"
            target="_blank"
            className="bg-blue-0 text-white-0 rounded-full px-6 sm:py-3 font-gabarito font-semibold text-[20px] w-auto h-[45px] flex items-center justify-center shadow-md shadow-black-0"
          >
            <img src="/calendario modal.svg" className="mr-3" />
            <span className="hidden md:block">Agendar Reunión</span>
            <span className="block md:hidden">Agendar</span>
          </a>
          <button
            type="submit"
            className="bg-red-0 w-min h-min text-white-0 gap-2 text-xl justify-center font-semibold font-gabarito py-2 px-4 rounded-full hover:bg-[#C52236] transition duration-200 flex items-center"
          >
            <svg width="25" height="25" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.0832 1.91663L15.0415 17.9583M31.0832 1.91663L20.8748 31.0833L15.0415 17.9583M31.0832 1.91663L1.9165 12.125L15.0415 17.9583"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Enviar
          </button>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </form>
  );
};
