interface TestimonialCardProps {
  id: string;
  title: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  content: string;
  imageUrl?: string;
  type: string;
  youtubeId?: string;
  views: number;
  clicks: number;
  isFeatured: boolean;
  theme: string;
  onClick: () => void;
}

// Truncate text to 150 characters
function truncateText(text: string, limit: number = 150): string {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
}

export default function TestimonialCard({
  id,
  title,
  authorName,
  authorPosition,
  authorCompany,
  content,
  imageUrl,
  type,
  youtubeId,
  views,
  clicks,
  isFeatured,
  theme,
  onClick,
}: TestimonialCardProps) {
  const cardStyle = {
    border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    cursor: "pointer" as const,
    transition: "all 0.3s ease",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "12px",
    height: "100%",
  };

  const titleStyle = {
    fontSize: "14px",
    fontWeight: 500 as const,
    color: theme === "dark" ? "#e5e7eb" : "#374151",
  };

  const contentStyle = {
    fontSize: "14px",
    lineHeight: "1.6" as const,
    color: theme === "dark" ? "#d1d5db" : "#6b7280",
  };

  const authorStyle = {
    fontSize: "13px",
    fontWeight: 600 as const,
    color: theme === "dark" ? "#f9fafb" : "#111827",
    marginTop: "12px",
  };

  const subtitleStyle = {
    fontSize: "12px",
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
  };

  const statsStyle = {
    fontSize: "11px",
    color: theme === "dark" ? "#6b7280" : "#9ca3af",
    marginTop: "auto",
    paddingTop: "12px",
    borderTop: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
    display: "flex",
    gap: "16px",
  };

  const badgeStyle = {
    display: "inline-block" as const,
    fontSize: "11px",
    fontWeight: 600 as const,
    color: theme === "dark" ? "#34d399" : "#059669",
    marginLeft: "8px",
  };

  // Render media based on type
  const renderMedia = () => {
    if (type === "IMAGE" && imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={authorName}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover" as const,
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
      );
    }

    if (type === "VIDEO" && youtubeId) {
      return (
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          style={{
            borderRadius: "8px",
            marginBottom: "12px",
            border: "none",
          }}
          allowFullScreen
        />
      );
    }

    return null;
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {renderMedia()}

      <h4 style={titleStyle}>{title}</h4>

      <p style={contentStyle}>{truncateText(content)}</p>

      <div style={authorStyle}>
        {authorName}
        {isFeatured && <span style={badgeStyle}>★ Destacado</span>}
      </div>

      {(authorPosition || authorCompany) && (
        <div style={subtitleStyle}>
          {authorPosition}
          {authorPosition && authorCompany && " • "}
          {authorCompany}
        </div>
      )}

      <div style={statsStyle}>
        <span style={{ marginTop: "auto" }}>Haz click para ver más</span>
      </div>
    </div>
  );
}
