import ActivityData from "../features/ActivityManage/ActivityData";
// import CreateButton from "./CreateButton";

function ActivityTable() {
  return (
    // <div className={styles.datatableContainer}>

    <div className="container mx-auto px-4 box-border flex flex-col text-center text-3xl text-black">
      <div type="horizontal" className="flex justify-between ">
        <h1>Test Data</h1>
        <p>Filter / Sort</p>
      </div>
      <br />

      {/* <CreateButton /> */}
      <ActivityData />
    </div>
  );
}

export default ActivityTable;
