import { Drawer, ListItemButton, ListItemText } from "@mui/material";
import styled, { css } from "styled-components";

export const StyledDrawer = styled(Drawer)<{width: number, mode: string}>`
    width: ${props => (props.width)}px;
    flex-shrink: 0;
    border-top-right-radius:50px;
    & .MuiDrawer-paper{
        width: ${props => (props.width)}px;
        box-sizing: border-box;
        border-top-right-radius: 100px;
        ${(props)=>{
		switch (props.mode){
		case "light":{
			return css`
                    /* background-color: #0288d1 !important; */
            `;
		}
		case "dark": {
			return css`
                    background-color: #023d5e !important;
                `;
		}
		}
	}}
    }
`;

export const ListButton = styled(ListItemButton)<{href : string}>`
    
    &.selected { 
        background-color: rgb(0 164 255 / 21%) !important;
    }

`;