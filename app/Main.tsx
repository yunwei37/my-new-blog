import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="space-y-8">
        <div className="glass-strong rounded-3xl p-8 mx-4 sm:mx-8">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
              Latest
            </h1>
            <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
              {siteMetadata.description}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          {!posts.length && (
            <div className="glass rounded-2xl p-8 mx-4 sm:mx-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
            </div>
          )}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <div key={slug} className="glass rounded-2xl p-8 mx-4 sm:mx-8 transition-all duration-300 hover:glass-strong hover:scale-[1.01]">
                <article>
                  <div className="space-y-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 xl:gap-6">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-600 dark:text-gray-300">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-4 xl:col-span-3">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight mb-3">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center mt-8">
          <div className="glass rounded-2xl px-8 py-4">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium transition-colors"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
