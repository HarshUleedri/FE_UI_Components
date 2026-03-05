import AutoComplete from "./component/AutoComplete";

const App = () => {
  const fetchData = async (inputValue: string): Promise<Response> =>
    fetch(`https://dummyjson.com/recipes/search?q=${inputValue}&select=name`);
  const onChange = () => {};
  const onClick = () => {};

  return (
    <div className="max-w-5xl mx-auto w-full h-screen flex items-center my-20 flex-col">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">
        Auto Complete
      </h1>
      <AutoComplete
        placeholder="Enter recipe name"
        fetchData={fetchData}
        onChange={onChange}
        onClick={onClick}
        dataKey="name"
        customLoader={<>Loading...</>}
      />
    </div>
  );
};

export default App;
