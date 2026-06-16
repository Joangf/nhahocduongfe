import { slugs } from "@/constants/slugs";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Dashboard", path: slugs.home },
  { name: "Học sinh", path: slugs.patients },
  { name: "Quản trị", path: slugs.management },
  { name: "Bệnh án", path: slugs.dentalRecord },
  { name: "Báo cáo", path: slugs.report1 },
];

export default function Breadcrumb() {
  const location = useLocation();

  const breadcrumbItem = pages.filter((page) =>
    page.path.includes(location.pathname),
  );

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              to={slugs.home}
              className="flex text-sm font-medium text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </li>
        {location.pathname === "/" ? (
          <div className="flex">
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              {pages[0].name}
            </span>
          </div>
        ) : (
          false
        )}
        {location.pathname !== "/" &&
          breadcrumbItem.map((page) => (
            <li key={page.name}>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link
                  to={page.path}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {page.name}
                </Link>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
}
