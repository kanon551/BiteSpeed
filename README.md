# BiteSpeed Frontend Task: Chatbot flow builder

# Tech Stack
1. React
2. Typescript
3. Material-ui
4. React-error-boundary 
5. Context API


## Overview:
We’ll build a simple Chatbot flow builder using React and try to make the code extensible to easily add new features. 
A chatbot flow is built by connecting multiple messages together to decide the order of executio.



# **Note →** 
- Use https://reactflow.dev/ for the flow builder.
- You are free to use any other library on top of React Flow.
- You can use either of JavaScript or TypeScript for this Task
- Add comments to explain your code

##  Features:

# **Text Node** 
    1. Our flow builder currently supports only one type of message (i.e Text Message).
    2. There can be multiple Text Nodes in one flow.
    3. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.
# **Nodes Panel** 
    1. This panel houses all kind of Nodes that our Flow Builder supports.
    2. Right now there is only Message Node, but we’d be adding more types of Nodes in the future so make this section extensible 
# **Edge**
    1. Connects two Nodes together
# **Source Handle**
    1. Source of a connecting edge 
    2. Can only have **one edge** originating from a source handle
# **Target Handle** 
    1. Target of a connecting edge
    2. Can have **more than one edge** connecting to a target handle 
# **Settings Panel**



1. Settings Panel will replace the Nodes Panel when a Node is selected
2. It has a text field to edit text of the selected Text Node
# **Save Button**
    1. Button to save the flow 
    2. **Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles**