const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./router");

app.use(cors());
app.use(express.json());

//routes for the server
app.post("/", async (req, res) => {
  try {
    const newEvent = await pool.query(
      "INSERT INTO events (event_name, event_date) VALUES ($1, $2) RETURNING *",
      [req.body.event_name, req.body.event_date]
    );
    res.json(newEvent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/:index?", async (req, res) => {
  try {
    if (req.params.index !== undefined) {
      singleEvent = await pool.query("SELECT *, to_char(event_date, 'yyyy-MM-dd') as event_date FROM events WHERE event_id = $1", [
        req.params.index
      ]);
      console.log(req.params.index)
      console.log(singleEvent.rows)
      res.json(singleEvent.rows);
    } else {
      let allEvents = await pool.query("SELECT *, to_char(event_date, 'yyyy-MM-dd') as event_date FROM events");
      res.json(allEvents.rows);
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/:index", async (req, res) => {
  console.log('put test')
  try{
    const { event_name, event_date } = req.body
    let query = `
    UPDATE events SET 
    event_name = COALESCE($1, event_name),
    event_date = COALESCE($2, event_date)
    WHERE event_id = $3`;
    let updateEvent = await pool.query(query, [event_name, event_date, req.params.index])
    res.json('updated!')

  }catch (err) {
    console.log(err.message)
  }
})

app.delete("/:index", async (req, res) => {
  try{
    let deleteEvent =  await pool.query("DELETE FROM events WHERE event_id = $1", [req.params.index])
    
    res.json("DELETED")
  }catch(err){
    console.log(err.message)
  }
})

app.listen(3001, () => {
  console.log("server started on 3001");
});
