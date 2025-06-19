'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex justify-between items-center pt-8">
      {!prevPage && (
        <button className="px-4 py-2 text-gray-400 cursor-not-allowed" disabled={!prevPage}>
          ← Previous
        </button>
      )}
      {prevPage && (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="px-4 py-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          ← Previous
        </Link>
      )}
      <span className="text-gray-600 dark:text-gray-300">
        {currentPage} of {totalPages}
      </span>
      {!nextPage && (
        <button className="px-4 py-2 text-gray-400 cursor-not-allowed" disabled={!nextPage}>
          Next →
        </button>
      )}
      {nextPage && (
        <Link 
          href={`/${basePath}/page/${currentPage + 1}`} 
          rel="next"
          className="px-4 py-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          Next →
        </Link>
      )}
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="space-y-8">
      <div className="text-center py-8 sm:hidden">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          {title}
        </h1>
      </div>
      
      <div className="flex gap-8">
        <div className="hidden sm:block w-64 flex-shrink-0">
          <div className="sticky top-8 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-xl p-6 border border-gray-200/30 dark:border-gray-700/30">
            <div className="space-y-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary-600 dark:text-primary-400 font-bold uppercase text-sm">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-bold uppercase text-sm transition-colors"
                >
                  All Posts
                </Link>
              )}
              <ul className="space-y-2">
                {sortedTags.map((t) => {
                  return (
                    <li key={t}>
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <span className="text-primary-600 dark:text-primary-400 px-3 py-2 text-sm font-medium uppercase block">
                          {`${t} (${tagCounts[t]})`}
                        </span>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium uppercase block transition-colors hover:bg-white/20 dark:hover:bg-black/20 rounded-lg"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post
            return (
              <article key={path} className="p-6 border border-gray-200/30 dark:border-gray-700/30 rounded-xl hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <time dateTime={date} className="text-base leading-6 font-medium text-gray-600 dark:text-gray-300">
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl leading-8 font-bold tracking-tight">
                      <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                    {summary}
                  </div>
                </div>
              </article>
            )
          })}
          
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
