
export function isGlob(file: string) {
  return /(\*.*)|(\*.[a-z]{2})/g.test(file) 
}