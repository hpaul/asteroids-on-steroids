import { Context } from 'koa'
import Router, { Joi } from 'koa-joi-router'

import { nasaService } from '~/services/nasa'


export const getList: Router.Config | Router.Spec = {
  validate: {
    query: {
      from: Joi.date().description('Search asteroids visible from this date'),
      to: Joi.date().description('Search asteroids visible until this date'),
      sortBy: Joi.string().description('Sort asteroids by this column'),
    }
  },
  handler: async (ctx: Context) => {
    const { from, to, sortBy } = ctx.request.query
    // Get results from the NASA api using the frontend details
    ctx.body = nasaService.get({ from, to, sortBy })
  }
}

