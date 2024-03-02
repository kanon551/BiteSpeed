import React from 'react'
import { WatsAppHeader, WatsAppMessage, WatsAppTitle, WatsAppWrapper, WatsappLogo, WhatsappNodeProps, WhatsappNodeWrapper } from './WhatsappNode'
import { Handle, Position } from 'reactflow'
import TwitterLogo from '../assets/Twitter.png';
import TwitterIcon from '@mui/icons-material/Twitter';

const TwitterNode = ({ label }: WhatsappNodeProps) => {
  return (
    <WhatsappNodeWrapper>
    <Handle type="target" position={Position.Left} isConnectable={true} 
    style={{ backgroundColor: '#1a192b', width:'10px', height:'10px' }} />
             <WatsAppWrapper>
                        <WatsAppHeader color='rgb(29, 155, 240)'>
                            <WatsappLogo>
                                <img
                                    src={TwitterLogo}
                                    height="15px"
                                    alt="watsappNodeLogo"
                                    style={{
                                        position:'absolute',
                                        left:"25%",
                                        top:'25%',
                                    }}
                                />
                            </WatsappLogo>
                            <WatsAppTitle>
                                <TwitterIcon fontSize='small' sx={{marginRight:'2px'}}/>
                                Tweet Online
                            </WatsAppTitle>
                          
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

export default TwitterNode
