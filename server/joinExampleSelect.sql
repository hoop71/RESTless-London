-- SQLite
SELECT *
FROM SolarSystems
  LEFT JOIN Planets ON SolarSystems.id = Planets.solarSystemId