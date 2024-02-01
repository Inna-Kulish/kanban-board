import { useMemo, useState } from "react";
import { Column, Task } from "../../shared/types";
import { Flex } from "antd";
import { boxStyle } from "./BoardStyle";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "In Progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks: Task[] = [
    {
        id: "1",
        columnId: "todo",
        content: "List admin APIs for dashboard",
    },
    {
        id: "2",
        columnId: "todo",
        content:
            "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
    },
    {
        id: "3",
        columnId: "doing",
        content: "Conduct security testing",
    },];

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
const [tasks, setTasks] = useState<Task[]>(defaultTasks);
    
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }
      
      if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };
    
    const onDragOver = (e: DragOverEvent) => {
const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

        if (activeId === overId) return;
        
        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';

        if(!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                const overIndex = tasks.findIndex(t => t.id === overId);

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }
                return arrayMove(tasks, activeIndex, overIndex);
            })
        }
        const isOverColumn = over.data.current?.type === 'Column';

        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex)
            })
        }
    }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}onDragOver={onDragOver}>
      <Flex style={boxStyle} gap={50}>
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <ColumnContainer key={column.id} column={column} tasks={tasks.filter(task => task.columnId === column.id)} />
          ))}
        </SortableContext>
      </Flex>
      {createPortal(
        <DragOverlay>
          {activeColumn && <ColumnContainer column={activeColumn} tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
              )}
              />}
              {activeTask && <TaskCard task={activeTask}/>}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default KanbanBoard;
