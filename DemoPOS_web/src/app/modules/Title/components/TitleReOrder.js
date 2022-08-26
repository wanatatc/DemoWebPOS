import React from "react";
import {
  Paper,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import * as titleRedux from "../titleRedux";
import * as titleApi from "../titleApi";

export default function TitleReOrder() {
  const dispatch = useDispatch();
  const titleReducer = useSelector(({ title }) => title);
  const titleList = titleApi.useGetAll();
  const titleReOrder = titleApi.useReOrder(null, () => {
    dispatch(titleRedux.actions.closeReOrder());
  });
  const [items, setItems] = React.useState([]);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      dispatch(titleRedux.actions.closeReOrder());
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    padding: 10,
    margin: 10,
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    padding: 10,
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: 250,
  });

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

  React.useEffect(() => {
    if (titleList.data) {
      setItems(titleList.data);
    }
  }, [titleList.data]);

  const handleSave = () => {
    // get payload
    let payload = { items: [] };
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      payload.items.push({ id: element.id, sortOrder: index + 1 });
    }
    titleReOrder.mutate(payload);
  };

  return (
    <Dialog
      open={titleReducer.openReOrder}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">{"Re-Order Title"}</DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Paper
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={`title:${item.id}`}
                    draggableId={`title:${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Paper
                        elevation={3}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Typography variant="body2">{item.name}</Typography>
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSave}
          fullWidth
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
