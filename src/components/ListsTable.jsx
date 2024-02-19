import ListData from "../features/ListManage/ListData";

function ListTable() {
  return (
    // <div className={styles.datatableContainer}>

    <div className="container mx-auto px-4 box-border flex flex-col text-center text-3xl text-black">
      <div type="horizontal" className="flex justify-between ">
        {/* <h1>Test Data</h1>
        <p>Filter / Sort</p> */}
      </div>
      <br />

      {/* <CreateButton /> */}
      <ListData />
    </div>
  );
}

export default ListTable;
