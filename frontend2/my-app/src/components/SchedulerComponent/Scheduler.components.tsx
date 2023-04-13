import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import styled from "styled-components";

export const ScheduleContainer = styled(ScheduleComponent)`
    height: 75vh !important;
    border-radius: 10px;
    margin-top: -1vh !important;
    td.e-time-slots{
        width: 15px !important;
    }
    .e-schedule .e-timeline-view .e-date-header-wrap table col, 
    .e-schedule .e-timeline-view .e-content-wrap table col { 
        width: 10px !important; 
    } 

    > .e-schedule .e-timeline-view .e-date-header-wrap table tbody td, .e-schedule .e-timeline-month-view .e-date-header-wrap table tbody td {
        height: 40px !important;
    }
`;