import { LGA, State } from "@prisma/client";


export interface StateServices {
    getStates(): Promise<State[]>
    getLGAs(id: number): Promise<LGA[]>
}