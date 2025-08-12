import TimezoneConverter from '@/components/TimezoneConverter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <TimezoneConverter />
    </div>
  );
}
