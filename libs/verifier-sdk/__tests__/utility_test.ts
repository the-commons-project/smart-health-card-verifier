import { Timer } from 'verifier-sdk'

test('Test Timer', async () => {
    const t = new Timer();
    t.start()
    return new Promise((resolve, reject )=>{
        setTimeout(()=> {
            const time = t.stop();
            expect( time ).not.toBe(0);
            resolve(null)
        },1000)
    } )
});
  