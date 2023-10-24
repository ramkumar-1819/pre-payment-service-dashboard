const Input = ({
  label,
  id,
  type = "text",
  value = "",
  onChange,
  direction = "down",
  required = false,
  name,
  placeholder = "",
  className: { root = "", input = "" } = {},
}) => {
  return (
    <div
      className={`${direction === "down" ? "flex-col" : ""} flex gap-2 ${root}`}
    >
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span className="text-[red] pl-1">*</span>}
        </label>
      )}
      <input
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`border outline-1  rounded-md p-2 ${input}`}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
