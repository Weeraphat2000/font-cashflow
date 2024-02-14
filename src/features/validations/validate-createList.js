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

const createListSchema = Joi.object({
  amount: Joi.string()
    .required()
    .pattern(/^[0-9]{1,}$/)
    .messages({
      "string.empty": "Amount is require",
      "any.required": "Amount is require",
    }),
  transactionType: Joi.string()
    .pattern(/^[A-Z]{1,}$/)
    .required()
    .messages({
      "string.empty": "Transaction is require",
      "any.required": "Transaction is require",
    }),
  //   note: Joi.string(),
  //   categoryId: Joi.string(),
  //   createdAt: Joi.string(),
});

const validateCreateList = (input) => validate(createListSchema)(input);
export default validateCreateList;
