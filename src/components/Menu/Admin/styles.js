import styled from 'styled-components'
import { primary, second, admin } from '../../../constants/tailwind/colors'

export const Area = styled.div`
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    /* flex: 4; */
    width: 230px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
    position: fixed;
`
export const Header = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    border-bottom: 2px solid ${admin.cinza};
    /* background-color: red; */
`
export const Logo = styled.img.attrs(({src}) => ({
    src: '/logo.png'
}))`
    width: 100px;
    height: 100px;
    object-fit: contain;
    cursor: pointer;
`
export const MenuArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 4;
    padding: 20px 10px;
    
    /* background-color: beige; */
`
export const AreaItem = styled.div`
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0px 10px;
    cursor: pointer;
    border-radius: 5px;
    background-color: ${({active}) => active ? 'rgba(52, 155, 131, 0.1)' : 'none'};
    
    &:hover{
        background-color: ${({active}) => active ? 'none' : 'rgba(216, 221, 225, 0.4)'};
        
    }
`
export const Text = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({active}) => active ? primary.verde : primary.dark};
    font-weight: ${({active}) => active ? '400' : '300'};
    font-size: ${({active}) => active ? 20 : 20}px; 
    margin: ${({active}) => active ? '10px 0px' : '10px 0px'};  
    padding: 0px 10px;
`
export const BarActive = styled.div`
    height: 4px;
    width: 20px;
    background-color: ${primary.verde};
    position: absolute;
    left: 0;
    top: 25px;
`
export const Notif = styled.div`
    height: 20px;
    width: 23px;
    font-size: 9px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    background-color: ${primary.roxo};
    color: ${primary.cinza};
    position: absolute;
    right: 0;
    top: 15px;
`
export const BottomArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;
    flex-direction: column;
`
export const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.34);
    margin: 0px 0px 3px 0px;

    &:active{
        opacity: 0.8;
    }
`
export const Subtext = styled.span`
    color: ${({color}) => color ? primary.verde : primary.dark};
    font-size: ${({size}) => size ?? '14px'};
    font-weight: ${({weight}) => weight ?? 'normal'};
    cursor: pointer;

    &:hover{
        color: ${({hover}) => hover ? second.verde : primary.dark};
    }
    &:active{
        opacity: 0.8;
    }

`