import * as yup from "yup";

export const AddressSchema =  yup.object().shape({
  city: yup.string().required(),
  district: yup.string().required(),
  address: yup.string().required(),
  name: yup.string().min(2,).required(),
  surname: yup.string().min(2).required(),
  phone: yup.number().max(10).required(),
  doorNumber: yup.number(),
})