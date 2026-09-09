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
  const p = promise as any;
  if (p && !p.status && typeof p.then === 'function') {
    p.status = 'pending';
    p.then(
      (val: any) => {
        p.status = 'fulfilled';
        p.value = val;
      },
      (err: any) => {
        p.status = 'rejected';
        p.reason = err;
      }
    );
  }
  return use(promise);
}

