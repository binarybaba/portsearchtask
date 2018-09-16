import styled from 'styled-components';

const Map = styled.div`
    width: 100%;
    height: calc(100% - 64px);
    position: absolute;
    top: 64px;
    left: 0;
    background: #fafafa url(/public/assets/map.svg) no-repeat top center;
    background-size: 985px;
    z-index: -1;
`;
export default Map;
