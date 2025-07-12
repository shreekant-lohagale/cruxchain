import { BackgroundPaths, BackgroundPathsWrapper } from '@/components/ui/background-paths';

const BackgroundDemo = () => {
  return (
    <BackgroundPathsWrapper>
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Background Paths Demo
        </h1>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-black/10 dark:border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Continuous Background Demo
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This page demonstrates the continuous background effect. The animated paths are visible throughout the entire page as you scroll.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The background uses a fixed position with z-index layering to ensure it stays visible behind all content.
            </p>
          </div>
          
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-black/10 dark:border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Standalone Component Demo
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Below is the standalone BackgroundPaths component with its own title and button:
            </p>
          </div>
          
          <BackgroundPaths title="Standalone Demo" />
        </div>
      </div>
    </BackgroundPathsWrapper>
  );
};

export default BackgroundDemo; 