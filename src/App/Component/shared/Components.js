import styled from 'styled-components';
import { PRIMARY_COLOR, TERTIARY_COLOR } from '../../CONSTANT';

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
