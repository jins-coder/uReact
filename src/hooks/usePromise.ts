import { use } from 'react';

/**
 * React 19 native promise unwrapping hook with Suspense.
 * Resolves promises directly during render without useState or useEffect ceremony!
 * 
 * Usage:
 *   <Suspense fallback={<Spinner />}>
 *     <UserProfile userPromise={userPromise} />
 *   </Suspense>
 * 
 *   function UserProfile({ userPromise }) {
 *     const user = usePromise(userPromise);
 *     return <div>{user.name}</div>;
 *   }
 */
export function usePromise<T>(promise: Promise<T>): T {
  return use(promise);
}
