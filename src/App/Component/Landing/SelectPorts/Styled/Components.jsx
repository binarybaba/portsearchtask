import styled from 'styled-components';
import {
    BACKGROUND_COLOR,
    BORDER_COLOR,
    PRIMARY_COLOR,
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
        height: 63px;
        margin: 0;
        font-size: 1.11765rem;
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
