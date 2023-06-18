export const factoryHeader = () => {
  return {
    headers: { 'authorization': process.env.SECRET_KEY || ''}
  }
}
