import gmaps2geojson

writer = gmaps2geojson.Writer()

path01 = writer.query("804 18 Avenue Southwest, Calgary, AB", "Carway, Alberta T0K 1Y0")
path02 = writer.query("Carway, Alberta T0K 1Y0", "St Mary, Montana 59411, USA")
path03 = writer.query("St Mary, Montana 59411, USA", "Glacier Rte 1 Rd, West Glacier, MT 59936, USA")
path04 = writer.query("Glacier Rte 1 Rd, West Glacier, MT 59936, USA", "Missoula, Montana, USA")
path05 = writer.query("Missoula, Montana, USA", "Bozeman, Montana, USA")
path06 = writer.query("Bozeman, Montana, USA", "Gardiner, Montana 59030, USA")
