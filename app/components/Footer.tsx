import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-8 py-4 border-t border-[#2C1810]/10 dark:border-white/10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 items-center">
          Made by
          <a
            href="https://www.linkedin.com/in/racana/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Incari
          </a>
          with AI using
          <Link href="https://v0.dev" target="_blank" className="inline-flex">
            <svg
              fill="currentColor"
              viewBox="0 0 40 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-5 w-10"
            >
              <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"></path>
              <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path>
            </svg>
          </Link>
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/incari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/racana/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

