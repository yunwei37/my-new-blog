import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

export default function Hero() {
  const { hero } = siteMetadata

  if (!hero?.enabled) {
    return null
  }

  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-200/30 dark:border-gray-700/30 glass">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="text-center lg:text-left">
              {hero.avatar && (
                <div className="mb-6 flex justify-center lg:justify-start">
                  <Image
                    src={hero.avatar}
                    alt={hero.name}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white/20 shadow-lg"
                  />
                </div>
              )}
              
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent">
                  {hero.name}
                </span>
                {hero.chineseName && (
                  <span className="block text-xl opacity-80 mt-1">
                    {hero.chineseName}
                  </span>
                )}
              </h1>
              
              <p className="mt-3 text-lg font-medium text-primary-600 dark:text-primary-400">
                {hero.title}
              </p>
              
              <p className="mt-2 text-sm opacity-70">
                {hero.status} • {hero.location}
              </p>
              
              {hero.organization && (
                <div className="mt-3">
                  <Link
                    href={hero.organization.url}
                    className="inline-flex items-center text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    🏢 {hero.organization.name}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg opacity-90 leading-relaxed">
                {hero.tagline}
              </p>
              <p className="mt-4 opacity-80">
                {hero.description}
              </p>
            </div>

            {/* Interests */}
            {hero.interests && hero.interests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Research Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {hero.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50"
                    >
                      <span className="mr-1">{interest.icon}</span>
                      {interest.text}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Work */}
            {hero.recentWork && hero.recentWork.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Recent Work</h3>
                <div className="space-y-3">
                  {hero.recentWork.slice(0, 3).map((work, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/30 dark:bg-black/30 border border-gray-200/30 dark:border-gray-700/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{work.title}</h4>
                          <p className="text-sm opacity-80 mt-1">{work.description}</p>
                        </div>
                        <span className="text-xs opacity-60 ml-3">{work.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Projects */}
            {hero.featuredProjects && hero.featuredProjects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Featured Projects</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {hero.featuredProjects.slice(0, 4).map((project, index) => (
                    <Link
                      key={index}
                      href={project.url}
                      className="block p-3 rounded-lg bg-white/30 dark:bg-black/30 border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{project.name}</h4>
                        <div className="flex items-center gap-2 text-xs opacity-70">
                          <span>{project.language}</span>
                          <span>⭐ {project.stars}</span>
                        </div>
                      </div>
                      <p className="text-xs opacity-80 line-clamp-2">{project.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            {hero.cta && hero.cta.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {hero.cta.map((button, index) => (
                  <Link
                    key={index}
                    href={button.href}
                    className={`inline-flex items-center px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      button.primary
                        ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-lg dark:bg-primary-500 dark:hover:bg-primary-600'
                        : 'border border-gray-300/50 bg-white/30 text-gray-900 backdrop-blur-md hover:bg-white/40 dark:border-gray-600/50 dark:bg-black/30 dark:text-gray-100 dark:hover:bg-black/40'
                    }`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 