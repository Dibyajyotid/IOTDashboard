const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like HTML, CSS, JS)
app.use(express.static("public"));

// Simulate multiple IoT sensors with different data streams
setInterval(() => {
  const sensorData = {
    temperature: (Math.random() * 30).toFixed(2), // Random temperature (0 to 30°C)
    humidity: (Math.random() * 100).toFixed(2), // Random humidity (0 to 100%)
    pressure: (Math.random() * 50 + 950).toFixed(2), // Random pressure (950 to 1000 hPa)
    co2: (Math.random() * 1000 + 300).toFixed(2), // Random CO2 levels (300 to 1300 ppm)
    motion: Math.random() > 0.5 ? 1 : 0, // Simulate motion sensor (1 = detected, 0 = not detected)
  };

  // Emit the sensor data for all connected clients
  io.emit("sensorData", sensorData);
  console.log(sensorData)

  // Trigger an alert if temperature exceeds 25°C
  if (sensorData.temperature > 25) {
    io.emit(
      "alert",
      `Warning: High temperature detected! Current temperature: ${sensorData.temperature}°C`
    );
  }
}, 2000); // Emit data every 2 seconds

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
