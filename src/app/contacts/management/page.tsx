"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import ColumnContainer from "../_components/ColumnContainer";
import { trpc } from "@/app/_trpc/client";
import { Plus } from "lucide-react";
import { createPortal } from "react-dom";
import { Contact } from "@prisma/client";
import ContactPipelineCard from "../_components/ContactPipelineCard";

export type Column = {
  id: string;
  title: string;
};

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

export type Task = Contact & { columnId: string };

const Page = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const { data: contacts, isLoading } = trpc.getUserContacts.useQuery();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeContact, setActiveContact] = useState<Contact | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);

      return;
    }
    if (event.active.data.current?.type === "Contact") {
      setActiveContact(event.active.data.current.contact);

      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveContact(null);
    const { active, over } = event;
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

  const deleteColumn = (id: string) => {
    const filteredColumns = columns.filter((col) => col.id !== id);

    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  };

  const updateColumn = (id: string, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;

      return { ...col };
    });

    setColumns(newColumns);
  };

  const createNewColumn = () => {
    const columnsToAdd: Column = {
      id: generateId().toString(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnsToAdd]);
  };

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Contact";
    const isOverTask = active.data.current?.type === "Contact";

    // dropping a contact over another contact
    if (isActiveATask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }

    // dropping a contact over a column
  }

  // const createTask = (columnId: string) => {
  //   const newTask: Contact & { columnId: string } = {
  //     id: generateId(),
  //     columnId,
  //   };
  //   setTasks([...tasks, newTask]);
  // };

  // const deleteTask = (taskId: string) => {
  //   const newTasks = tasks.filter((task) => task.id !== taskId);
  // };

  return (
    <MaxWidthWrapper>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  contacts={contacts}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                />
              ))}
            </SortableContext>
          </div>
          <div
            onClick={() => createNewColumn()}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2 "
          >
            <Plus /> Opportunity
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                contacts={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}

                // deleteTask={dele}
              />
            )}
            {activeContact && <ContactPipelineCard contact={activeContact} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </MaxWidthWrapper>
  );
};

export default Page;
