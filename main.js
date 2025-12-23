import { crawlPage } from './crawl.js';


async function main(){
    //our script takes a website as i/p and crawls through command line and process is an object and argv is a property of process to grab that command line argument
    if(process.argv.length < 3){
        console.log("No website provided")
        process.exit(1) //here 1 is an error code
    }
     if(process.argv.length > 3){
        console.log("Too many cmd line args")
        process.exit(1) //here 1 is an error code
    }
    const baseURL = process.argv[2]
    console.log("starting crawl for website:", baseURL)
    await crawlPage(baseURL, baseURL, {})
}
main()