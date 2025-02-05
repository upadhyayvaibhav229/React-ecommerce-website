// // Components/Breadcrumb.jsx
// import { Link, useLocation } from 'react-router-dom';

// const Breadcrumb = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   return (
//     <nav aria-label="breadcrumb">
//       <ol className="flex space-x-2 text-sm text-gray-600">
//         <li className="breadcrumb-item">
//           <Link to="/" className="hover:text-blue-600">Home</Link>
//         </li>
//         {pathnames.map((value, index) => {
//           const to = `/${pathnames.slice(0, index + 1).join('/')}`;
//           const isLast = index === pathnames.length - 1;
//           return isLast ? (
//             <li key={to} className="text-gray-400" aria-current="page">
//               {value}
//             </li>
//           ) : (
//             <li key={to}>
//               <Link to={to} className="hover:text-blue-600">{value}</Link>
//             </li>
//           );
//         })}
//       </ol>
//     </nav>
//   );
// };

// export default Breadcrumb;
