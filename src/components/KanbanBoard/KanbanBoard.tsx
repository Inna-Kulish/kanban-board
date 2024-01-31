import { useMemo, useState } from "react";
import { Column } from "../../shared/types";
import { Flex } from "antd";
import { boxStyle } from "./BoardStyle";
import ColumnContainer from "./ColumnContainer";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

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

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>(defaultCols);
    const columnsId = useMemo(() => columns.map((column) => column.id), [columns])

  return (
    <DndContext>
      <Flex style={boxStyle} gap={50}>
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <ColumnContainer key={column.id} column={column} />
          ))}
        </SortableContext>
      </Flex>
    </DndContext>
  );
};

export default KanbanBoard;
