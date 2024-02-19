import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./page/Admin";
import Login from "./page/Login";
import PageNotFound from "./page/PageNotFound";
import AppLayout from "./page/AppLayout";
import Dashboard from "./page/Dashboard";
import UserManage from "./components/UserManage";
import PostManage from "./components/PostTable";
// import ExerciseManage from "./page/ExerciseManage";
// import DataTable from "./components/DataTable";
// import TestTable from "./components/TestTable";
// import CreateTest from "./features/TestCase/CreateTest";
import CreateActivity from "./features/ActivityManage/CreateActivity";
import CreateUser from "./features/UserManage/CreateUser";
import CreatePost from "./features/PostManage/CreatePost";
import ListTable from "./components/ListsTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="datatable" element={<DataTable />} />

          <Route path="testtable" element={<TestTable />} />
          <Route path="testtable/createtest" element={<CreateTest />} /> */}

          <Route path="usermanage" element={<UserManage />} />
          <Route path="usermanage/createuser" element={<CreateUser />} />

          <Route path="postmanage" element={<PostManage />} />
          <Route path="postmanage/createpost" element={<CreatePost />} />

          <Route path="listtable" element={<ListTable />} />
          <Route path="listtable/createlist" element={<CreateActivity />} />

          {/* <Route path="exercisemanage" element={<ExerciseManage />} /> */}
        </Route>

        {/* <Route path="app" element={<AppLayout />} /> */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} /> */
}
