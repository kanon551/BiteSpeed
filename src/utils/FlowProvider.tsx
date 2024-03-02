import React, { ReactNode, createContext, useContext, useState } from 'react'
import { EntireFlow } from '../pages/Home';


interface FlowContextProps {
    flowData: EntireFlow| null;
    setFlowData: (data: EntireFlow| null) => void;
}

const FlowContext = createContext<FlowContextProps | undefined>(undefined);

interface FlowProviderProps {
    children: ReactNode;
  }

  
export const FlowProvider: React.FC<FlowProviderProps> = ({ children }) => {  
    
    const [flowData, setEntireFlowData] = useState<EntireFlow|null>(null);

    const setFlowData = (data: EntireFlow| null) => {
        setEntireFlowData(data);
      };

    return (
        <FlowContext.Provider value={{ flowData, setFlowData}}>
            {children}
        </FlowContext.Provider>
    );
};
export const useFlowContext = (): FlowContextProps => {
    const context = useContext(FlowContext);
    if (!context) {
      throw new Error('useFlowContext must be used within FlowProvider');
    }
    return context;
  };
