import { flatten, sortBy } from 'lodash'
import wretch, { Wretch } from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'

import { INasaService } from './nasa.d'
import { ParsedUrlQuery } from 'querystring'


class NasaService {

  api: Wretch

  constructor() {
    // Instantiate and configure api
    this.api = wretch('https://api.nasa.gov/neo/rest/v1/feed', { mode: 'cors' })
      .addon(QueryStringAddon)
      .errorType('json')
  }

  async get(params: ParsedUrlQuery) {
    const queryParams = {
      //eslint-disable-next-line
      start_date: params.from,
      //eslint-disable-next-line
      end_date: params.to,
      //eslint-disable-next-line
      api_key: 'DEMO_KEY'
    }

    const data = await this.api.query(queryParams).get()
    let asteroids = flatten(Object.values(data['near_earth_objects']))

    // Sort data
    if (params.sortBy && ['name'].includes(params.sortBy as string)) {
      asteroids = sortBy(asteroids, 'name')
    }

    return asteroids
  }
}


export const nasaService = new NasaService()
