import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

/* 🪔 SIMPLE REAL-TIME MUHURAT LOGIC */
function generatePanchang(year){

  let data = [];

  for(let m=0;m<12;m++){
    for(let d=1; d<=28; d++){

      let date = new Date(year, m, d);

      let nakshatras = [
        "Ashwini","Bharani","Krittika","Rohini","Mrigashira",
        "Ardra","Punarvasu","Pushya","Ashlesha","Magha",
        "Purva Phalguni","Uttara Phalguni","Hasta","Chitra",
        "Swati","Vishakha","Anuradha","Jyeshtha","Mula",
        "Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta",
        "Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"
      ];

      let nak = nakshatras[(d + m) % 27];

      data.push({
        date: date.toISOString().split("T")[0],
        nakshatra: nak,
        type:
          nak === "Pushya" ? "high" :
          nak === "Rohini" ? "good" : "normal",
        muhurat: "06:00 - 12:00"
      });
    }
  }

  return data;
}

/* 🌐 API ENDPOINT */
app.get("/api/panchang", (req, res) => {

  let year = parseInt(req.query.year || "2026");

  res.json({
    year,
    data: generatePanchang(year)
  });

});

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("🪔 Panchang API Running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
