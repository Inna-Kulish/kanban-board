import { Card } from "antd";
import { Task } from "../../shared/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });
    
    const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    };
    
    if (isDragging) {
        return <Card ref={setNodeRef} style={{ ...style, height: 100, backgroundColor: 'green'}}></Card>;
    }

    return (
        <Card {...attributes} {...listeners} ref={setNodeRef} style={{ ...style, height: 100, overflow: 'hidden' }}>{task.content}</Card>
    )
};

export default TaskCard;
