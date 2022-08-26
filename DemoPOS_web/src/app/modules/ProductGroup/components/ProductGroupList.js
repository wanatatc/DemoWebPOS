import React from "react";
import {
  CircularProgress,
} from "@material-ui/core";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as productGroupApi from "../productGroupApi";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'red',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'grey',
  padding: grid,
  width: 250,
});


const ProductGroupList = ({ style }) => {

  const [items, setItems] = React.useState([]);

  const productGroups = productGroupApi.useGetAll(() =>
    setItems(productGroups.data)
  );

  if (productGroups.isLoading) {
    return <CircularProgress />;
  }
  // const reorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return result;
  // };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const itemsToSet = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(itemsToSet);
  };


  // const getListStyle = (isDraggingOver) => ({
  //   padding: 10,
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   width: 250,
  // });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
      {(droppableProvided, droppableSnapshot) => (
        <div
        ref={droppableProvided.innerRef}
        style={getListStyle(droppableSnapshot.isDraggingOver)} >
         {items.map((item, index) => (
            <Draggable key={item.productGroupId} draggableId={item.productGroupId} index={index}>
              {(draggableProvided, draggableSnapshot) => (
                <div
                ref={draggableProvided.innerRef}
                {...draggableProvided.draggableProps}
                {...draggableProvided.dragHandleProps}
                style={getItemStyle(
                  draggableSnapshot.isDragging,
                  draggableProvided.draggableProps.style,
                )}
              >
                {item.productGroupName}
              </div>
              )}
            </Draggable>
         ))}
      </div>
      )}
      </Droppable>

      {/* <Container className={classes.paper} style={style}>
        <Droppable droppableId="ProductGroups">
          {(provided, snapshot) => (
            <List
              dense={true}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {productGroups.data.map((item, index) => (
                <Draggable
                  key={`ProductGroups:${item.productGroupId}`}
                  draggableId={`ProductGroups:${item.productGroupId}`}
                  index={index}
                >
                  <ListItem>
                    <ListItemIcon>
                      <FolderRounded />
                    </ListItemIcon>
                    <ListItemText primary={item.productGroupName} />
                  </ListItem>
                </Draggable>
              ))}
            </List>
          )}
        </Droppable>
      </Container>
      // */}
    </DragDropContext>
  );
};

export default ProductGroupList;
