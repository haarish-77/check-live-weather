const express =require("express");
const https= require("https");
const bodyParser=require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function (req,res) {
   res.sendFile(__dirname+ "/index.html");
 });
     app.post("/",function (req,res) {
       const query=req.body.cityName;
         const metric="metric";
       const apiid="244583a55f928a2d4f8ab85c5b9df3a2";
       const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiid+"&units="+metric;

        https.get(url,function (response) {
          console.log(response.statusCode);

          response.on("data",function (data) {
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp;
            const weatherDescription =weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const iconURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1> the temperature in "+query+" is "+temp+" degrees celsius.</h1>");
            res.write("<p>the weather is currently"+weatherDescription+"<p>");
            res.write("<img src="+iconURL+">");
            res.send();
            console.log(temp);

     })

  })

     })


app.listen(3000,function () {
  console.log("server is running");

})
