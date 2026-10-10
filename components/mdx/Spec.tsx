export function Spec({ rows }: { rows: [string, string][] }) {
  return (
    <div className="my-10 border-3 border-black bg-white shadow-[6px_6px_0px_#000]">
      <dl>
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-3 gap-4 border-b-2 border-black/10 px-5 py-3.5 last:border-0"
          >
            <dt className="font-mono text-xs font-black uppercase tracking-wider text-black/60">{k}</dt>
            <dd className="col-span-2 text-sm font-bold text-black">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
