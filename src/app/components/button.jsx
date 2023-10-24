const Button = ({ className = "", label = "", onClick }) => {
  return (
    <button
      type="submit"
      className={`font-semibold bg-[#fcd209] p-3 rounded-md ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
