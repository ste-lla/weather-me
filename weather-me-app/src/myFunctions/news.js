
export function getEnvironmentNews() {
    const newsUrl = 'https://content.guardianapis.com/search?format=json&show-fields=headline,short-url,thumbnail,trailText&api-key=1cc443ab-d1d1-4546-87b0-c2d68710146d&page-size=14&section=environment';
    //const ip_info_token = process.env.REACT_APP_IP_INFO_API_TOKEN;
    //const guardian_api_key = process.env.REACT_APP_GUARDIAN_API_KEY;

    let news;

    fetch(newsUrl)
    .then(response => response.json())
    .then(data => {
      //setNewsReturned(data.response.results);
      news = data.response.results;
    })
    .catch(error => {
      console.log(error);
    });

    return news;
}