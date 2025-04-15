import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
    const location = useLocation();

    let currentLink = "";
    const pathSegments = location.pathname.split('/').filter(crumb => crumb !== '' );
    console.log(location,"current location");
    
    const crumbs = pathSegments.map((crumb, index) => {
        currentLink += `/${crumb}`;

        // Convert URL slug to readable text
        const breadcrumbName = decodeURIComponent(crumb.replace(/-/g, ' '));

        return (
            <div key={crumb} className="inline-flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>} 
                <Link to={currentLink} className="text-blue-500 hover:underline capitalize">
                    {breadcrumbName}
                </Link>
            </div>
        );
    });

    console.log(currentLink,"func current location");


    return (
        <nav className="p-1 bg-gray-100 rounded-md">
            <div className="flex items-center">
                <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                {crumbs.length > 0 && <span className="mx-2 text-gray-400">/</span>}
                {crumbs}
            </div>
        </nav>
    );
};

export default BreadCrumbs;
