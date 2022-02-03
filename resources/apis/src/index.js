import resolveLocale from './libs/LocaleFinder'
export const handler = async ( event ) => {
  const res = await resolveLocale( event )
  console.log('Received event', event)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: res }),
  }
}
handler().then( function(){
  console.info("test")
})
