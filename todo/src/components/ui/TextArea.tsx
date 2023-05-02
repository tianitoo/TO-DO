const TextArea = (props: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  const { placeholder, value, onChange } = props;
  return (
    <textarea
      className="w-full h-fit text-slate-600 break-words shadow-slate-300 shadow-sm rounded-md border-none 
                text-left p-2 ring-2 ring-slate-400 resize-none focus:outline-none focus:ring-2
                focus:ring-slate-600 focus:border-transparent"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;
