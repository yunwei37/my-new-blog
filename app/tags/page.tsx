import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Tags
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-300 mt-4">
          Explore topics I write about
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {tagKeys.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
        )}
        {sortedTags.map((t) => {
          return (
            <div key={t} className="flex items-center">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="ml-2 text-sm font-semibold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                aria-label={`View posts tagged ${t}`}
              >
                ({tagCounts[t]})
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
