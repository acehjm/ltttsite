export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        style={{ maskImage: 'radial-gradient(ellipse at center, transparent 0%, black 100%)' }}
      />
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
