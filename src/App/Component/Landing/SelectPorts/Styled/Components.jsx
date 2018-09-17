import styled from 'styled-components';
import {
    BACKGROUND_COLOR,
    BORDER_COLOR,
    PRIMARY_COLOR,
    TERTIARY_COLOR,
} from '../../../../CONSTANT';

export const Form = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 64px;
    background-color: ${BACKGROUND_COLOR};
    box-shadow: 0 6px 25px 0 rgba(54,54,54,0.1);
    border-radius: .17647rem;
    > button {
        border: none;
        width: 14%;
        height: 64px;
        outline: none;
        background-color: ${PRIMARY_COLOR};
        color: #fff;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    >button[disabled] {
        background-color:${BACKGROUND_COLOR};
        color: ${PRIMARY_COLOR};
        cursor: not-allowed;
        
    }
`;

export const PortField = styled.div`
    float: left;
    position: relative;
    width: calc(43% - 1px);
    background-color: #fff;
    border-right: 1px solid ${props => (!props.destination ? BORDER_COLOR : '#fff')};
    border-bottom: 1px solid transparent;
    transition: border-bottom 0.4s ease;
    input {
        width: 77%;
        border: none;
        outline: none;
        height: 64px;
        margin: 0;
        font-size: 1.11765rem;s
        padding-right: 3.23529rem;
        padding-left: 1.47059rem;
        border: 1px solid transparent;
        position: relative;
        box-sizing: border-box;
    }
    & ::placeholder{
        color: #ccc;
    }
    :hover {
        border-bottom: 1px solid ${PRIMARY_COLOR};
    }
    > div > div > button:focus{
        outline:none;
        border none;
    }
    > div > div > button:hover {
        opacity: 0.3;
    }
    > div > div > button {
        visibility: visible;
        cursor: pointer;
        float:right;
        width: 9%;
        opacity: 0.2;
        height: 62px;
        width: 62px;
        border: none;
        background: transparent;
        transition: opacity 0.2s ease;
    }
    
    > div > div > button[disabled] {
        opacity: 0;
        cursor: not-allowed;
        visibility: hidden;
        
    }
    :after {
        content: '';
        height:0px;
        width:0px;
        clear::both;
        

    }
`;

export const Ports = styled.ul`
    margin-top: 4px;
    position: absolute;
    width: 100%;
    left: 0;
    opacity: ${props => (props.opened ? '1' : '0')}
    overflow-y: auto;
    overflow-x: hidden;
    max-height: ${props => (props.opened ? '600px' : '0px')}
    transition: max-height 0.03s ease-in;
    box-shadow: 0 4px 15px 0 rgba(0,0,0,0.08);
    border-radius: .17647rem;
`;

export const Port = styled.li`
    z-index: 9999999999;
    padding-left: 1.47059rem;
    font-size: 14px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 1.47059rem;
    color: ${props => (props.isSelected ? '#fafafa' : PRIMARY_COLOR)};
    background-color: ${props => (props.isSelected ? PRIMARY_COLOR : '#fafafa')};
    :hover{
        cursor: pointer
        background-color: ${PRIMARY_COLOR};
        color: #fff;
    }
    h1 {
        
    }
    h2 {
        margin-top: 4px;
        font-size: 12px;
        color: ${TERTIARY_COLOR};
    }
    :after {
        content: '';
        height:0;
        width:0;
        clear: both;
    }
`;
