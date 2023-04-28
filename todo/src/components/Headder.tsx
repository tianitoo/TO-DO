const Headder = () => {
  return (
    <>
      <div className="relative flex flex-col items-start justify-center h-fit mt-20 ml-10 md:ml-40">
        <h1 className="text-6xl font-bold text-slate-600 w-fit">
          Project Name
        </h1>
        <p className="text-2xl font-semibold text-slate-500">
          A description of the project and what it does
        </p>
      </div>
      <div className="hidden md:flex h-10 w-full"></div>
    </>
  );
};



export default Headder;
