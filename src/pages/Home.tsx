import React, { useCallback, useState, useRef, useEffect, MouseEventHandler } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  OnConnect,
  ReactFlowProvider,
  EdgeMarker,
  MarkerType,
  NodeMouseHandler,
  NodeTypes,
  Node,
  Edge,
  OnNodesDelete,
} from 'reactflow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

import 'reactflow/dist/style.css';
import WhatsappNode from '../components/WhatsappNode';
import AllNodesContainer from '../components/AllNodesContainer';
import EditNodeLabel from '../components/EditNodeLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SnackbarProvider, closeSnackbar, VariantType, useSnackbar } from 'notistack';
import TwitterNode from '../components/TwitterNode';
import { useFlowContext } from '../utils/FlowProvider';


const DnDFlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const ReactFlowWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const customArrowMarker: EdgeMarker = {
  type: MarkerType.ArrowClosed,
  color: '#ff0000', 
  width: 25,          
  height: 25,        
  markerUnits: 'strokeWidth',
  orient: 'auto',
  strokeWidth: 2, 
};

 
const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

let id = 0;
let nodesid = 1;
const getId = () => `bitespeednodes_${id++}`;
const messageId = () => `${nodesid++}`;

const nodeTypes: NodeTypes = {
  whatsappNode: ({ id, data, isConnectable, sourcePosition, targetPosition }) => (
    <div key={id} style={{width:'220px'}}>
        <WhatsappNode key={id} label={data?.label || 'Whatsapp Node'} />
    </div>
    
  ),
  twitterNode: ({ id, data, isConnectable, sourcePosition, targetPosition }) => (
    <div key={id} style={{width:'220px'}}>
        <TwitterNode key={id} label={data?.label || 'Twitter Node'} />
    </div>
    
  ),
};

interface ClickedNodeWithStatus {
  nodeClickedStatus: boolean;
  nodeData: Node | null;
}

export interface EntireFlow {
  allNodes: Node[];
  allEdges: Edge[];
}

const Home = () => {

  const {flowData, setFlowData} = useFlowContext();

  
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [clickedNodeStatus, setClickedNodeStatus] = useState<ClickedNodeWithStatus>({ nodeClickedStatus: false, nodeData: null });

  const { enqueueSnackbar } = useSnackbar();

  const [updatedNode , setUpdatedNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);

  // const [saveTheFlow, setSaveTheFlow] = useState<EntireFlow|null>(null);
 
  const matches768 = useMediaQuery('(min-width:768px)');


  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, 
                                            animated: true, 
                                            type:'default', 
                                            markerEnd: customArrowMarker,
                                          }, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


    const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `bitespeed Message_${messageId()}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );
  
    
  const onNodeClick: NodeMouseHandler = (event, node) => {
    // console.log('click node', node);
    setClickedNodeStatus({ nodeClickedStatus: true, nodeData: node });
    event.stopPropagation(); 
  }

  const onNodesDeleting: OnNodesDelete = (nodes) => {
    setClickedNodeStatus({ nodeClickedStatus: false, nodeData: null });
  }
  const OnClicking= (event: React.MouseEvent<HTMLDivElement>) => {
    // console.log(`CLicked Outside`);
    setClickedNodeStatus({ nodeClickedStatus: false, nodeData: null });
    event.preventDefault();
  }

  useEffect(() => {
    if (updatedNode !== null) {
      setNodes((nds) =>
        nds.map((node) => {
          return updatedNode.id === node.id ? updatedNode : node;
        })
      );
    }
  }, [updatedNode, setNodes]);

  const labelUpdatedSignal = (newNode: Node) => {
    setUpdatedNode(newNode);
    setClickedNodeStatus({ nodeClickedStatus: false, nodeData: null });
  }

  const arraysEqual = (arr1: (string | null)[], arr2: (string | null)[]): boolean => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  };

  const saveEntireFlow = () => {
    const nodeIds = nodes.map((node) => node?.id);
    const edgeSources = edges.map((edge) => edge?.source);
    const edgeTargets = edges.map((edge) => edge?.target);
  
    if ([...nodeIds, ...edgeSources, ...edgeTargets].some((value) => value === null) || 
        nodeIds.length === 0 || edgeSources.length === 0 || edgeTargets.length === 0) {
      const variant: VariantType = 'error';
      enqueueSnackbar('Sorry, cannot save the flow', { variant, autoHideDuration: 10000 });
      return;
    }
  
    const uniqueNodeValues = [...new Set(nodeIds)];
    const uniqueEdgeValues = [...new Set([...edgeSources, ...edgeTargets])];
  
    if (uniqueNodeValues.length > 3 || !arraysEqual(uniqueNodeValues, uniqueEdgeValues)) {
      const variant: VariantType = 'error';
      enqueueSnackbar('Sorry, cannot save the flow', { variant, autoHideDuration: 10000 });
    } else {
      let flow: EntireFlow = {
        allNodes: nodes,
        allEdges: edges,
      };
  
      // console.log(flow);
      // setSaveTheFlow(flow);
      setFlowData(flow)
      const variant: VariantType = 'success';
      enqueueSnackbar('Flow saved successfully', { variant, autoHideDuration: 10000 });
    }
  };
  console.log(flowData)
  return (
    <Box sx={{ flexGrow: 1 }}>
       <DnDFlowContainer>
                          <ReactFlowProvider>
                    <Grid container direction={ matches768 ? 'row' : 'column-reverse'} spacing={3} sx={{ padding: '2vh', marginTop:'2vh' }}>
                      <Grid item xs={12} sm={8} md={8} lg={8} xl={8} sx={{ display: 'flex',justifyContent: 'center',flexDirection:'column', position:'sticky', top:'10%', height: '100%'}}>
                      <div style={{ width: 'auto', height: '350px' }}>
                      <ReactFlowWrapper ref={reactFlowWrapper}>
                                  <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    defaultViewport={defaultViewport}
                                    minZoom={0.2}
                                    maxZoom={1}
                                    onConnect={onConnect}
                                    onInit={setReactFlowInstance}
                                    onDrop={onDrop}
                                    nodeTypes={nodeTypes}
                                    onDragOver={onDragOver}
                                    fitView
                                    onNodeClick={onNodeClick}
                                    onNodesDelete= {onNodesDeleting}
                                    onClick={OnClicking}
                                  >
                                      <Controls />
                                      <MiniMap />
                                      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                                  </ReactFlow>
                          </ReactFlowWrapper>
                            </div>
                      </Grid>
                      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ display: 'flex',justifyContent: 'center',flexDirection:'column', position:'sticky', top:'10%', height: '100%'}}>

                              <Button variant="outlined" sx={{marginBottom:'2vh'}} onClick={saveEntireFlow}>Save the flow</Button>
                              {
                                  clickedNodeStatus.nodeClickedStatus && clickedNodeStatus.nodeData !== null ? 
                                    <EditNodeLabel nodeData={clickedNodeStatus.nodeData} updateLabel={(newNode: Node)=> labelUpdatedSignal(newNode)}/>
                                    :
                                    <AllNodesContainer />
                              }
                              
                      </Grid>
                    </Grid>
                    </ReactFlowProvider>
       </DnDFlowContainer>
    </Box>
  )
}

// export default Home
export default function SnackBarWrapperHome() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={10000}
    action={(snackbarId) => (
      <button onClick={()=> closeSnackbar(snackbarId)} style={{background:'transparent', borderRadius:'10px'}}>
        Close
      </button>
    )}>
      <Home/>
    </SnackbarProvider>
  )
}
