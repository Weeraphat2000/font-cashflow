import Joi from "joi";

const validate = (schema) => (input) => {
  const { error } = schema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, item) => {
      acc[item.path[0]] = item.message;
      return acc;
    }, {}); // error obj
    return result;
  }
};

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "string.empty": "First name is require",
    "any.required": "First name is require",
  }),
  lastName: Joi.string().required().trim().messages({
    "string.empty": "Last name is require",
    "any.required": "Last name is require",
  }),
  email: Joi.string().required().trim().email({ tlds: false }).messages({
    "string.empty": "Email is require",
    "any.required": "Email is require",
  }),
  mobile: Joi.string()
    .pattern(/^[0]{1}[0-9]{9}$/)
    .required()
    .trim()
    .messages({
      "string.empty": "Mobile is require",
      "any.required": "Mobile is require",
      "string.pattern.base": "Mobile is worng",
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])[A-Za-z0-9]{6,}$/)
    .trim()
    .required()
    .messages({
      "string.empty": "Password is require",
      "string.pattern.base":
        "Password must be at least 6 characters with at least 1 English character",
      "any.required": "Password is require",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Confirm password is require",
    "any.only": "password and confirm password does't match",
    "string.empty": "Confirm password is require",
  }),
  //   birthdate: Joi.required(),
  gender: Joi.string().required().messages({
    "string.empty": "Gender is require",
    "any.required": "Gender is require",
  }),
});

const validateRegister = (input) => validate(registerSchema)(input);
export default validateRegister;
