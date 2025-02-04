import { NextFunction, Request, Response } from "express";
import { StateServiceImpl } from "../service/impl/state.service.impl";


export class StateController {
    private stateService: StateServiceImpl;

    constructor(){
        this.stateService = new StateServiceImpl();
    }

    public fetchStates = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const allStates = await this.stateService.getStates();
            res.status(200).json(allStates);
            
        } catch (error) {
            next(error);
        }
    }

    public fetchLGAs = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const id = parseInt(req.params.id);
            const LGAs = await this.stateService.getLGAs(id);
            res.status(200).json(LGAs);

        } catch (error) {
            next(error);
        }
    }
    
}