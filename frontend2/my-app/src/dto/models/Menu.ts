/* eslint-disable @typescript-eslint/ban-types */
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type IPermanentMenuItems = {
    id: string;
    icon:  OverridableComponent<SvgIconTypeMap<{}, "svg">> 
    & {
        muiName: string;
    };
    itemName: string;
    description: string;
}

export type IChangeableMenuItems = {
    id: string;
    icon:  OverridableComponent<SvgIconTypeMap<{}, "svg">> 
    & {
        muiName: string;
    };
    itemName: string;
    path: string;
    description: string;

}
