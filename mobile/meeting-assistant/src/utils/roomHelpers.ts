import { StatusTypes } from "../dto/enums/Status.enums"

export const getStatusAsEnum  =(status: string) =>{
	if(status === StatusTypes.Available) return StatusTypes.Available;
	else if(status === StatusTypes.Busy) return StatusTypes.Busy;
	else return StatusTypes.Reserved;

}