import Link from "next/link";

const navigation = [
  {
    id: 1,
    name: "Pdf Summary",
    ref: "/pdf",
  },
  {
    id: 2,
    name: "Notes",
    ref: "/notes",
  },
  {
    id: 3,
    name: "Forms",
    ref: "/forms",
  },
  {
    id: 4,
    name: "Contacts",
    ref: "/contacts",
  },
];

const AdminPanel = () => {
  return (
    <div className="max-w-7xl mx-auto md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">Dashboard</h1>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        {navigation.map((action) => (
          <li key={action.id}>
            <Link
              key={action.id}
              href={action.ref}
              className="flex flex-col gap-2"
            >
              <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-lg font-medium text-zinc-900">
                      {action.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
