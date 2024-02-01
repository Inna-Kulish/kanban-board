import { Card } from "antd";
import { Column, Task } from "../../shared/types";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { useMemo } from "react";

interface Props {
  column: Column;
  tasks: Task[];
}

const ColumnContainer = ({ column, tasks }: Props) => {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={{ ...style }}
        bodyStyle={{ width: 200, height: "100vh", textAlign: "center", backgroundColor:'red'}}
      ></Card>
    );
  }

    return (
            <Card
                ref={setNodeRef} style={style} {...attributes}
      {...listeners}
      title={column.title}
      bodyStyle={{ width: 200, height: '', textAlign: "center" }}
      >
         
      <SortableContext items={tasksIds}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task}></TaskCard>
        ))}
          </SortableContext>
          
            </Card>
  );
};

export default ColumnContainer;
