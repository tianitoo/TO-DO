const Button = (props:  { children: React.ReactNode; onClick: () => void; buttonType: string }) => {

  const { children, onClick, buttonType } = props;

  let style = "";


  if (buttonType === "primary") {
    style = `mt-3 px-2 py-1.5 flex items-center text-sm text-center bg-slate-800 transition
    duration-150 hover:bg-slate-400 hover:border border hover:border-slate-800 text-slate-100 rounded-md`;
  } else {
    style = `mt-3 px-2 py-1.5 flex items-center text-sm text-center bg-red-800 transition
    duration-150 hover:bg-red-600 hover:border border hover:border-red-800 text-red-100 rounded-md`;
  }
  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
