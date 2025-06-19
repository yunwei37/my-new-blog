import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="content-glass p-8">
        <div className="xl:divide-y xl:divide-gray-200/30 xl:dark:divide-gray-700/30">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-4 text-center">
              <dl className="space-y-4">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-600 dark:text-gray-300">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200/30 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:divide-y-0 dark:divide-gray-700/30">
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200/30 xl:pt-11 xl:dark:border-gray-700/30">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-6 xl:space-x-0">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-3 glass p-4 rounded-xl" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                            >
                              {author.twitter
                                .replace('https://twitter.com/', '@')
                                .replace('https://x.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200/30 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700/30">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300 glass p-4 rounded-xl">
                <Link href={discussUrl(path)} rel="nofollow" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">View on GitHub</Link>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300 glass p-6 rounded-xl"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
            <footer>
              <div className="divide-gray-200/30 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700/30">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-600 uppercase dark:text-gray-300 mb-4">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-6 xl:py-8">
                    {prev && prev.path && (
                      <div className="glass p-4 rounded-xl">
                        <h2 className="text-xs tracking-wide text-gray-600 uppercase dark:text-gray-300 mb-2">
                          Previous Article
                        </h2>
                        <div className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="glass p-4 rounded-xl">
                        <h2 className="text-xs tracking-wide text-gray-600 uppercase dark:text-gray-300 mb-2">
                          Next Article
                        </h2>
                        <div className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="inline-flex items-center glass px-4 py-2 rounded-xl text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-all duration-200 hover:scale-105"
                  aria-label="Back to the blog"
                >
                  ← Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
