const randomString = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2, 10)
}

export const createId = (prefix: string) => {
  return `${prefix}-${randomString()}`
}


