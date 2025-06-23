'use client'

import Link from '@/components/Link'
import { useState } from 'react'

interface DocItem {
  name: string
  path: string
  href?: string
  children: DocItem[]
  isDirectory: boolean
}

interface DocsClientPageProps {
  docs: { slug: string; title: string; path: string }[]
  directoryStructure: DocItem[]
}

// 渲染目录结构
function renderDirectoryStructure(
  items: DocItem[], 
  expandedDirs: Set<string>,
  onToggleExpand: (path: string) => void,
  depth = 0
): React.ReactNode {
  return (
    <div className={`${depth > 0 ? 'ml-6 mt-4' : 'space-y-6'}`}>
      {items.map((item, index) => (
        <div key={`${item.path}-${index}`}>
          {item.isDirectory ? (
            // 目录
            <div className="space-y-4">
              <button
                onClick={() => onToggleExpand(item.path)}
                className="flex items-center space-x-3 w-full text-left p-4 rounded-xl border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <span className={`text-2xl transition-transform duration-200 ${expandedDirs.has(item.path) ? 'rotate-90' : ''}`}>
                  📁
                </span>
                <h3 className={`${depth === 0 ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1`}>
                  {item.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.children.length} 项
                  </span>
                  <span className={`text-sm text-gray-400 transition-transform duration-200 ${expandedDirs.has(item.path) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>
              
              {/* 展开的内容 */}
              <div className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${expandedDirs.has(item.path) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}>
                {item.children.length > 0 && (
                  <div className="border-l-2 border-gray-200/50 dark:border-gray-700/50 pl-4">
                    {renderDirectoryStructure(item.children, expandedDirs, onToggleExpand, depth + 1)}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // 文件
            <Link
              href={item.href!}
              className="group block p-6 border border-gray-200/30 dark:border-gray-700/30 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
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

export default function DocsClientPage({ docs, directoryStructure }: DocsClientPageProps) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  
  const toggleExpand = (path: string) => {
    setExpandedDirs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }
  
  // 搜索过滤
  const filteredDocs = searchTerm 
    ? docs.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null

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
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 搜索框 */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          <input
            type="text"
            placeholder="搜索文档..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-lg border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* 操作按钮 */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                const getAllPaths = (items: DocItem[]): string[] => {
                  const paths: string[] = []
                  items.forEach(item => {
                    if (item.isDirectory) {
                      paths.push(item.path)
                      paths.push(...getAllPaths(item.children))
                    }
                  })
                  return paths
                }
                setExpandedDirs(new Set(getAllPaths(directoryStructure)))
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              全部展开
            </button>
            <button
              onClick={() => setExpandedDirs(new Set())}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              全部折叠
            </button>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            共 {docs.length} 个文档
          </div>
        </div>
        
        {/* 内容区域 */}
        <div>
          {searchTerm ? (
            // 搜索结果
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                找到 {filteredDocs?.length || 0} 个结果
              </div>
              {filteredDocs?.map(doc => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="group block p-6 border border-gray-200/30 dark:border-gray-700/30 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {doc.slug}
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
              ))}
            </div>
          ) : (
            // 目录结构
            directoryStructure.length > 0 ? (
              renderDirectoryStructure(directoryStructure, expandedDirs, toggleExpand)
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
            )
          )}
        </div>
      </div>
    </div>
  )
}