const redis = require("redis");
const axios = require('axios').default;
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);



const baseURL = 'https://rapidapi.com'

async function fetchGithub() {
  let resCount = 1, page = 0;
  const allJobs = [];

  // fetch all pages
  while (resCount > 0) {
    const res = await fetch(`${baseURL}?page=${page}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resCount = jobs.length;
    console.log('length', resCount);
    page++;
  }

  // filter algorithm
  const interns = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();

    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect')
    ) {
      return false;
    }
    //if (jobTitle.includes('intern') || jobTitle.includes('internship')) {
    //return true;
    //}
    else {
      return true;
    }
  })
  console.log('internships', interns.length);
  // store data in redis
  const success = await setAsync('github', JSON.stringify(interns));

  console.log({ success });
}

//fetchGithub();

module.exports = fetchGithub;
