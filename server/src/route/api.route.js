
import express from 'express';
import { getApi } from '../controller/api.controller.js';

const apiRoutes = express.Router();

apiRoutes.route('/').get(getApi);


export default apiRoutes;