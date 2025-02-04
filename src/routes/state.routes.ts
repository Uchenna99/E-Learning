import { StateController } from "../controllers/state.controller";
import express from "express"

const stateController = new StateController();
const stateRouter = express.Router();


stateRouter.get('/fetch', stateController.fetchStates);

stateRouter.get('/fetch-lgas/:id', stateController.fetchLGAs);


export default stateRouter;