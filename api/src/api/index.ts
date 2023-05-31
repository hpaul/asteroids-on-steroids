import Router from 'koa-joi-router'

import * as asteroidsApi from './asteroids'

const router = Router()

router.get('/asteroids', asteroidsApi.getList)

export default router
