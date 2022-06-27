function ResultValue({ value }) {
  // prettier-ignore
  const color = (value === 0
    ? "text-green-500"
    : value > 0
    ? "text-red-500"
    : "");

  const children = value === 0 ? "Eleito" : value > 0 ? "Não eleito" : "";

  return <span className={color}>{children}</span>;
}

export { ResultValue };
