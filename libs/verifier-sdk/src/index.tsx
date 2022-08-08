
export function verify(payload: string): boolean {
  return (payload.length > 0)
}

export function test(payload: string): string {
  return payload
}


export * from './types'