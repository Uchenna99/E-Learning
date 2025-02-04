import { LGA, State } from "@prisma/client";
import { db } from "../../config/db";
import { StateServices } from "service/stateService";


export class StateServiceImpl implements StateServices {
    async getStates(): Promise<State[]> {
        const allStates = await db.state.findMany({})
        return allStates;
    }
    

    async getLGAs(id: number): Promise<LGA[]> {
        const LGAs = await db.lGA.findMany({
            where: {stateId: id}
        });
        return LGAs;
    }

}