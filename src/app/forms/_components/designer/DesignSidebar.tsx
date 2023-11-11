import React from "react";
import useDesigner from "@/hooks/use-designer";
import FormElementsSidebar from "../sidebar/FormElementsSidebar";
import PropertiesFormSidebar from "../sidebar/PropertiesSidebar";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow border-l-2 gap-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
