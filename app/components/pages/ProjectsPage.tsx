import React from "react";

const projects = [
  {
    permissions: "-rw-r--r--",
    size: "1.2M",
    date: "Oct 12",
    name: "E-Commerce_Platform",
    url: "https://github.com/yourusername/ecommerce-platform",
    tech: "Next.js, Stripe, Tailwind",
  },
  // Add more projects here if needed
];

const ProjectsPage = () => (
  <div className="w-full h-full text-[#eaeaea] font-mono p-0 select-none">
    {/* Simulated Bash Output */}
    <div className=" text-blue-400 text-sm">total {projects.length}</div>
    <div className="overflow-x-auto mt-1">
      <table className="min-w-[700px] w-full border-separate border-spacing-y-0.5 text-sm">
        <thead>
          <tr>
            <th className="text-yellow-300 font-normal border-b border-yellow-300 bg-transparent py-1 text-left">
              Permissions
            </th>
            <th className="text-yellow-300 font-normal border-b border-yellow-300 bg-transparent px-2 py-1 text-left">
              Size
            </th>
            <th className="text-yellow-300 font-normal border-b border-yellow-300 bg-transparent px-2 py-1 text-left">
              Date
            </th>
            <th className="text-yellow-300 font-normal border-b border-yellow-300 bg-transparent px-2 py-1 text-left">
              Project Name
            </th>
            <th className="text-yellow-300 font-normal border-b border-yellow-300 bg-transparent px-2 py-1 text-left">
              Tech Stack
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr
              key={proj.name}
              className="border-b border-[#232323] last:border-b-0"
            >
              <td className=" py-1 text-yellow-200 whitespace-nowrap">
                {proj.permissions}
              </td>
              <td className="px-2 py-1 text-green-300 whitespace-nowrap">
                {proj.size}
              </td>
              <td className="px-2 py-1 text-blue-300 whitespace-nowrap">
                {proj.date}
              </td>
              <td className="px-2 py-1 font-bold whitespace-nowrap">
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:underline hover:text-cyan-200 transition-colors duration-100"
                >
                  {proj.name}
                </a>
              </td>
              <td className="px-2 py-1 text-pink-300 whitespace-nowrap">
                {proj.tech}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProjectsPage;
