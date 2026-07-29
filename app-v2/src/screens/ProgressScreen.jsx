/**
 * Progress tab — placeholder.
 *
 * Frame only. Real content lands in a later step of Phase 5b.
 * Deliberately imports nothing from src/logic/: the shell reads and
 * writes no state.
 */
export default function ProgressScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <h1 className="text-2xl font-semibold text-white">Progress</h1>
    </div>
  )
}
