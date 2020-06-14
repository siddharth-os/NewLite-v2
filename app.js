//jshint esversion:6
const express=require('express');
const app=express();
const ejs=require('ejs');
const bodyParser=require('body-parser');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ab86007ea68245f19e45b73148c78882');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
// ab86007ea68245f19e45b73148c78882
const covid=require("covid19-api");
let homeData;
let headlines;
let technologyNews;
let businessNews;
let sportsNews;
let covidNews;
let startup;
let bollywoodNews;
let searchNews;
let homeNews;
let covidData;
covid.getReportsByCountries('India')
  .then(function(result){
    covidData=result[0][0];
});
newsapi.v2.topHeadlines({
  sources: '',
  q: '',
  category: '',
  language: 'en',
  country: 'in'
}).then(response => {
  headlines=response.articles;
});
newsapi.v2.topHeadlines({
  sources: '',
  q: '',
  category: 'technology',
  language: 'en',
  country: 'in'
}).then(response => {
      technologyNews=response.articles;
});

newsapi.v2.topHeadlines({
  sources: '',
  q: '',
  category: 'business',
  language: 'en',
  country: 'in'
}).then(response => {
  businessNews=response.articles;
});

newsapi.v2.topHeadlines({
  sources: '',
  q: '',
  category: 'sport',
  language: 'en',
  country: 'in'
}).then(response => {
  sportsNews=response.articles;
});
newsapi.v2.topHeadlines({
  sources: '',
  q: 'corona',
  category: '',
  language: 'en',
  country: 'in'
}).then(response => {
  covidNews=response.articles;
});
newsapi.v2.topHeadlines({
  sources: '',
  q: 'start-up',
  category: '',
  language: 'en',
  country: 'in'
}).then(response => {
  startup=response.articles;
});
newsapi.v2.topHeadlines({
  sources: '',
  q: 'bollywood',
  category: '',
  language: 'en',
  country: 'in'
}).then(response => {
  bollywoodNews=response.articles;
});
app.get("/",function(req,res){
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  res.render("home",{headlineNews:headlines[0],covidNews:covidNews[0],technologyNews:technologyNews[0],businessNews:businessNews[0],sportsNews:sportsNews[0],covidData:covidData});
});
app.get("/topheadlines",function(req,res){
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  res.render("topheadlines",{data:headlines,covidData:covidData});
});
app.get("/corona",function(req,res){
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  res.render("corona",{data:covidNews,covidData:covidData});
});
app.get("/technology",function(req,res){
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  res.render("technology",{data:technologyNews,covidData:covidData});
});
app.get("/business",function(req,res){
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  res.render("business",{data:businessNews,covidData:covidData});
});
app.get("/sports",function(req,res){
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  res.render("sports",{data:sportsNews,covidData:covidData});
});
app.get("/bollywood",function(req,res){
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  res.render("bollywood",{data:bollywoodNews,covidData:covidData});
});
app.post("/post",function(req,res){
  searchQuery=req.body.searchQuery;
  covid.getReportsByCountries('India')
    .then(function(result){
      covidData=result[0][0];
  });
  newsapi.v2.everything({
  q: searchQuery,
  sources: '',
  domains: '',
  from: '',
  to: '',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  searchNews=response.articles;
  res.render("post",{data:searchNews,query:searchQuery,covidData:covidData});
});
});
app.listen(3000,function(){
  console.log("Server is running at port 3000.");
});
