type Props = {
  context: string;
  className?: string;
  iconSize?: number;
};

export default function AILabel({
  context,
  className,
  iconSize = 12,
}: Props) {
  return (
    <div className={`ai-label${className ? ` ${className}` : ""}`}>
      <span className="ms" style={{ fontSize: `${iconSize}px` }}>
        auto_awesome
      </span>
      <span>CollabPilot {context}</span>
    </div>
  );
}
