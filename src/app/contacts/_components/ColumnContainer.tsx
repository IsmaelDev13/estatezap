"use client";
import { Column, Contact } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ContactPipelineCard from "./ContactPipelineCard";

interface Props {
  column: Column;
  // deleteColumn: (id: string) => void;
  // updateColumn: (id: string, title: string) => void;

  //   createTask: (columnId: string) => void;
  contacts: Contact[];
  // deleteTask: (id: string) => void;
}

function ColumnContainer({
  column,
  contacts,
}: // deleteColumn,
// updateColumn,
Props) {
  const [editMode, setEditMode] = useState(false);
  const [contactIds, setContactIds] = useState<number[]>([]);

  useEffect(() => {
    if (contacts.length > 0) {
      setContactIds(contacts?.map((contact) => contact.id));
    }
  }, [contacts]);

  // const contactsIds = useMemo(() => {
  //   return contacts.map((contact) => contact.id);
  // }, [contacts]);

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
      type: "column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="border-2 border-rose-500 opacity-40 w-[350px] h-[500px] rounded-md flex flex-col bg-white shadow"
      >
        Hello World
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] mt-4 h-[500px] max-h-[500px] rounded-lg flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md h-[60px] bg-white shadow cursor-grab rounded-lg rounded-b-none p-3 font-bold  flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode && column.title}
          {/* {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )} */}
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={contactIds}>
          {contacts.map((contact) => (
            <ContactPipelineCard key={contact.id} contact={contact} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
