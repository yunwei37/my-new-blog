import Link from '@/components/Link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-200/30 dark:border-gray-700/30 glass">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center sm:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent">
            Welcome to My World
          </span>
        </h1>
        <p className="mt-6 text-lg opacity-80 md:text-xl">
          Sharing insights on eBPF, LLM, and everything in between. Dive in and explore the journey!
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-xl bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-200 hover:bg-primary-700 hover:shadow-lg dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            Read the Blog →
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center rounded-xl border border-gray-300/50 bg-white/30 px-6 py-3 text-base font-medium text-gray-900 backdrop-blur-md transition-all duration-200 hover:bg-white/40 dark:border-gray-600/50 dark:bg-black/30 dark:text-gray-100 dark:hover:bg-black/40"
          >
            Browse Docs
          </Link>
        </div>
      </div>
    </section>
  )
} 