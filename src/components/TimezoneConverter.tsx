'use client';

import { useState, useEffect } from 'react';

interface TimeZone {
  value: string;
  label: string;
  offset: string;
}

const TIMEZONES: TimeZone[] = [
  { value: 'America/New_York', label: 'New York (EST/EDT)', offset: 'UTC-5/-4' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: 'UTC-8/-7' },
  { value: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: 'UTC-6/-5' },
  { value: 'America/Denver', label: 'Denver (MST/MDT)', offset: 'UTC-7/-6' },
  { value: 'Europe/London', label: 'London (GMT/BST)', offset: 'UTC+0/+1' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: 'UTC+1/+2' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', offset: 'UTC+1/+2' },
  { value: 'Europe/Rome', label: 'Rome (CET/CEST)', offset: 'UTC+1/+2' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 'UTC+9' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: 'UTC+8' },
  { value: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: 'UTC+5:30' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: 'UTC+4' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', offset: 'UTC+10/+11' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', offset: 'UTC+12/+13' },
  { value: 'UTC', label: 'UTC', offset: 'UTC+0' },
];

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceTimezone, setSourceTimezone] = useState('UTC');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');
  const [convertedTime, setConvertedTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setSourceTime(timeString);
  }, []);

  const convertTime = () => {
    if (!sourceTime) return;

    try {
      const [hours, minutes] = sourceTime.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        setConvertedTime('Invalid time format');
        return;
      }

      const today = new Date();
      const sourceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
      
      const sourceTimeString = sourceDate.toLocaleString('en-US', {
        timeZone: sourceTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      const [datePart, timePart] = sourceTimeString.split(', ');
      const [month, day, year] = datePart.split('/');
      const [hour, minute] = timePart.split(':');
      
      const utcDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
      
      const targetTimeString = utcDate.toLocaleString('en-US', {
        timeZone: targetTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      setConvertedTime(targetTimeString);
    } catch (error) {
      setConvertedTime('Error converting time');
    }
  };

  useEffect(() => {
    convertTime();
  }, [sourceTime, sourceTimezone, targetTimezone]);

  const getCurrentTimeInTimezone = (timezone: string) => {
    return currentTime.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const swapTimezones = () => {
    setSourceTimezone(targetTimezone);
    setTargetTimezone(sourceTimezone);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Time Zone Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert time between different world time zones
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              From
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Source Timezone
              </label>
              <select
                value={sourceTimezone}
                onChange={(e) => setSourceTimezone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label} ({tz.offset})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time (HH:MM)
              </label>
              <input
                type="time"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Current time in {TIMEZONES.find(tz => tz.value === sourceTimezone)?.label}:
              </p>
              <p className="font-mono text-lg text-blue-900 dark:text-blue-100">
                {getCurrentTimeInTimezone(sourceTimezone)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                To
              </h2>
              <button
                onClick={swapTimezones}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors"
                title="Swap timezones"
              >
                ⇄ Swap
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Target Timezone
              </label>
              <select
                value={targetTimezone}
                onChange={(e) => setTargetTimezone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label} ({tz.offset})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Converted Time
              </label>
              <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <span className="font-mono text-lg text-gray-900 dark:text-gray-100">
                  {convertedTime || '--:--'}
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <p className="text-sm text-green-800 dark:text-green-200">
                Current time in {TIMEZONES.find(tz => tz.value === targetTimezone)?.label}:
              </p>
              <p className="font-mono text-lg text-green-900 dark:text-green-100">
                {getCurrentTimeInTimezone(targetTimezone)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          World Clock
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIMEZONES.slice(0, 9).map((tz) => (
            <div key={tz.value} className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400">{tz.label}</p>
              <p className="font-mono text-lg text-gray-900 dark:text-gray-100">
                {getCurrentTimeInTimezone(tz.value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}