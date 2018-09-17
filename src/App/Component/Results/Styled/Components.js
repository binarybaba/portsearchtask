import styled from 'styled-components';
import {
    BACKGROUND_COLOR,
    BORDER_COLOR,
    PRIMARY_COLOR,
    SUBTLE_BACKGROUND_COLOR, TERTIARY_COLOR,
} from '../../../CONSTANT';

export const Wrapper = styled.div`
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: ${SUBTLE_BACKGROUND_COLOR}
`;

export const Navbar = styled.div`
    width: 100%;
    height: 20px;
    width: 100%;
    height: 52px;
    border-bottom: 1px solid ${BORDER_COLOR};
    background-color: #fff;
    z-index: 1;
    :after {
        content: '';
        width: 0px;
        height: 0px;
        clear: both;
    }
    padding: 22px 0 0 0;
    position: fixed;
`;

export const DatesPreviewWrapper = styled.div`
    float:right;
    position: relative;
    height: 52px;
    margin-right: 22px;
    margin-top:-30px;
    : after {
        content: '';
        width:0px;
        height:0px;
        clear: both;
    }
`;

export const DatesPreviewButton = styled.button`
    outline: none;
    border: none;
    background-color: ${props => (props.isSelected ? PRIMARY_COLOR : '#fff')};
    color: ${props => (props.isSelected ? SUBTLE_BACKGROUND_COLOR : TERTIARY_COLOR)};
    transition: background-color 0.4s ease, width: 0.4s ease;
    border-radius: .17647rem;
    cursor: pointer;
    border: 1px solid ${BORDER_COLOR};
    padding: 14px 22px;
    &:hover {
        background-color: ${props => (props.isSelected ? PRIMARY_COLOR : BACKGROUND_COLOR)};
        color: ${props => (props.isSelected ? BACKGROUND_COLOR : PRIMARY_COLOR)}
    }
`;

export const Date = styled.li`
    font-weight: 600;
    font-size: 12px;
    float: left;
    margin-right: 14px; 
`;

export const DateSelectorWrapper = styled.div`
    position: absolute;
    margin-top: ${props => (props.showDateSelector ? '24px' : '-140px')};;
    box-shadow: 0 6px 25px 0 rgba(54,54,54,0.1);
    border-radius: .17647rem;
    opacity: ${props => (props.showDateSelector ? '1' : '0')};
    visibility: ${props => (props.showDateSelector ? 'visible' : 'hidden')};
    background-color: #fff;
    z-index: 2;
    transition: margin-top 0.1s ease, opacity 0.2s ease, visibility 0s ease;
    
    .Selectable {
        z-index: 4;
        font-size: 14px;
    }
    
    .Selectable .DayPicker-Day {
        border-radius: 0 !important;
    }
    
   
    .Selectable .DayPicker-Day--start {
        border-top-left-radius: 50% !important;
        border-bottom-left-radius: 50% !important;
    }
    .Selectable .DayPicker-Day--end {
        border-top-right-radius: 50% !important;
        border-bottom-right-radius: 50% !important;
    }
    
    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
        background-color:  #f0efef;
        color: ${TERTIARY_COLOR};
    }
    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside):hover {
        background-color:  #e6e6e6;
        color: ${PRIMARY_COLOR};
    }
    
    .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background-color:  #e6e6e6;
        color: ${PRIMARY_COLOR};
    }
    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        background-color: #606060;
        color: ${SUBTLE_BACKGROUND_COLOR};
    }
    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
        background-color: ${PRIMARY_COLOR};
    }
    .Selectable .DayPicker-Caption {
        font-size: 10px;
        font-weight: 600;
        font-family: Nunito, sans-serif;
    }
    .Selectable .DayPicker-Month {
        margin-top: 20px;
        margin-bottom: 20px;
       
    }
`;

export const ResultsWrapper = styled.div`
    height: calc(100vh - 52px);
    width: 100%;
    position: relative;
    
`;

export const GraphWrapper = styled.div` 
    width: 100%;
    opacity: ${props => (props.userIsTyping ? '0' : '1')};
    visibility: ${props => (props.userIsTyping ? 'hidden' : 'visible')};
    position: absolute;
    bottom: ${props => (props.userIsTyping ? '-1400px' : '0')};
    border-right: 1px solid ${BORDER_COLOR};
    transition: bottom 0.2s ease, opacity 0.2s ease, visibility 0s;
`;

export const HeadingWrapper = styled.div`
    position: absolute;
    top: 20%;
    left 50%;
    transform: translate(-50%, -20%)
`;

export const Heading = styled.div`
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    text-align: center;
    > ul> li> div > input {
        cursor: pointer;
        text-align: center;
        background-color: transparent;
        outline: none;
        border: none;
        text-align: center;
        font-family: 'Ubuntu', sans-serif;
        font-weight: 700;
        font-size: 48px;
        text-transform: uppercase
    }
    >ul> li> span {
        text-align: center;
        font-family: 'Ubuntu', sans-serif;
        font-weight: 400;
        font-size: 24px;
        text-transform: uppercase
    }
`;

export const SubtleText = styled.p`
    text-align: center;
    padding-top: 14px;
    opacity: ${props => (props.userIsTyping ? '0' : '0.4')}
    transition: opacity 0.2s ease-in-out;
    
`;
