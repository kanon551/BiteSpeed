import React, { useEffect } from 'react'
import { Node } from 'reactflow'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


interface EditNodeLabelProps {
  nodeData : Node,
  updateLabel: (newNode: Node) => void;
}
const EditNodeLabel = ({nodeData, updateLabel}: EditNodeLabelProps) => {
  const [name, setName] = React.useState('');

  useEffect(() => {
    setName(nodeData.data.label)
  },[nodeData.id])

  const saveTheLabel = () => {
      let updatedNode = {...nodeData};
      updatedNode.data.label = name;
      updateLabel(updatedNode);
  }

  return (
            <Box
            component="form"
            noValidate
            autoComplete="off"
          >

                <TextField
                  id={nodeData.id}
                  multiline
                  maxRows={4}
                  sx={{width:'-webkit-fill-available'}}
                  label="Edit your label"
                  value={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
                  }}
                />
              <Button variant="contained" sx={{marginTop:'2vh', marginBottom:'2vh', width:'-webkit-fill-available'}}
               onClick={saveTheLabel}
               >Update the label</Button>
          </Box>
  )
}

export default EditNodeLabel
