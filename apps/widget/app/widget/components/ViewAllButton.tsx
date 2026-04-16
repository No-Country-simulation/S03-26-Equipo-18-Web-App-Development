interface ViewAllButtonProps {
  theme: string;
  onClick: () => void;
  label: string;
}

export default function ViewAllButton({
  theme,
  onClick,
  label,
}: ViewAllButtonProps) {
  const buttonStyle = {
    width: "100%",
    padding: "12px 20px",
    marginTop: "16px",
    backgroundColor: theme === "dark" ? "#f9fafb" : "#111827",
    color: theme === "dark" ? "#111827" : "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500 as const,
    cursor: "pointer" as const,
    transition: "all 0.3s ease",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
}
