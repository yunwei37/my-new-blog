import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="space-y-6">
        <div className="content-glass p-8 text-center">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            About
          </h1>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Author Profile Card */}
          <div className="xl:col-span-1">
            <div className="content-glass p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                {avatar && (
                  <div className="glass-strong p-2 rounded-full">
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={192}
                      height={192}
                      className="h-48 w-48 rounded-full"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-2xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100">{name}</h3>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{occupation}</div>
                  <div className="text-gray-500 dark:text-gray-400">{company}</div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <SocialIcon kind="mail" href={`mailto:${email}`} />
                  <SocialIcon kind="github" href={github} />
                  <SocialIcon kind="linkedin" href={linkedin} />
                  <SocialIcon kind="x" href={twitter} />
                  <SocialIcon kind="bluesky" href={bluesky} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="xl:col-span-2">
            <div className="content-glass p-8">
              <div className="prose dark:prose-invert max-w-none lg:prose-lg">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
