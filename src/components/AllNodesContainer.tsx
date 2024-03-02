import React from 'react'
import styled from 'styled-components';
import WhatsappNode from './WhatsappNode';
import TwitterNode from './TwitterNode';

const DnDFlowAside = styled.aside`
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #fcfcfc;
`;

const Description = styled.div`
  margin-bottom: 10px;
`;

const DraggingWrapper = styled.div`
margin-top: 1vh;
margin-bottom: 1vh;
  cursor: grab;
`;

const AllNodesContainer = () => {

    const onDragStart = ( event: React.DragEvent<HTMLDivElement>, nodeType:string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };


  return (
    <DnDFlowAside>
         <Description>You can drag these nodes to the panel on the right.</Description>
         <DraggingWrapper  onDragStart={(event) => onDragStart(event, 'whatsappNode')} draggable>
            <WhatsappNode label='Whatsapp buddy !'/>
        </DraggingWrapper>
        <DraggingWrapper  onDragStart={(event) => onDragStart(event, 'twitterNode')} draggable>
            <TwitterNode label='Whats happening'/>
        </DraggingWrapper>
    </DnDFlowAside>
  )
}

export default AllNodesContainer
