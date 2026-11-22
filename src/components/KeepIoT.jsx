// Renders text with every "IoT" kept mixed-case, even inside elements styled
// with `text-transform: uppercase` (which would otherwise display it as "IOT").
export default function KeepIoT({ text }) {
  if (typeof text !== 'string' || !text.includes('IoT')) return text ?? null

  return text.split(/(IoT)/).map((part, i) =>
    part === 'IoT' ? (
      <span key={i} style={{ textTransform: 'none' }}>
        IoT
      </span>
    ) : (
      part
    )
  )
}
