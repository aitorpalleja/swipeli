import { env } from '../../config/env';

/**
 * Fetch wrapper with default options and error handling
 */
export async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${env.TMDB_BASE_URL}${endpoint}`;

  // Add API key to the URL
  const urlWithKey = url.includes('?')
    ? `${url}&api_key=${env.TMDB_API_KEY}`
    : `${url}?api_key=${env.TMDB_API_KEY}`;

  const response = await fetch(urlWithKey, {
    ...options,
    headers,
  });

  // Handle HTTP errors
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  // Parse JSON response
  return response.json();
} 