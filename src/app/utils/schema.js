const Joi = require("joi");

export const CoreSchema = Joi.object()
  .keys({
    serviceName: Joi.string().required(),
    serviceId: Joi.string().required(),
    title: Joi.string().required(),
    subTitle: Joi.string().optional(),
    whatsInclude: Joi.object({
      title: Joi.string().optional(),
      points: Joi.array().items(Joi.string().optional()).default([]),
    }),
    price: Joi.object({
      default: Joi.array()
        .items(
          Joi.object({
            price: Joi.number().required(),
            feeType: Joi.string().required(),
            originalPrice: Joi.string().optional(),
          }).required()
        )
        .required(),
    }),
    coupons: Joi.array()
      .items(
        Joi.object({
          expiry: Joi.number().integer().optional().default(2),
          name: Joi.string().required(),
          discountedPrice: Joi.number().required(),
        })
      )
      .optional()
      .default([]),
    disclaimer: Joi.string().optional().default(""),
  })
  .options({ allowUnknown: false });

export const PriceSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    serviceId: Joi.string().required(),
    price: Joi.array()
      .items(
        Joi.object({
          price: Joi.number().required(),
          feeType: Joi.string().required(),
          originalPrice: Joi.string().optional(),
        }).required()
      )
      .required(),
  })
  .options({ allowUnknown: false });

export const FilterSchema = Joi.alternatives()
  .try(
    Joi.object().keys({
      serviceId: Joi.string().required(),
      serviceName: Joi.string().allow('')
    }),
    Joi.object().keys({
      serviceId: Joi.string().allow(''),
      serviceName: Joi.string().required(),
    })
  )
  .options({ allowUnknown: false });
