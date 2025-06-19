import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
      </div>
      
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Profile Card */}
        <div className="lg:w-80 lg:flex-shrink-0 mb-8 lg:mb-0">
          <div className="rounded-xl p-8 border border-gray-200/20 dark:border-gray-700/20">
            <div className="space-y-6 text-center">
              {avatar && (
                <div className="mx-auto">
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={192}
                    height={192}
                    className="h-48 w-48 rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-tight">
                  {name}
                </h3>
                <div className="mt-2">
                  {occupation}
                </div>
                {company && (
                  <div className="text-sm opacity-80">
                    {company}
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-3">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="twitter" href={twitter} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="prose dark:prose-invert max-w-none lg:prose-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
