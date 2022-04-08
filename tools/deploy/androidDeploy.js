const process = require('process');
const { accessSync, constants } = require('fs');
var path = require('path');
const args = require('minimist')(process.argv.slice(2))
// import { publish } from "publish-aab-google-play";
/* Deployment support */
/* argument 
  --googleApiKeyFilePath=<google api json key file path> \
  --packageName=<package name> \
  --aabFilePath=<aabFilePath> \ 
  --track=internal */

async function exists (filePath) {  
  try {
    console.log( path.join(rootPath, filePath) )
    return accessSync( path.join(rootPath, filePath), constants.R_OK );
  } catch(e) {
    console.log(e)
    return false
  }
}

const upload = async ()=> {
  if( !!googleApiKeyFilePath || !!aabFilePath ) {
    throw  new Error( "Path is not suggested")
  }

  try{
    await Promise.all( [exists( googleApiKeyFilePath ), exists( aabFilePath)] )
    console.log("aabFile: " + path.join(rootPath, aabFilePath) )
    publish({
      keyFile: googleApiKeyFilePath,
      packageName: pachageName,
      aabFile: path.join(rootPath, aabFilePath),
      track: "internal"
    })
    .then(() => {
      console.log("Success");
    })
    .catch(error => {
      console.error(error);
  });
  }catch( e ) {
      console.log('file Does not exist' + e );
  }

}

const rootPath =  process.cwd();
const pachageName          = args['packageName']
const googleApiKeyFilePath = args['googleApiKeyFilePath']
const aabFilePath = args['aabFilePath']
const track       = args['track']

console.log(`rootPath:  ${rootPath}` );
console.log(`Uploading pakcage:  ${pachageName}` );
console.log(`track:  ${track}` );
console.log(`googleApiKeyFilePath:  ${googleApiKeyFilePath}` );
console.log(`aabFilePath:  ${aabFilePath}` );

upload()
