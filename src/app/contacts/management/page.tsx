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
import { useEffect, useMemo, useState } from "react";
import ColumnContainer from "../_components/ColumnContainer";
import { trpc } from "@/app/_trpc/client";
import { Plus } from "lucide-react";
// import { createPortal } from "react-dom";
import { Column, Contact } from "@prisma/client";
import ContactPipelineCard from "../_components/ContactPipelineCard";
import { Button } from "@/components/ui/button";
import AddColumnModal from "../_components/modals/AddColumnModal";
import { useAddColumn } from "@/hooks/use-column";
import { ImSpinner2 } from "react-icons/im";
import { createPortal } from "react-dom";

// export type Column = {
//   id: string;
//   title: string;
// };

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

export type Task = Contact & { columnId: string };

const Page = () => {
  // const [columns, setColumns] = useState<Column[]>([]);
  const { data: contacts, isLoading } = trpc.getUserContacts.useQuery();
  const { data: columns, isLoading: isColumnsLoading } =
    trpc.getUserColumns.useQuery();
  const modal = useAddColumn();
  const [columnsId, setColumnsId] = useState<number[]>([]);

  console.log("contacts", contacts);
  // const [tasks, setTasks] = useState<Task[]>([]);

  const [activeContact, setActiveContact] = useState<Contact | null>(null);

  // const columnsId = useMemo(
  //   () => columns && columns?.map((col) => col.id),
  //   [columns]
  // );

  useEffect(() => {
    if (columns?.length > 0) {
      const columnId = columns?.map((col) => col.id);
      setColumnsId(columnId);
    }
  }, [columns]);
  console.log("columnsId", columnsId);

  // console.log(columns);

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
    // setColumns((columns) => {
    //   const activeColumnIndex = columns.findIndex(
    //     (col) => col.id === activeColumnId
    //   );

    //   const overColumnIndex = columns.findIndex(
    //     (col) => col.id === overColumnId
    //   );

    //   return arrayMove(columns, activeColumnIndex, overColumnIndex);
    // });
  };

  // const deleteColumn = (id: string) => {
  //   const filteredColumns = columns.filter((col) => col.id !== id);

  //   setColumns(filteredColumns);

  //   const newTasks = tasks.filter((t) => t.columnId !== id);
  //   setTasks(newTasks);
  // };

  // const updateColumn = (id: string, title: string) => {
  //   const newColumns = columns.map((col) => {
  //     if (col.id !== id) return col;

  //     return { ...col };
  //   });

  //   setColumns(newColumns);
  // };

  // const createNewColumn = () => {
  //   const columnsToAdd: Column = {
  //     id: generateId().toString(),
  //     title: `Column ${columns.length + 1}`,
  //   };
  //   setColumns([...columns, columnsToAdd]);
  // };

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
      // setTasks((tasks) => {
      //   const activeIndex = tasks.findIndex((t) => t.id === activeId);
      //   const overIndex = tasks.findIndex((t) => t.id === overId);
      //   tasks[activeIndex].columnId = tasks[overIndex].columnId;
      //   return arrayMove(tasks, activeIndex, overIndex);
      // });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // if (isActiveATask && isOverAColumn) {
    //   setTasks((tasks) => {
    //     const activeIndex = tasks.findIndex((t) => t.id === activeId);

    //     tasks[activeIndex].columnId = overId;
    //     return arrayMove(tasks, activeIndex, activeIndex);
    //   });
    // }

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
  if (isLoading) {
    return (
      <div className="flex flex-col items-center ">
        <ImSpinner2 className="h-6 w-6 animate-spin" />
        <p>Collecting Contacts...</p>
      </div>
    );
  }
  return (
    <>
      <MaxWidthWrapper>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-2">
            {columnsId.length > 0 && (
              <div className="flex gap-4">
                <SortableContext items={columnsId}>
                  {columns?.map((column) => (
                    <ColumnContainer
                      key={column.id}
                      column={column}
                      contacts={contacts?.filter(
                        (contact) => contact.contactType === column.pipelineType
                      )}
                    />
                    // <div>{column.title}</div>
                  ))}
                  {/* <ColumnContainer key={col}/> */}
                </SortableContext>
              </div>
            )}
            {/* <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns &&
                  columns?.map((column) => (
                    <ColumnContainer
                      key={column.id}
                      column={column}
                      // contacts={contacts}
                      // deleteColumn={deleteColumn}
                      // updateColumn={updateColumn}
                    />
                  ))}
              </SortableContext>
            </div> */}
            <Button
              onClick={() => modal.onOpen()}
              className="rounded mt-4"
              // className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2 "
            >
              <Plus /> Opportunity
            </Button>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  // deleteColumn={deleteColumn}
                  // updateColumn={updateColumn}
                  contacts={contacts.filter(
                    (contact) =>
                      contact.contactType === activeColumn.pipelineType
                  )}
                />
              )}
              {/* {activeContact && <ContactPipelineCard contact={activeContact} />} */}
            </DragOverlay>,
            window.document.body
          )}
        </DndContext>
      </MaxWidthWrapper>

      <AddColumnModal />
    </>
  );
};

export default Page;
