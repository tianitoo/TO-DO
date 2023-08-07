const Button = (props:  { children: React.ReactNode; onClick: () => void; buttonType: string }) => {

  const { children, onClick, buttonType } = props;

  let style = "";


  if (buttonType === "primary") {
    style = `mt-3 px-2 py-1.5 flex items-center text-sm text-center bg-slate-800 transition
    duration-150 hover:bg-slate-100 hover:text-slate-800 border border-slate-800 text-slate-100 rounded-sm`;
  } else {
    style = `mt-3 px-2 py-1.5 flex items-center text-sm text-center bg-red-600 transition
    duration-50 hover:bg-red-100 hover:text-red-600 border border-red-600 text-red-100 rounded-sm`;
  }
  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
