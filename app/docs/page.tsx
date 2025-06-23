import { allDocs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import DocsClientPage from './DocsClientPage'

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

export default function DocsPage() {
  const docs = allDocs.map(doc => ({ 
    slug: doc.slug, 
    title: doc.title || doc.slug.split('/').pop() || 'Untitled', 
    path: doc.path 
  }))
  const directoryStructure = buildDirectoryStructure(docs)
  
  return <DocsClientPage docs={docs} directoryStructure={directoryStructure} />
} 