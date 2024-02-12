import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express();
const port = 3000;
var dataList = [{
    id: 1,
    author: "Krishna Parmar",
    blogTitle: "How to Win Friends and Influence People",
    category: "Literature",
    description: "How to Win Friends and Influence People is a 1936 self-help book written by Dale Carnegie",
    mainbody: `"How to Win Friends and Influence People" by Dale Carnegie is a timeless self-help book that offers practical advice on enhancing interpersonal relationships and influencing others positively. Published in 1936, the book emphasizes understanding human nature and treating others with respect and empathy as fundamental techniques in handling people. Carnegie stresses the importance of avoiding criticism and instead offering genuine appreciation to foster strong connections. Through six key principles, he encourages readers to become genuinely interested in others, smile, and remember people's names, all while actively listening and showing sincere appreciation. Furthermore, Carnegie discusses the power of agreement, appreciation, and encouragement in winning people over to one's way of thinking, advocating for constructive dialogue over arguments. He also highlights the importance of leading by example and inspiring change through voluntary means, ultimately promoting empathy, understanding, and kindness in all interactions for more fulfilling relationships and greater personal and professional success.`,   
    date: new Date().toLocaleString(),
},
{
    id: 2,
    author: "Anand Shah",
    blogTitle: "Duckworth-Lewis Method",
    category: "Sports",
    description: "The Duckworth-Lewis Method is a mathematical formula used in limited-overs cricket matches to adjust target scores in rain-affected matches.",
    mainbody: `Named after its creators, Frank Duckworth and Tony Lewis, the method calculates revised targets for the team batting second based on overs lost due to rain interruptions, ensuring fairness and accuracy in adjusting targets to account for reduced playing time. It has become an integral part of modern cricket, particularly in One Day Internationals (ODIs) and Twenty20 matches, where rain interruptions are common, providing a standardized method for recalculating target scores in unpredictable weather conditions. The formula takes into account various factors such as the number of overs remaining, wickets lost, and the resources available to the chasing team. Despite occasional criticisms and refinements over the years, the Duckworth-Lewis Method remains the primary tool for match officials to manage rain-affected games and maintain the integrity of the sport's outcomes.`,   
    date: new Date().toLocaleString(),
},
];

var last = 2;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(port, () => {
   console.log(`Server running on port ${port}`); 
});

app.get("/", (req, res) => {
    res.render("index.ejs", {dataList});
});

app.get("/create", (req, res) => {
    res.render("createpost.ejs");
});

app.post("/submit", (req, res) => {
    last = last + 1;
    var data = {
        id : last,
        author: req.body["authorname"],
        blogTitle: req.body["blogtitle"],
        category: req.body["category"],
        description: req.body["description"],
        mainbody: req.body["mainbody"],
        date: new Date().toLocaleString(),
    };
    dataList.push(data);
    console.log(`Blog with id{${last}} CREATED`);
    res.render("index.ejs", {dataList});
});

// For edit
app.post("/submit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = dataList.findIndex((data) => data.id == id);

    const updatedData = {
        id: req.body["id"],
        author: req.body["authorname"],
        blogTitle: req.body["blogtitle"],
        category: req.body["category"],
        description: req.body["description"],
        mainbody: req.body["mainbody"],
        date: new Date().toLocaleString(),
    };
    dataList[searchIndex] = updatedData;
    console.log(`Blog with id{${id}} UPDATED`)
    res.redirect("/");
});


app.post("/edit", (req, res) => {
    const id = req.body["postId"];
    const existingPostIndex = dataList.findIndex((data) => data.id == id); 
    res.render("editpost.ejs", {dataList , index: existingPostIndex,});
});

app.post("/delete", (req, res) => {
    const id = req.body["postId"];
    const searchIndex = dataList.findIndex((post) => post.id == id);
    dataList.splice(searchIndex, 1);
    console.log(`Blog with id{${id}} DELETED`);
    res.redirect("/");
});