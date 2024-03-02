import React from 'react';
import styled from 'styled-components';
import { Handle, NodeMouseHandler, Position } from 'reactflow';
import WatsAppLogo from '../assets/watsappLogo.png'
import MessageIcon from '@mui/icons-material/Message';



interface WatsAppHeaderProps {
    color?: string;
  }


export const WhatsappNodeWrapper = styled.div`
    position:relative;
    border: 2px solid #1a192b;
    border-radius: 4px;
    background-color: #fff;
`;

export const WatsAppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
`

// export const WatsAppHeader = styled.div`
//     font-size: smaller;
//     background: #008069;
//     width: 100%;
//     padding: 5px;
//     display: flex;
//     justify-content: space-between;
// `

  
  export const WatsAppHeader = styled.div<{ $color?: WatsAppHeaderProps; }>`
    font-size: smaller;
    background: ${(props) => props.color || '#008069'};
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  `;

export const WatsAppTitle = styled.div`
display: flex;
align-items: center;
justify-content: center;
    color: white;
`

export const WatsappLogo = styled.div`
     width: 25px;
        height: 25px;
        background-color: white;
        position: relative;
        border-radius: 50%;
`

export const WatsAppMessage = styled.div`
padding: 1vh;
    font-size: x-small;
`

export interface WhatsappNodeProps {
    label: string;
  }


const WhatsappNode = ({ label }: WhatsappNodeProps) => {

  return (
    <WhatsappNodeWrapper>
        <Handle type="target" position={Position.Left} isConnectable={true} 
        style={{ backgroundColor: '#1a192b', width:'10px', height:'10px' }} />
                 <WatsAppWrapper>
                            <WatsAppHeader color='#008069'>
                                <WatsAppTitle>
                                    <MessageIcon fontSize='small' sx={{marginRight:'2px'}}/>
                                    Send Message
                                </WatsAppTitle>
                                <WatsappLogo>
                                    <img
                                        src={WatsAppLogo}
                                        height="15px"
                                        alt="watsappNodeLogo"
                                        style={{
                                            position:'absolute',
                                            left:"25%",
                                            top:'25%',
                                        }}
                                    />
                                </WatsappLogo>
                            </WatsAppHeader>
                            <WatsAppMessage>
                                    {label}
                            </WatsAppMessage>
                </WatsAppWrapper>
        <Handle type="source" position={Position.Right} isConnectable={true}
        style={{ backgroundColor: '#1a192b',  width:'10px', height:'10px' }} />
    </WhatsappNodeWrapper>
  )
}

export default WhatsappNode
