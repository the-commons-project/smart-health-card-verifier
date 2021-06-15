import { validate } from './qr'

export const validateCard = async (fileData: any): Promise<any> => {
  const result = await validate(fileData.map((fi) => fi))

  return result
}
