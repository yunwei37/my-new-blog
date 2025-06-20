import { allDocs } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Documentation' })

interface DocItem {
  name: string
  path: string
  href?: string
  children: DocItem[]
  isDirectory: boolean
}

// 构建目录结构
function buildDirectoryStructure(docs: { slug: string; title: string; path: string }[]): DocItem[] {
  const result: DocItem[] = []
  const pathMap: { [key: string]: DocItem } = {}
  
  // 创建所有路径节点
  docs.forEach((doc) => {
    const pathParts = doc.slug.split('/')
    
    pathParts.forEach((part, index) => {
      const currentPath = pathParts.slice(0, index + 1).join('/')
      const isFile = index === pathParts.length - 1
      
      if (!pathMap[currentPath]) {
        pathMap[currentPath] = {
          name: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          path: currentPath,
          href: isFile ? `/docs/${doc.slug}` : undefined,
          children: [],
          isDirectory: !isFile
        }
      }
    })
  })
  
  // 建立父子关系
  Object.keys(pathMap).forEach(path => {
    const pathParts = path.split('/')
    if (pathParts.length === 1) {
      result.push(pathMap[path])
    } else {
      const parentPath = pathParts.slice(0, -1).join('/')
      const parent = pathMap[parentPath]
      if (parent) {
        parent.children.push(pathMap[path])
      }
    }
  })
  
  // 排序
  function sortItems(items: DocItem[]): DocItem[] {
    return items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1
      if (!a.isDirectory && b.isDirectory) return 1
      return a.name.localeCompare(b.name)
    }).map(item => ({
      ...item,
      children: sortItems(item.children)
    }))
  }
  
  return sortItems(result)
}

// 渲染目录结构
function renderDirectoryStructure(items: DocItem[], depth = 0): React.ReactNode {
  return (
    <div className={`${depth > 0 ? 'ml-6 mt-4' : 'space-y-6'}`}>
      {items.map((item, index) => (
        <div key={`${item.path}-${index}`}>
          {item.isDirectory ? (
            // 目录
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📁</span>
                <h3 className={`${depth === 0 ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 dark:text-gray-100`}>
                  {item.name}
                </h3>
              </div>
              {item.children.length > 0 && renderDirectoryStructure(item.children, depth + 1)}
            </div>
          ) : (
            // 文件
            <Link
              href={item.href!}
              className="group block p-6 border border-gray-200/30 dark:border-gray-700/30 rounded-xl hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.path}
                  </p>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default function DocsPage() {
  const docs = allDocs.map(doc => ({ 
    slug: doc.slug, 
    title: doc.title || doc.slug.split('/').pop() || 'Untitled', 
    path: doc.path 
  }))
  const directoryStructure = buildDirectoryStructure(docs)

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Documentation
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-300 mt-4">
          Browse documentation organized by directory structure
        </p>
      </div>
      
      <div>
        {directoryStructure.length > 0 ? (
          renderDirectoryStructure(directoryStructure)
        ) : (
          <div className="text-center py-16 border border-gray-200/30 dark:border-gray-700/30 rounded-xl">
            <div className="space-y-4">
              <div className="text-6xl">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                No documentation found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Create some <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.md</code> files in the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">data/docs/</code> directory to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 