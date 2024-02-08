import { useEffect, useMemo, useState } from "react";
import { Column, IssueType } from "../../shared/types";
import { Flex } from "antd";
import { boxStyle } from "./BoardStyle";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import IssueCard from "./IssueCard";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../redux/store";
import { changeIssues } from "../../redux/issues/issuesSlice";

const defaultCols: Column[] = [
  {
    id: "open",
    title: "Todo",
  },
  {
    id: "assignee",
    title: "In Progress",
  },
  {
    id: "closed",
    title: "Done",
  },
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeIssue, setActiveIssue] = useState<IssueType | null>(null);

  const isLoading = useSelector((state: RootState) => state.issues.isLoading);
  const error = useSelector((state: RootState) => state.issues.error);
  const issues = useSelector((state: RootState) => state.issues.items);
  const dispatch: AppDispatch = useAppDispatch();

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }

    if (e.active.data.current?.type === "Issue") {
      setActiveIssue(e.active.data.current.issue);
      return;
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveColumn(null);
    setActiveIssue(null);

    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    
    if (!isActiveAColumn) return;

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

    const isActiveIssue = active.data.current?.type === "Issue";
    const isOverIssue = over.data.current?.type === "Issue";

    if (!isActiveIssue) return;

    // Dropping an Issue over another Issue
    if (isActiveIssue && isOverIssue) {
      const activeIndex = issues.findIndex((item: IssueType) => item.id === activeId);
      const overIndex = issues.findIndex((item: IssueType) => item.id === overId);

      if (issues[activeIndex].columnId !== issues[overIndex].columnId) {
        const moveArr = issues.filter((item: IssueType) => item.id !== activeId);
        const moveObj = { ...issues[activeIndex] };
        moveObj.columnId = issues[overIndex].columnId;
        moveArr.push(moveObj);

        dispatch(changeIssues(arrayMove(moveArr, activeIndex, overIndex - 1)));
      }
      dispatch(changeIssues(arrayMove(issues, activeIndex, overIndex)));
    }

    const isOverColumn = over.data.current?.type === "Column";

    // Dropping an Issue over a column
    if (isActiveIssue && isOverColumn) {
      const activeIndex = issues.findIndex((item: IssueType) => item.id === activeId);
      const moveArr = issues.filter((item: IssueType) => item.id !== activeId);
      const moveObj = { ...issues[activeIndex] };
      moveObj.columnId = overId;
      moveArr.push(moveObj);

      dispatch(changeIssues(arrayMove(moveArr, activeIndex, activeIndex)))
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <Flex style={{minHeight: '100vh', width: '100%', overflowX: 'auto', overflowY: 'hidden',}}>
      <DndContext
        sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <Flex style={boxStyle} gap={50}>
        
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnContainer
                key={column.id}
                column={column}
                issues={issues.filter((issue: IssueType) => issue.columnId === column.id)}
              />
            ))}
          </SortableContext>
     
      </Flex>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              issues={issues.filter(
                (issue: IssueType) => issue.columnId === activeColumn.id
              )}
            />
          )}
          {activeIssue && <IssueCard issue={activeIssue} />}
        </DragOverlay>,
        document.body
      )}
      </DndContext>
      </Flex>
  );
};

export default KanbanBoard;
