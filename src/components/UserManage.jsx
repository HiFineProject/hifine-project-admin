// import ActivityData from "../features/ActivityManage/ActivityData";
// import CreateButton from "./CreateButton";

import UserData from "../features/UserManage/UserData";

function UserManage() {
  return (
    // <div className={styles.datatableContainer}>

    <div className="container mx-auto px-4 box-border flex flex-col text-center text-3xl text-black">
      <div type="horizontal" className="flex justify-between ">
        {/* <h1>User Data</h1>
        <p>Filter / Sort</p> */}
      </div>
      <br />

      {/* <CreateButton /> */}
      <UserData />
    </div>
  );
}

export default UserManage;
