import { useFormik } from "formik";
import * as Yup from "yup";
import { sendEmail } from "../../common/emailJs/emailJs.js";
import { toast, Toaster } from "sonner";

export const ContactForm = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            reason: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("* El nombre es obligatorio"),
            email: Yup.string().email("* Debe ser un email válido").required("* El email es obligatorio"),
            reason: Yup.string().required("* Debes seleccionar un motivo"),
            message: Yup.string().required("* El mensaje es obligatorio"),
        }),
        onSubmit: (values) => {
            const templateParams = {
                name: values.name,
                email: values.email,
                reason: values.reason,
                message: values.message,
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
        <form className="px-8 py-6 flex flex-col md:grid-cols-2 gap-4 font-gabarito" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-2 md:col-span-1">
                <div className="relative">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="peer mt-1 px-6 block w-full border-[3px] rounded-full shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-white-0"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label
                        htmlFor="name"
                        className="absolute top-1 left-4 px-1 bg-white -translate-y-1/2 text-md font-bold font-gabarito text-black-0 bg-white-0 rounded-full"
                    >
                        Nombre
                    </label>
                    {formik.touched.name && formik.errors.name ? (
                        <div className="mt-2 mx-4 text-red-0 font-medium text-xs text-start">{formik.errors.name}</div>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-col mb-2 md:col-span-1">
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="peer mt-1 px-6 block w-full border-[3px] border-black-0 rounded-full shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-white-0"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label
                        htmlFor="email"
                        className="absolute top-1 left-4 px-1 -translate-y-1/2 text-md font-bold font-gabarito text-black-0 bg-white-0 rounded-full"
                    >
                        Email
                    </label>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="mt-2 mx-4 text-red-0 font-medium text-xs text-start">{formik.errors.email}</div>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-col mb-2 md:col-span-1">
                <div className="relative">
                    <select
                        name="reason"
                        id="reason"
                        className="font-gabarito font-semibold transition duration-200 ease-in-out peer px-6 mt-1 block w-full border-[3px] border-black-0 rounded-full shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-white-0 appearance-none"
                        value={formik.values.reason}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option disabled value="" selected="selected" className="font-gabarito font-semibold text-m">
                            Elige una opción
                        </option>
                        <option value="Consulta" className="font-gabarito font-semibold text-m">
                            Consulta
                        </option>
                        <option value="Soporte" className="font-gabarito font-semibold text-md">
                            Soporte
                        </option>
                        <option value="Otro" className="font-gabarito font-semibold text-md">
                            Otro
                        </option>
                    </select>
                    <label
                        htmlFor="reason"
                        className="absolute top-1 left-4 px-1 bg-white-0 -translate-y-1/2 text-md font-bold font-gabarito text-black-0"
                    >
                        Motivo del mensaje
                    </label>
                    {formik.touched.reason && formik.errors.reason ? (
                        <div className="mt-2 mx-4 text-red-0 font-medium text-xs text-start">
                            {formik.errors.reason}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-col mb-2 md:col-span-2">
                <div className="relative">
                    <textarea
                        id="message"
                        name="message"
                        className="px-6 peer mt-1 block w-full min-h-28 max-h-40 border-[3px] rounded-[32px] shadow-sm focus:ring focus:ring-blue-0 focus:border-blue-0 p-2 pt-4 bg-white-0"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Escribe el motivo de tu mensaje aquí..."
                    ></textarea>
                    <label
                        htmlFor="message"
                        className="absolute top-1 left-4 px-1 bg-white -translate-y-1/2 text-md font-bold font-gabarito text-black-0 bg-white-0"
                    >
                        Mensaje
                    </label>
                    {formik.touched.message && formik.errors.message ? (
                        <div className="mx-4 text-red-0 font-medium text-xs text-start mt-2">
                            {formik.errors.message}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="flex justify-end md:col-span-2">
                <button
                    type="submit"
                    className="bg-red-0 w-auto text-white-0 gap-2 text-xl justify-center font-semibold font-gabarito py-2 px-4 rounded-full hover:bg-[#C52236] transition duration-200 flex items-center"
                >
                    <svg className="w-6 h-6" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
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

            <Toaster position="bottom-center" />
        </form>
    );
};

export default ContactForm;
