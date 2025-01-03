"use client";
import AnimateOnScroll from "../shared/AnimateOnScroll";

export default function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <AnimateOnScroll>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white transition-colors duration-300">
            About Me
          </h2>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-sm transition-colors duration-300">
              <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                I'm a passionate Full Stack Developer with expertise in modern
                web technologies. I specialize in building scalable web
                applications and enjoy solving complex problems through clean,
                efficient code.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                My technical toolkit includes:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <AnimateOnScroll>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Frontend
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      React, Next.js, TypeScript, Tailwind
                    </p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Backend
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Node.js, Python, FastAPI, PostgreSQL
                    </p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Tools
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Git, Docker, AWS, CI/CD
                    </p>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
